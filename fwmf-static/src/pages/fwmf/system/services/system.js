import { stringify } from 'qs';
import request from 'utils/request';
import {config} from 'src/utils/utils';

export async function querySystem(params) {
  return request(`${config().DOMAIN}/web/system/querySystem?${stringify(params)}`);
}
export async function addSystem(params) {
  return request(`${config().DOMAIN}/web/system/addSystem?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editSystem(params) {
  return request(`${config().DOMAIN}/web/system/editSystem?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function changeSystemAvailable(params) {
  return request(`${config().DOMAIN}/web/system/changeSystemAvailable?${stringify(params)}`, {
    method: 'POST',
  });
}
