import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { FormField } from './FormField';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/FormField', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <FormField id="ID" label="LABEL">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    const label = getByText(container, 'LABEL');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'ID');
  });

  it('should render vertical variant', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" orientation="vertical">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });
});
