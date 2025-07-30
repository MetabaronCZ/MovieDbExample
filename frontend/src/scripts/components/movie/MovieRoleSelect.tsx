import { FC, useCallback, useMemo } from 'react';
import { MoviePersonData, PersonRole } from '@project/api-types';

import { client } from 'modules/api';

import { SelectOption } from 'components/forms/select/SelectShared';
import { SelectSearchField } from 'components/forms/SelectSearchField';

interface Props {
  readonly title: string;
  readonly role: PersonRole;
  readonly value: MoviePersonData[];
  readonly error?: string | null;
  readonly disabled?: boolean;
  readonly onSelect: (value: MoviePersonData[]) => void;
}

export const MovieRoleSelect: FC<Props> = ({
  title,
  role,
  value,
  error,
  disabled = false,
  onSelect,
}) => {
  const { data, isPending, mutateAsync: fetchPeople } = client.useFetchPeople();

  const searchPeople = useCallback(
    (query: string): void => {
      void fetchPeople({ query, role });
    },
    [fetchPeople, role],
  );

  const values: SelectOption<MoviePersonData>[] = useMemo(() => {
    return value.map((item) => ({ title: item.name, value: item }));
  }, [value]);

  const options: SelectOption<MoviePersonData>[] = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.items
      .filter((item) => !value.some((option) => option.id === item.id))
      .map((item) => ({ title: item.name, value: item }));
  }, [data, value]);

  return (
    <SelectSearchField<MoviePersonData>
      label={title}
      value={values}
      error={error}
      options={options}
      loading={isPending}
      disabled={disabled}
      vertical
      onSearch={searchPeople}
      onSelect={onSelect}
    />
  );
};
