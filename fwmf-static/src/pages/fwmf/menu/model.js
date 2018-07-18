import {getSystemMenuTree} from './service'

export default {
  namespace: 'menu',
  state: {},
  effects: {
    * getSystemMenuTree({payload}, {call, put, select}) {
      const response = yield call(getSystemMenuTree, payload);
      yield put({
        type: 'saveMenuTree',
        payload,
        response,
      });
    },
  },
  reducers: {
    saveMenuTree(state, action) {
      if(action.response && action.response.code === '200'){
        if(action.payload && 'root' === action.payload.nodeType){
          state.systems = action.response.data;
        }
      }
    },
  },
}
