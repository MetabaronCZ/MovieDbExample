import { FC, useCallback, useMemo } from 'react';
import { MoviePersonData, PersonRole } from '@project/api-types';

import { client } from 'modules/api';

import { SelectField } from 'components/forms/SelectField';
import { SelectOption } from 'components/forms/select/SelectShared';

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
    async (query: string): Promise<SelectOption<MoviePersonData>[]> => {
      const response = await fetchPeople({ query, role });

      return response.items.map((item) => ({
        title: item.name,
        value: item,
      }));
    },
    [fetchPeople, role],
  );

  const options: SelectOption<MoviePersonData>[] = useMemo(() => {
    return value.map((item) => ({
      title: item.name,
      value: item,
    }));
  }, [value]);

  const searchItems: SelectOption<MoviePersonData>[] = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.items
      .filter((item) => !value.some((option) => option.id === item.id))
      .map((item) => ({ title: item.name, value: item }));
  }, [data, value]);

  return (
    <SelectField<MoviePersonData>
      label={title}
      value={value}
      error={error}
      options={options}
      search={{
        loading: isPending,
        items: searchItems,
        onSearch: searchPeople,
      }}
      disabled={disabled}
      multi
      vertical
      onSelect={onSelect}
    />
  );
};
