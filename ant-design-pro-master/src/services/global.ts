import request from "@/utils/request";

export async function getConfiguration() {
  return request('api/abp/application-configuration', {
    method: 'GET',
  });
}
