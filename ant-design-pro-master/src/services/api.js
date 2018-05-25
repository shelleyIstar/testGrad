import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

// export async function queryRule(params) {
//   console.log("!!!")
//   return request(`/api/rule?${stringify(params)}`);
// }

export async function queryRule(params) {
  return request(`/list_stu.action?${stringify(params)}`);
}

export async function queryStuIdData(data) {
  console.log("data", data)
  return request(`/search_stu.action?${stringify(data)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'PUT',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFreshman(params) {
  return request('/update_freshman.action', {
    method: 'POST',
    body: params
  });
}

export async function searchStudentItem(params) {
  return request(`/get_stu.action?${stringify(params)}`);
}

export async function listQu() {
  return request(`/list_question.action`);
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryListMajor() {
  return request('/list_major_dir.action');
}
