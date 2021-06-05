import { build } from '@maldan/tslib-gam-builder';
import * as Path from 'path';

build({
  frontendPath: Path.resolve('../frontend'),
  backendPath: Path.resolve('../backend'),
  rootPath: Path.resolve('../'),
  modules: [
    'y18n',
    'yargs-parser',
    'cliui',
    'string-width',
    'strip-ansi',
    'ansi-regex',
    'is-fullwidth-code-point',
    'emoji-regex',
    'wrap-ansi',
    'escalade',
    'get-caller-file',
    'require-directory',
  ],
  copyModules: ['webview'],
  zipOut: './../application.zip', //
});
