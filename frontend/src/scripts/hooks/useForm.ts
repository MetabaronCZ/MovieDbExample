import { useCallback, useEffect, useState } from 'react';
import { getObjectEntries } from 'modules/core';

type FormData = Record<string, unknown>;

export interface Validation<T> {
  readonly test: (value: T) => boolean;
  readonly error: string;
}

type Validations<T extends FormData> = Partial<{
  readonly [key in keyof T]: Validation<T[key]>[];
}>;

export type FormErrors<T extends FormData> = Partial<{
  readonly [key in keyof T]: string | null;
}>;

type OnFieldChange<T extends FormData> = <S extends keyof T>(
  field: S,
  value: T[S],
  skipValidation?: boolean,
) => void;

interface UseFormConfig<T extends FormData> {
  readonly initialValues: T;
  readonly validations?: Validations<T>;
  readonly onSubmit?: (data: T) => void;
  readonly onSubmitError?: () => void;
}

interface UseForm<T extends FormData> {
  readonly values: T; // form data values
  readonly errors: FormErrors<T>; // form data errors
  readonly isModified: boolean; // indicates form data are different from initial state
  readonly setValue: OnFieldChange<T>; // validates and sets form field value
  readonly submit: () => void; // validates and returns form data
  readonly clear: () => void; // resets form data to initial state
  readonly fixateData: () => void; // sets current form data as initial
}

export const useForm = <T extends FormData>(
  config: UseFormConfig<T>,
): UseForm<T> => {
  const [initialValues, setInitialValues] = useState<T>(config.initialValues);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isModified, setModified] = useState(false);

  // evaluate isModified state
  useEffect(() => {
    for (const [field, value] of getObjectEntries(values)) {
      const fieldValue = JSON.stringify(value);
      const initialValue = JSON.stringify(initialValues[field]);

      if (initialValue !== fieldValue) {
        setModified(true);
        return;
      }
    }
    setModified(false);
  }, [initialValues, values]);

  // set form field error
  const setFieldError = useCallback(
    (field: keyof T, error: string | null): void => {
      setErrors((state) => ({
        ...state,
        [field]: error,
      }));
    },
    [],
  );

  // validate form field data
  const validateField = useCallback(
    <S extends keyof T>(field: S, value: T[S]): boolean => {
      const validations = config.validations
        ? (config.validations[field] ?? [])
        : [];

      for (const { test, error } of validations) {
        if (!test(value)) {
          setFieldError(field, error);
          return false;
        }
      }
      setFieldError(field, null);
      return true;
    },
    [config.validations, setFieldError],
  );

  // validate all form fields data
  const validateForm = useCallback((): boolean => {
    let isValid = true;

    for (const field in values) {
      const value = values[field];
      const valid = validateField(field, value);

      if (!valid) {
        isValid = false;
      }
    }
    return isValid;
  }, [validateField, values]);

  // set form field value
  const setValue: OnFieldChange<T> = useCallback(
    (field, value, skipValidation) => {
      if (!skipValidation) {
        validateField(field, value);
      } else {
        setFieldError(field, null);
      }

      setValues((state) => ({
        ...state,
        [field]: value,
      }));
    },
    [setFieldError, validateField],
  );

  // try submit form data
  const submit = useCallback((): void => {
    const isValid = validateForm();

    if (isValid) {
      // submit form data
      if (config.onSubmit) {
        config.onSubmit(values);
      }
    } else {
      // signalize validation error
      if (config.onSubmitError) {
        config.onSubmitError();
      }
    }
  }, [config, validateForm, values]);

  // reset form data to initial values
  const clear = useCallback((): void => {
    setErrors({});
    setValues(initialValues);
  }, [initialValues]);

  // sets current form data as initial
  const fixateData = useCallback((): void => {
    setInitialValues(values);
  }, [values]);

  return {
    values,
    errors,
    isModified,
    setValue,
    submit,
    clear,
    fixateData,
  };
};
