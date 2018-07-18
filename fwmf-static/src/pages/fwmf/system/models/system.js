import {querySystem, addSystem, editSystem, changeSystemAvailable} from '../services/system'

export default {
  namespace: 'system',
  state: {},
  effects: {
    * query({payload}, {call, put, select}) {
      const response = yield call(querySystem, payload);
      yield put({
        type: 'saveQuery',
        payload,
        response,
      });
    },
    * add({payload, callback}, {call, put, select}) {
      const response = yield call(addSystem, payload);
      const param = yield select((state) => {
        console.log(state);
        return state.system.param;
      });
      yield put({type: 'query', payload: param});
      if (callback) callback(response);
    },
    * edit({payload, callback}, {call, put, select}) {
      const response = yield call(editSystem, payload);
      const page = yield select(state => state.system.page);
      yield put({type: 'query', payload: page});
      if (callback) callback(response);
    },
    * changeSystemAvailable({payload, callback}, {call, put, select}) {
      const response = yield call(changeSystemAvailable, payload);
      const page = yield select(state => state.system.page);
      yield put({type: 'query', payload: page});
      if (callback) callback(response);
    },
  },
  reducers: {
    saveQuery(state, action) {
      state.param = action.payload;
      state.data = action.response.data;
    },
    // save(state, action) {
    //   console.log(state);
    //   return {
    //     ...state,
    //     data: action.payload.data,
    //   };
    // },
  },
}
