


import request from '@/utils/request';
import { UserQueryParams } from '@/pages/admin/user/data';

export async function queryUsers(params?: UserQueryParams): Promise<any> {
  return request('api/identity/users', {
    method: 'GET',
    params,
  });
}
export async function getUser(id:string): Promise<any> {
  return request(`api/identity/users/${id}`);
}
export async function query(): Promise<any> {
  return request('/api/users');
}
export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
