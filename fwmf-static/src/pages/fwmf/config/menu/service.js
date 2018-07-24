import { stringify } from 'qs';
import request from 'src/utils/request';
import {MASTER_DOMAIN} from 'src/common/constants';

export async function getSystemMenuTree(params) {
  return request(`${MASTER_DOMAIN}/fwmf/config/menu/getSystemMenuTree.rf?${stringify(params)}`);
}
