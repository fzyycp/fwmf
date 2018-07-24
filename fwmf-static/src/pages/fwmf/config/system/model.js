import {querySystemInfo, addSystemInfo, updateSystemInfo, changeSystemAvailableById} from './service'

export default {
  namespace: 'system',
  state: {},
  effects: {
    * query({payload}, {call, put, select}) {
      const result = yield call(querySystemInfo, payload);

      yield put({
        type: 'saveQuery',
        payload,
        data:result.data,
      });
    },
    * add({payload, callback}, {call, put, select}) {
      const result = yield call(addSystemInfo, payload);
      if (result && result.code === '200' && callback) {
        callback(result.data);
      }
    },
    * edit({payload, callback}, {call, put, select}) {
      const result = yield call(updateSystemInfo, payload);
      if (result && result.code === '200' && callback) {
        callback(result.data);
      }
    },
    * changeSystemAvailable({payload, callback}, {call, put, select}) {
      const result = yield call(changeSystemAvailableById, payload);
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
