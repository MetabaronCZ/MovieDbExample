import { describe, expect, it, jest } from '@jest/globals';

import {
  getByText,
  getByTestId,
  queryByText,
  queryByTestId,
} from '@testing-library/dom';

import { FetchContainer } from './FetchContainer';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

// mock Loader component
jest.mock('./Loader.tsx', () => ({
  Loader: () => <div data-testid="loader-mock" />,
}));

// mock InfoBox component
jest.mock('./Infobox.tsx', () => ({
  Infobox: () => <div data-testid="info-mock" />,
}));

describe('components/common/FetchContainer', () => {
  it('should render loaded state', async () => {
    const { container } = await waitForComponent(
      <FetchContainer>CONTENT</FetchContainer>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const loader = queryByTestId(container, 'loader-mock');
    expect(loader).not.toBeInTheDocument();

    const alert = queryByTestId(container, 'info-mock');
    expect(alert).not.toBeInTheDocument();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();
  });

  it('should render loading state', async () => {
    const { container } = await waitForComponent(
      <FetchContainer isLoading>CONTENT</FetchContainer>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const loader = getByTestId(container, 'loader-mock');
    expect(loader).toBeInTheDocument();

    const alert = queryByTestId(container, 'info-mock');
    expect(alert).not.toBeInTheDocument();

    const content = queryByText(container, 'CONTENT');
    expect(content).not.toBeInTheDocument();
  });

  it('should render error state', async () => {
    const { container } = await waitForComponent(
      <FetchContainer isError>CONTENT</FetchContainer>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const loader = queryByTestId(container, 'loader-mock');
    expect(loader).not.toBeInTheDocument();

    const alert = getByTestId(container, 'info-mock');
    expect(alert).toBeInTheDocument();

    const content = queryByText(container, 'CONTENT');
    expect(content).not.toBeInTheDocument();
  });
});
