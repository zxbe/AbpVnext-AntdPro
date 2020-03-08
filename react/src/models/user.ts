import { Effect } from 'dva';
import { Reducer } from 'redux';

import { IdentityUserCreateOrUpdateDto } from '@/pages/admin/user/data';
import { getUser } from '@/pages/admin/user/service';


export interface UserModelState {
  createOrUpdateUser?: IdentityUserCreateOrUpdateDto
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getUser: Effect;
  };
  reducers: {
    saveEditUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    createOrUpdateUser: {},
  },

  effects: {
    *getUser({ payload }, { call, put }) {
      const response = yield call(getUser, payload);
      yield put({
        type: 'saveEditUser',
        payload: response,
      })
    },
  },

  reducers: {
    saveEditUser(state, {payload}) {
      return {
        ...state,
        createOrUpdateUser: payload,
      };
    },
    changeNotifyCount(
      state = {
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
