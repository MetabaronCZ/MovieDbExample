import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from './Loader';
import { Infobox } from './Infobox';

interface Props extends PropsWithChildren {
  readonly isLoading?: boolean;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

export const FetchContainer: FC<Props> = ({
  isLoading,
  isError,
  errorMessage,
  children,
}) => {
  const { t } = useTranslation();

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Infobox type="error">{errorMessage ?? t('error.fetch')}</Infobox>
  ) : (
    children
  );
};
