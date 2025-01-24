import { ReactNode } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { toVU } from 'modules/theme';
import { UsePaging } from 'hooks/usePaging';

import { Text } from 'components/Typography';
import { IcoButton } from 'components/buttons/IcoButton';
import { SelectField } from 'components/forms/SelectField';
import { SelectOption } from 'components/forms/select/Select';

const getPerPageOptions = <T extends number>(
  options: T[],
): SelectOption<T>[] => {
  return options.map((item) => ({
    title: `${item}`,
    value: item,
  }));
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${toVU(1)};
  padding-top: ${toVU(1)};
  border-top: ${({ theme }) => theme.border.divider};
`;

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${toVU(1)};
`;

const PagingInfo = styled.div`
  ${Text.Small};
  color: ${({ theme }) => theme.color.disabled};
`;

const PageNumber = styled.div`
  ${Text.Base};
  min-width: ${toVU(3)};
  font-weight: bold;
  text-align: center;
`;

interface Props<U extends number> {
  readonly paging: UsePaging<U>;
}

export const Paging = <T extends number>({ paging }: Props<T>): ReactNode => {
  const { t } = useTranslation();
  const {
    from,
    to,
    totalCount,
    page,
    lastPage,
    perPage,
    perPages,
    disabled,
    setPerPage,
    gotoFirst,
    gotoPrev,
    gotoNext,
    gotoLast,
  } = paging;

  const perPagesOptions = getPerPageOptions(perPages);
  const isFirstPage = 0 === page;
  const isLastPage = lastPage === page;

  return (
    <Container>
      <PagingInfo>
        {t('paging.info', {
          from: totalCount > 0 ? from + 1 : 0,
          to,
          total: totalCount,
        })}
      </PagingInfo>

      <Pages>
        <IcoButton
          ico="angleLeftDouble"
          icoSize="default"
          title={t('paging.first')}
          disabled={disabled || isFirstPage}
          onClick={() => {
            gotoFirst();
          }}
        />

        <IcoButton
          ico="angleLeft"
          icoSize="default"
          title={t('paging.prev')}
          disabled={disabled || isFirstPage}
          onClick={() => {
            gotoPrev();
          }}
        />

        <PageNumber>{page + 1}</PageNumber>

        <IcoButton
          ico="angleRight"
          icoSize="default"
          title={t('paging.next')}
          disabled={disabled || isLastPage}
          onClick={() => {
            gotoNext();
          }}
        />

        <IcoButton
          ico="angleRightDouble"
          icoSize="default"
          title={t('paging.last')}
          disabled={disabled || isLastPage}
          onClick={() => {
            gotoLast();
          }}
        />
      </Pages>

      <SelectField
        label={t('paging.title')}
        align="left"
        value={perPage}
        options={perPagesOptions}
        disabled={disabled}
        onSelect={setPerPage}
      />
    </Container>
  );
};
