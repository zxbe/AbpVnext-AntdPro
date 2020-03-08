import request from "@/utils/request";
import { RoleQueryParams } from "./data";


export async function queryRoles(params?: RoleQueryParams): Promise<any> {
  return request('api/identity/roles', {
    method: 'GET',
    params,
  });
}
