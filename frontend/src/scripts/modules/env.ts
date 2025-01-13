export const ENV = {
  isDevMode: () => {
    return process.env.NODE_ENV === 'development';
  },
};
