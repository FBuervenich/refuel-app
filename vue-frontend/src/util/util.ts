import moment from 'moment';

export function formatDateToISO8601(date: number) {
  return moment(date).format();
}

export function Sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function copyObject(obj: Object): Object {
  return Object.assign({}, obj);
}
