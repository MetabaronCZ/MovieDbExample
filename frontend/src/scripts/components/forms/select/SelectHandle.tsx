import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import { toVU } from 'modules/theme';

import { Ico } from 'components/common/Ico';
import { ButtonRaw } from 'components/buttons/ButtonRaw';
import { ButtonText } from 'components/buttons/ButtonText';
import { ButtonStyles } from 'components/buttons/ButtonShared';

export const SelectHandleStyles = css`
  ${ButtonStyles};
  width: 100%;
  height: ${toVU(5)};
  gap: ${toVU(1)};
  padding-left: ${toVU(1.5)};
  padding-right: ${toVU(1.5)};
`;

const Container = styled(ButtonRaw)`
  ${SelectHandleStyles};
`;

const Content = styled(ButtonText)`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 400;
  text-align: left;
`;

interface Props extends PropsWithChildren {
  readonly id?: string;
  readonly opened?: boolean;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}

export const SelectHandle: FC<Props> = ({
  id,
  opened = false,
  disabled = false,
  onClick,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Container
      id={id}
      title={opened ? t('close') : t('open')}
      disabled={disabled}
      onClick={onClick}
    >
      <Content>{children}</Content>
      <Ico ico={opened ? 'angleUp' : 'angleDown'} size="large" />
    </Container>
  );
};
