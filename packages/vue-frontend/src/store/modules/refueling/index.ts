import RefuelingService from '@/services/RefuelingService';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators';
import { Refueling } from '../../models';

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

  @Mutation
  removeRefueling(id: number) {
    this.refuelings = this.refuelings.filter(refueling => refueling.id !== id);
  }

  @Action({ commit: 'addRefueling' })
  async createRefueling(refueling: Refueling) {
    const newRefueling = await RefuelingService.postRefueling(refueling);
    return newRefueling.data;
  }

  @Action({ commit: 'removeRefueling' })
  async deleteRefueling(id: number) {
    await RefuelingService.deleteRefueling(id);
    return id;
  }

  @MutationAction
  async fetchAll() {
    const refuelings: Refueling[] = await RefuelingService.getRefuelings();
    return { refuelings };
  }
}
