// waits for other promises to resolve/reject (used in tests)
export const flushPromises = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve));
};
