import { Configuration } from 'webpack';
import 'webpack-dev-server';

import path from 'path';
import Dotenv from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const pathSrc = './src/scripts';
const pathStatic = './src/static';
const pathTemplates = './src/templates';

const pathBuild = path.resolve(__dirname, './build');
const pathPublic = '/scripts/';
const pathModules = './node_modules';

type Args = Record<string, string | boolean>;

const config = (env: Args, argv: Args): Configuration => {
  const isProduction = 'production' === argv.mode;

  return {
    entry: {
      app: `${pathSrc}/index`,
    },
    output: {
      path: `${pathBuild}/scripts`,
      publicPath: pathPublic,
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
    },
    target: 'web',
    devtool: isProduction ? false : 'source-map',
    devServer: {
      static: {
        directory: pathBuild,
      },
      compress: true,
      port: 3000,
      devMiddleware: {
        writeToDisk: true,
      },
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3001',
          pathRewrite: { '^/api': '' },
        },
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }],
          include: path.resolve(pathSrc),
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: pathStatic, to: pathBuild }],
      }),
      new HtmlWebPackPlugin({
        template: `${pathTemplates}/index.html`,
        filename: `${pathBuild}/index.html`,
      }),
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js'],
        exclude: ['node_modules', 'build', 'coverage'],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: [path.resolve(pathSrc), path.resolve(pathModules)],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            // node modules imported non-dynamically
            name: 'libs',
            chunks: 'initial',
            test: /node_modules/,
          },
        },
      },
      minimizer: [new TerserWebpackPlugin()],
    },
    stats: 'minimal',
    performance: {
      hints: false,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};

export default config;
