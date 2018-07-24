import request from 'src/utils/request';
import {MASTER_DOMAIN} from 'src/common/constants';

export async function query() {
  return request(`${MASTER_DOMAIN}/users`);
}

export async function queryCurrent() {
  return request(`${MASTER_DOMAIN}/currentUser`);
}
