import EmployeeApi from './EmployeeApi';
import UserApi from './UserApi';

function fetch(uri) {
  const location = uri.split('?')[0];
  const pageNo   = getParameterByName('pageNo', uri);
  const pageSize = getParameterByName('pageSize', uri);
  switch (location) {
    case '/employee/fetch':
      return EmployeeApi.fetchEmployees(pageNo, pageSize);
    case '/employee/count':
      return EmployeeApi.countEmployees();
    case '/user/fetch':
      return UserApi.fetchUsers(pageNo, pageSize);
    case '/user/count':
      return UserApi.countUsers();
    default:
      return new Promise(
        reject => reject(
          {
            message: 'Bad Request',
            status : 400
          }
        )
      );
  }
}

function getParameterByName(name, url) {
  if(!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if(!results) {
    return null;
  }
  if(!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default fetch;
