import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TFunction } from 'i18next';

import { PersonFilter, PersonRole, personRoles } from '@project/api-types';

import { useForm } from 'hooks/useForm';

import { Box } from 'components/common/Box';
import { Form } from 'components/forms/Form';
import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { Button } from 'components/buttons/Button';
import { TextField } from 'components/forms/TextField';
import { SelectField } from 'components/forms/SelectField';
import { SelectOption } from 'components/forms/select/SelectShared';

const getRoleOptions = (
  t: TFunction,
): SelectOption<PersonRole | undefined>[] => {
  const roles: SelectOption<PersonRole>[] = personRoles.map((role) => ({
    title: t(`role.${role}`),
    value: role,
  }));
  return [{ title: t('filter.person.roleSelect'), value: undefined }, ...roles];
};

const formDataToFilter = (formData: FormData): PersonFilter => ({
  query: formData.query,
  role: formData.role,
});

const FilterQuery = styled.div`
  flex: 1;
`;

const FilterDivider = styled.div`
  &::after {
    ${Text.Base};
    content: '|';
    font-weight: 700;
  }
`;

type FormData = {
  readonly query: string;
  readonly role?: PersonRole;
};

interface Props {
  readonly isLoading?: boolean;
  readonly onChange: (filter: PersonFilter) => void;
}

export const PersonListFilter: FC<Props> = ({
  isLoading = false,
  onChange,
}) => {
  const { t } = useTranslation();
  const roleOptions = useMemo(() => getRoleOptions(t), [t]);

  const { values, errors, setValue, submit, clear } = useForm<FormData>({
    initialValues: {
      query: '',
      role: undefined,
    },
    validations: {
      /* */
    },
    onSubmit: (formData) => {
      const data = formDataToFilter(formData);
      onChange(data);
    },
    onClear: (formData) => {
      const data = formDataToFilter(formData);
      onChange(data);
    },
  });

  return (
    <Form loading={isLoading} onSubmit={submit}>
      <Box>
        <Grid align="center" flex={1}>
          <FilterQuery>
            <TextField
              placeholder={t('filter.person.query')}
              value={values.query}
              error={errors.query}
              disabled={isLoading}
              onChange={(value) => {
                setValue('query', value);
              }}
            />
          </FilterQuery>

          <Grid align="center" gap={1}>
            <SelectField
              label={t('filter.person.role')}
              orientation="compact"
              value={values.role}
              options={roleOptions}
              disabled={isLoading}
              onSelect={(value) => {
                setValue('role', value);
              }}
            />

            <FilterDivider />

            <Button
              text={t('filter.clear')}
              icoBefore="filterClear"
              disabled={isLoading}
              onClick={clear}
            />

            <Button
              text={t('filter.action')}
              icoBefore={isLoading ? 'spinner' : 'search'}
              icoSpin={isLoading}
              disabled={isLoading}
              onClick={submit}
            />
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};
