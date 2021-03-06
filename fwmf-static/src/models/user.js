import { query as queryUsers, queryCurrent } from 'services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        response,
      });
    },
  },

  reducers: {
    save(state, action) {
      state.list = action.payload;
    },
    saveCurrentUser(state, action) {
      state.currentUser = action.response.data[0];
    },
    changeNotifyCount(state, action) {
      state.currentUser.notifyCount = action.payload;
    },
  },
};
