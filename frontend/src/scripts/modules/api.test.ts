import axios from 'axios';
import { FetchMoviesResponse, FetchPeopleResponse } from '@project/api-types';

import MockAdapter from 'axios-mock-adapter';
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@jest/globals';

import { client } from 'modules/api';

import { createTestMovie } from 'test-utils/movie';
import { createTestPerson } from 'test-utils/person';
import { TestQueryWrapper } from 'test-utils/TestQueryWrapper';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

afterEach(() => {
  mock.reset();
  mock.resetHistory();
});

describe('modules/api', () => {
  describe('#useFetchMovies', () => {
    it('should fetch movie list', async () => {
      const response: FetchMoviesResponse = {
        items: [
          createTestMovie({ id: 'M1', titleCs: 'Movie 1' }),
          createTestMovie({ id: 'M2', titleCs: 'Movie 2' }),
          createTestMovie({ id: 'M3', titleCs: 'Movie 3' }),
        ],
        total: 3,
      };
      mock.onGet('/api/movie').reply(200, response);

      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchMovies(), {
        wrapper: TestQueryWrapper,
      });

      // fetch data
      result.current.mutate({});

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mock.history.get.length).toEqual(1);
      expect(result.current.data?.total).toEqual(3);
      expect(result.current.data?.items.length).toEqual(3);
      expect(result.current.data?.items[0].id).toEqual('M1');
      expect(result.current.data?.items[0].titleCs).toEqual('Movie 1');
      expect(result.current.data?.items[1].id).toEqual('M2');
      expect(result.current.data?.items[1].titleCs).toEqual('Movie 2');
      expect(result.current.data?.items[2].id).toEqual('M3');
      expect(result.current.data?.items[2].titleCs).toEqual('Movie 3');
    });
  });

  describe('#useFetchMovie', () => {
    it('should fetch movie data', async () => {
      const response = createTestMovie({ id: 'M12', titleCs: 'Movie 12' });
      mock.onGet('/api/movie/12').reply(200, response);

      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchMovie('12'), {
        wrapper: TestQueryWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mock.history.get.length).toEqual(1);
      expect(result.current.data?.id).toEqual('M12');
      expect(result.current.data?.titleCs).toEqual('Movie 12');
    });

    it('should handle HTTP 404 status', async () => {
      mock.onGet('/api/movie/13').reply(404);
      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchMovie('13'), {
        wrapper: TestQueryWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(null);
    });
  });

  describe('#useEditMovie', () => {
    it('should edit movie data', async () => {
      mock.onPatch('/api/movie/88').reply(200);
      expect(mock.history.patch.length).toEqual(0);

      const { result } = renderHook(() => client.useEditMovie(), {
        wrapper: TestQueryWrapper,
      });

      // edit data
      result.current.mutate({ id: '88', data: { titleCs: 'Edited' } });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mock.history.patch.length).toEqual(1);

      const body = JSON.stringify({ titleCs: 'Edited' });
      expect(mock.history.patch[0].data).toEqual(body);
    });
  });

  describe('#useFetchPeople', () => {
    it('should people list', async () => {
      const response: FetchPeopleResponse = {
        items: [
          createTestPerson({ id: 'P1', name: 'Person 1' }),
          createTestPerson({ id: 'P2', name: 'Person 2' }),
          createTestPerson({ id: 'P3', name: 'Person 3' }),
        ],
        total: 3,
      };
      mock.onGet('/api/person').reply(200, response);

      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchPeople(), {
        wrapper: TestQueryWrapper,
      });

      // fetch data
      result.current.mutate({});

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mock.history.get.length).toEqual(1);
      expect(result.current.data?.total).toEqual(3);
      expect(result.current.data?.items.length).toEqual(3);
      expect(result.current.data?.items[0].id).toEqual('P1');
      expect(result.current.data?.items[0].name).toEqual('Person 1');
      expect(result.current.data?.items[1].id).toEqual('P2');
      expect(result.current.data?.items[1].name).toEqual('Person 2');
      expect(result.current.data?.items[2].id).toEqual('P3');
      expect(result.current.data?.items[2].name).toEqual('Person 3');
    });
  });

  describe('#useFetchPerson', () => {
    it('should person data', async () => {
      const response = createTestPerson({ id: 'P22', name: 'Person 22' });
      mock.onGet('/api/person/22').reply(200, response);

      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchPerson('22'), {
        wrapper: TestQueryWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mock.history.get.length).toEqual(1);
      expect(result.current.data?.id).toEqual('P22');
      expect(result.current.data?.name).toEqual('Person 22');
    });

    it('should handle HTTP 404 status', async () => {
      mock.onGet('/api/person/23').reply(404);
      expect(mock.history.get.length).toEqual(0);

      const { result } = renderHook(() => client.useFetchPerson('23'), {
        wrapper: TestQueryWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(null);
    });
  });
});
