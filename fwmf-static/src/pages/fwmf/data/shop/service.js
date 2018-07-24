import { stringify } from 'qs';
import request from 'src/utils/request';
import {MASTER_DOMAIN} from 'src/common/constants';

export async function queryShopInfo(params) {
  return request(`${MASTER_DOMAIN}/fwmf/data/shop/queryShopInfo.rf?${stringify(params)}`);
}
export async function addShopInfo(params) {
  return request(`${MASTER_DOMAIN}/fwmf/data/shop/addShopInfo.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function updateShopInfoById(params) {
  return request(`${MASTER_DOMAIN}/fwmf/data/shop/updateShopInfoById.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function changeShopAvailableById(params) {
  return request(`${MASTER_DOMAIN}/fwmf/data/shop/changeShopAvailableById.rf?${stringify(params)}`, {
    method: 'POST',
  });
}
