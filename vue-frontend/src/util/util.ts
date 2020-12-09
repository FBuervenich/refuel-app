import moment from 'moment';

export const formatDateToISO8601 = (date: number) => {
  return moment(date).format();
};
