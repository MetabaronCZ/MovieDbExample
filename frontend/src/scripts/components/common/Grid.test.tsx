import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Grid } from 'components/common/Grid';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Grid', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Grid>CONTENT</Grid>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    expect(content.nodeName.toLowerCase()).toEqual('div');
  });

  it('should render props', async () => {
    const { container } = await waitForComponent(
      <Grid
        component="section"
        orientation="horizontal"
        align="flex-end"
        justify="flex-start"
        gap={3}
        flex={1}
        wrap
      >
        CONTENT
      </Grid>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    expect(content.nodeName.toLowerCase()).toEqual('section');
    expect(content).toHaveStyle({ flexDirection: 'row' });
    expect(content).toHaveStyle({ flexWrap: 'wrap' });
    expect(content).toHaveStyle({ gap: '24px' });
    expect(content).toHaveStyle({ alignItems: 'flex-end' });
    expect(content).toHaveStyle({ justifyContent: 'flex-start' });
  });
});
