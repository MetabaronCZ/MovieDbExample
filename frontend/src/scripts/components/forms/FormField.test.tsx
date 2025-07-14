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

  it('should render horizontal-reverse variant', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" orientation="horizontal-reverse">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render compact variant', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" orientation="compact">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render error', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" error="SOME-ERROR">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const error = getByText(container, 'SOME-ERROR');
    expect(error).toBeInTheDocument();
  });

  it('should render info text', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" info="SOME-INFO">
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const error = getByText(container, 'SOME-INFO');
    expect(error).toBeInTheDocument();
  });

  it('should render required label', async () => {
    const { container } = await waitForComponent(
      <FormField label="LABEL" required>
        CONTENT
      </FormField>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'CONTENT');
    expect(label).toBeInTheDocument();

    const asterisk = label.querySelector('span');
    expect(asterisk).toBeInTheDocument();
  });
});
