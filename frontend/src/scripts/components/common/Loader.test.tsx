import { describe, expect, it } from '@jest/globals';

import { Loader } from './Loader';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Loader', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Loader />, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const ico = container.getElementsByTagName('i');
    expect(ico.length).toEqual(1);
  });
});
