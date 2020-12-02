import apiClient from '@/util/api';

export default {
  getRefuelings() {
    return apiClient.get('refuelings');
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
