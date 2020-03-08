
import { IdentityUserCreateOrUpdateDto } from '@/pages/admin/user/data';


export interface RoleModelState {
  createOrUpdateUser?: IdentityUserCreateOrUpdateDto
}

export interface RoleModelType {
  namespace: 'role';
  state: RoleModelState;
  effects: {
  };
  reducers: {
  };
}

const RoleModel: RoleModelType = {
  namespace: 'role',

  state: {
  },

  effects: {

  },

  reducers: {

  },
};

export default RoleModel;
