import { Refueling } from '@/store/models';
import apiClient from '@/util/api';

export default {
  async getRefuelings(): Promise<Refueling[]> {
    const response = await apiClient.get<Refueling[]>('refuelings');
    return response.data;
  },
  getRefueling(id: number) {
    return apiClient.get('refuelings/' + id);
  },
  postRefueling(refueling: object) {
    return apiClient.post('refuelings', refueling);
  },
  putRefueling(id: number, refueling: object) {
    return apiClient.put('refuelings/' + id, refueling);
  },
  deleteRefueling(id: number) {
    return apiClient.delete('refuelings/' + id);
  },
};
