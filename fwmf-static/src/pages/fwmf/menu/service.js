import { stringify } from 'qs';
import request from 'utils/request';
import {config} from 'src/utils/utils';

export async function getSystemMenuTree(params) {
  return request(`${config().DOMAIN}/api/menu/getSystemMenuTree?${stringify(params)}`);
}
