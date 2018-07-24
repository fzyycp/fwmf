import {getSystemMenuTree} from './service'

export default {
  namespace: 'menu',
  state: {},
  effects: {
    * getSystemMenuTree({payload}, {call, put, select}) {
      const result = yield call(getSystemMenuTree, payload);
      yield put({
        type: 'saveMenuTree',
        payload,
        data: result.data,
      });
    },
  },
  reducers: {
    saveMenuTree(state, action) {
      if (action.payload && 'root' === action.payload.nodeType) {
        state.systems = action.data;
      }
    },
  },
}
