import { Config } from '@maldan/tslib-rest-server';

export class MainApi {
  static path: string = 'main';

  @Config({
    useJsonWrapper: true,
  })
  static get_index(): unknown {
    return 'Hello world';
  }
}
