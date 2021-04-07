import { ElMessage } from 'element-plus';

export const SuccessMessage = {
  default: (message: string) => {
    ElMessage({
      message,
      type: 'success',
      showClose: false,
    });
  },
  closable: (message: string) => {
    ElMessage({
      message,
      type: 'success',
      showClose: true,
    });
  },
};
