import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FetchContainer } from './FetchContainer';

const meta: Meta<typeof FetchContainer> = {
  component: FetchContainer,
};

export default meta;

export const FetchContainerLoading: StoryObj<typeof FetchContainer> = {
  name: 'FetchContainer loading state',
  render: () => <FetchContainer isLoading>CONTENT</FetchContainer>,
};

export const FetchContainerError: StoryObj<typeof FetchContainer> = {
  name: 'FetchContainer error state',
  render: () => <FetchContainer isError>CONTENT</FetchContainer>,
};

export const FetchContainerLoaded: StoryObj<typeof FetchContainer> = {
  name: 'FetchContainer loaded state',
  render: () => <FetchContainer>CONTENT</FetchContainer>,
};

export const FetchContainerCustomError: StoryObj<typeof FetchContainer> = {
  name: 'FetchContainer with custom error',
  render: () => (
    <FetchContainer isError errorMessage="Custom error message">
      CONTENT
    </FetchContainer>
  ),
};
