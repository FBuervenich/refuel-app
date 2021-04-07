import { createStore } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Refuelings from './modules/refueling';
import store from '@/store';

import refueling from './modules/refueling';

export default createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    refueling,
  },
});

export const RefuelingsModule = getModule(Refuelings, store);
