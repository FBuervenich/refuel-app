import { Refueling } from '@/store/models';
import apiClient from '@/util/api';
import { ApiV1NewRefuelingRequest } from '../../../common/types/ApiV1Types';

export default {
  async getRefuelings(): Promise<Refueling[]> {
    const response = await apiClient.get<Refueling[]>('refuelings');
    return response.data;
  },
  getRefueling(id: number) {
    return apiClient.get('refuelings/' + id);
  },
  postRefueling(refueling: any) {
    const payload: ApiV1NewRefuelingRequest = refueling;
    return apiClient.post('refuelings', payload);
  },
  putRefueling(id: number, refueling: object) {
    return apiClient.put('refuelings/' + id, refueling);
  },
  deleteRefueling(id: number) {
    return apiClient.delete('refuelings/' + id);
  },
};
