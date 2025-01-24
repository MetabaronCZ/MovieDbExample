export const invalidFieldAttributeName = 'data-invalid';

// scroll to element
export const scrollToElement = (element: HTMLElement): void => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

// scroll to first form validation error
export const scrollToError = (): void => {
  window.setTimeout(() => {
    const invalidItems = document.querySelectorAll<HTMLFieldSetElement>(
      `[${invalidFieldAttributeName}]`,
    );
    const invalidFields = Array.from(invalidItems);

    if (0 === invalidFields.length) {
      return;
    }
    let topError = invalidFields[0];

    for (const field of invalidFields) {
      if (field.offsetTop < topError.offsetTop) {
        topError = field;
      }
    }
    scrollToElement(topError);
  }, 0);
};
