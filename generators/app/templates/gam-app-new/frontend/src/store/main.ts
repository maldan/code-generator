import { defineStore } from 'pinia';
import Axios from 'axios';
import { API_URL } from '@/const';

export interface IMainStore {
  test: string;
}

export const useMainStore = defineStore({
  id: 'main',
  state: () =>
    ({
      test: '',
    } as IMainStore),
  actions: {

  },
});
