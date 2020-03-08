import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';
import { login, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import AppConsts from "../utils/appconst";

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}


export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const formData = new FormData();
      formData.append('password', payload.password);
      formData.append('username', payload.userNameOrEmailAddress);
      formData.append('grant_type', AppConsts.oAuthConfig.grant_type!);
      formData.append('client_id', AppConsts.oAuthConfig.client_id!);
      formData.append('client_secret', AppConsts.oAuthConfig.client_secret!);
      formData.append('scope', AppConsts.oAuthConfig.scope!);
      const response = yield call(login, formData);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
/*       yield put({
        type: 'global/getApplicationConfiguration',
      }); */
      // Login successfully
      if (response.access_token !== undefined) {
        localStorage.setItem('token', response.access_token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },
    *logout(_, { call }) {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield call(logout);
        router.replace({
          pathname: '/account/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
