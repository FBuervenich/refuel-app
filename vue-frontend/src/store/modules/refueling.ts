import RefuelingService from '@/services/RefuelingService';
// import { Sleep } from '@/util/util';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators';
import { Refueling } from '../models';

@Module({ name: 'refueling' })
export default class Refuelings extends VuexModule {
  refuelings: Refueling[] = [];

  get refuelingsTotal(): number {
    return this.refuelings.length;
  }

  @Mutation
  addRefueling(refueling: Refueling) {
    this.refuelings.push(refueling);
  }

  @Action({ commit: 'addRefueling' })
  async createRefueling(refueling: Refueling) {
    const newRefueling = await RefuelingService.postRefueling(refueling);
    return newRefueling;
  }

  @MutationAction
  async fetchAll() {
    // await Sleep(2000);
    const refuelings: Refueling[] = await RefuelingService.getRefuelings();
    return { refuelings };
  }
}
