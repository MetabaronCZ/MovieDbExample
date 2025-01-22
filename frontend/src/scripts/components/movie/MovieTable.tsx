import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { client } from 'modules/api';

import { Box } from 'components/common/Box';
import { Text } from 'components/Typography';
import { Loader } from 'components/common/Loader';
import { Infobox } from 'components/common/Infobox';

const TableHeader = styled.th`
  ${Text.Base};
  text-align: left;
`;

const TableColumn = styled.td`
  ${Text.Base};
`;

export const MovieTable: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = client.useFetchMovies();

  return isLoading ? (
    <Loader />
  ) : isError || !data ? (
    <Infobox type="error">{t('error.fetch')}</Infobox>
  ) : 0 === data.items.length ? (
    <Infobox>{t('movies.empty')}</Infobox>
  ) : (
    <Box>
      <table>
        <thead>
          <tr>
            <TableHeader>{t('movie.title')}</TableHeader>
            <TableHeader>{t('movie.year')}</TableHeader>
            <TableHeader>{t('movie.score')}</TableHeader>
            <TableHeader>{t('movie.genre')}</TableHeader>
            <TableHeader>{t('movie.director')}</TableHeader>
            <TableHeader>{t('movie.writer')}</TableHeader>
            <TableHeader>{t('movie.stars')}</TableHeader>
          </tr>
        </thead>

        <tbody>
          {data.items.map((item) => (
            <tr key={item.id}>
              <TableColumn>
                {[item.titleCs, item.titleOriginal]
                  .filter((item) => !!item)
                  .map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
              </TableColumn>
              <TableColumn>{item.year ?? '-'}</TableColumn>
              <TableColumn>{item.score ? `${item.score}/10` : '-'}</TableColumn>
              <TableColumn>{item.genres.join(', ') || '-'}</TableColumn>
              <TableColumn>{item.directors.join(', ') || '-'}</TableColumn>
              <TableColumn>{item.writers.join(', ') || '-'}</TableColumn>
              <TableColumn>{item.stars.join(', ') || '-'}</TableColumn>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};
