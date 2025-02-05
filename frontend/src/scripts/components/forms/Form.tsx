import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { UpdatedContent } from 'components/common/UpdatedContent';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${toVU(2)};
`;

interface Props extends PropsWithChildren {
  readonly loading?: boolean;
  readonly onSubmit?: () => void;
}

export const Form: FC<Props> = ({ loading = false, children, onSubmit }) => (
  <UpdatedContent loading={loading}>
    <StyledForm
      onSubmit={(e) => {
        if (onSubmit) {
          e.preventDefault();
          onSubmit();
        }
      }}
    >
      {children}
    </StyledForm>
  </UpdatedContent>
);
