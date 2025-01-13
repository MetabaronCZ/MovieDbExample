import { TFunction } from 'i18next';
import { Validation } from 'hooks/useForm';

export interface Validations {
  readonly REQUIRED: Validation<string | null>;
  readonly INTEGER: Validation<string>;
  readonly MIN: (min: number) => Validation<string>;
  readonly MAX: (min: number) => Validation<string>;
  readonly MIN_LENGTH: (min: number) => Validation<string>;
  readonly MAX_LENGTH: (max: number) => Validation<string>;
  readonly MAX_ITEMS: <T>(max: number) => Validation<T[]>;
}

export const getValidations = (t: TFunction): Validations => ({
  REQUIRED: {
    test: (value) => !!value,
    error: t('validations.REQUIRED'),
  },
  INTEGER: {
    test: (value) => !value || Number.isInteger(parseInt(value, 10)),
    error: t('validations.INTEGER'),
  },
  MIN: (min) => ({
    test: (value) => !value || parseInt(value, 10) >= min,
    error: t('validations.MIN', { min }),
  }),
  MAX: (max) => ({
    test: (value) => !value || parseInt(value, 10) <= max,
    error: t('validations.MAX', { max }),
  }),
  MIN_LENGTH: (min) => ({
    test: (value) => !value || value.length >= min,
    error: t('validations.MIN_LENGTH', { count: min }),
  }),
  MAX_LENGTH: (max) => ({
    test: (value) => !value || value.length <= max,
    error: t('validations.MAX_LENGTH', { count: max }),
  }),
  MAX_ITEMS: (max) => ({
    test: (value) => !value.length || value.length <= max,
    error: t('validations.MAX_ITEMS', { count: max }),
  }),
});
