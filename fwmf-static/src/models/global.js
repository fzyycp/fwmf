import router from 'umi/router';
import { logout } from 'src/services/global';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { DEFAULT_LOCALE } from 'common/constants';

export default {
  namespace: 'global',

  state: {
    locale: DEFAULT_LOCALE,
    collapsed: false,
    currentUser: {},
    login: false,
  },

  effects: {
    *logout(_, {call, put }) {
      yield call(logout);
      yield put(
        routerRedux.push({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *changeLayoutCollapsed(action, { call, put }) {
      yield put({
        type: 'changeLayoutCollapsed',
      });
    },
    *login(action, { call, put }) {
      yield put({
        type: 'signin',
      });
      yield put(router.push('/'));
    },
  },

  reducers: {
    signin(state) {
      state.login = true;
    },
    changeLayoutCollapsed(state, { payload }) {
      state.collapsed = payload;
    },
    localeToggle(state, { payload }) {
      state.locale = payload;
    },
  },
};
