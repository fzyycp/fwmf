import {queryShopInfo, addShopInfo, updateShopInfoById, changeShopAvailableById} from './service'

export default {
  namespace: 'shop',
  state: {},
  effects: {
    * query({payload}, {call, put, select}) {
      const result = yield call(queryShopInfo, payload);
      yield put({
        type: 'saveQuery',
        payload,
        data: result.data,
      });
    },
    * add({payload, callback}, {call, put, select}) {
      const result = yield call(addShopInfo, payload);
      if (result && result.code === '200' && callback) {
        callback(result.data);
      }
    },
    * edit({payload, callback}, {call, put, select}) {
      const result = yield call(updateShopInfoById, payload);
      if (result && result.code === '200' && callback) {
        callback(result.data);
      }
    },
    * changeShopAvailable({payload, callback}, {call, put, select}) {
      const result = yield call(changeShopAvailableById, payload);
      if (result && result.code === '200' && callback) {
        callback(result.data);
      }
    },
  },
  reducers: {
    saveQuery(state, action) {
      state.param = action.payload;
      state.data = action.data;
    },
  },
}
