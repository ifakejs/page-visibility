import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
const pkg = require('./package.json')

const isDev = process.env.NODE_ENV !== 'production'

const banner = `/*!
 * @ifake/page-visibility
 * (c) 2020-${new Date().getFullYear()} BiYuqi
 * Released under the MIT License.
 * https://github.com/ifakejs/page-visibility
 */`

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'IFPageVisible',
      exports: 'named',
      footer:
        'if(typeof window !== "undefined" && window.IFPageVisible) { \n' +
        '  window.IFPageVisible = window.IFPageVisible.pageVisibility;\n}',
      banner
    },
    {
      file: pkg.module,
      format: 'es',
      banner
    }
  ],
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/
    }),
    json(),
    !isDev &&
      terser({
        format: {
          comments: function (_, comment) {
            // Only the current copyright information is retained
            return /@ifake/i.test(comment.value)
          }
        }
      }),
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}
