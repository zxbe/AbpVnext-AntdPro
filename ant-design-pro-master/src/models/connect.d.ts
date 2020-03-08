import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { StateType } from './login';
import { RoleModelState } from "../pages/admin/role/model";
import { AccountSettingsModalState } from "../pages/common/AccountSettings/model";

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    role?: boolean;
    login?: boolean;
    accountSettings?:boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  role: RoleModelState;
  login: StateType;
  accountSettings:AccountSettingsModalState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
