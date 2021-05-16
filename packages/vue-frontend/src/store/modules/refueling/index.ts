import RefuelingService from '@/services/RefuelingService';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators';
import { PaginationSettings } from '../types';
import { Refueling } from '@ra/common/dist/interfaces/types/Refueling.schema';

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
    this.refuelings = this.refuelings.filter(
      (refueling) => refueling.id !== id
    );
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
  async fetchAll(pagination?: PaginationSettings) {
    const refuelings: Refueling[] = await RefuelingService.getRefuelings(
      pagination
    );
    return { refuelings };
  }
}
