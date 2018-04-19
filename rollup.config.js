import fs from 'fs';
import babel from 'rollup-plugin-babel';

const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
const { env: { production: babelConfig } } = babelrc;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    exports: 'named',
    format: 'cjs'
  },
  external: ['react', 'prop-types', 'fast-deep-equal'],
  plugins: [
    babel(
      Object.assign(babelConfig, {
        babelrc: false
      })
    )
  ]
};
