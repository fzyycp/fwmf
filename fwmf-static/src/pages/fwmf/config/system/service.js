import { stringify } from 'qs';
import request from 'src/utils/request';
import {MASTER_DOMAIN} from 'src/common/constants';

export async function querySystemInfo(params) {
  return request(`${MASTER_DOMAIN}/fwmf/config/system/querySystemInfo.rf?${stringify(params)}`);
}
export async function addSystemInfo(params) {
  return request(`${MASTER_DOMAIN}/fwmf/config/system/addSystemInfo.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function updateSystemInfo(params) {
  return request(`${MASTER_DOMAIN}/fwmf/config/system/updateSystemInfo.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function changeSystemAvailableById(params) {
  return request(`${MASTER_DOMAIN}/fwmf/config/system/changeSystemAvailableById.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
