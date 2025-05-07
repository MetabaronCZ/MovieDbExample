import { resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/scripts/**/*.mdx', '../src/scripts/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../build'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config) => {
    config.resolve = config.resolve ?? {};
    config.module = config.module ?? {};

    // use ts-loader
    config.module.rules = [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
    ];

    // fix Typescript import aliases not recognized by Storybook
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, '../tsconfig.json'),
      }),
    );
    return config;
  },
};

export default config;
