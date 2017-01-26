import EmployeeApi from "./EmployeeApi";
import UserApi from "./UserApi";
import { getParameterByName } from "../src/utils/utils";

function fetch(uri) {
  const location = uri.split("?")[0];
  const pageNo   = getParameterByName("pageNo", uri);
  const pageSize = getParameterByName("pageSize", uri);
  switch (location) {
    case "/employee/fetch":
      return EmployeeApi.fetchEmployees(pageNo, pageSize);
    case "/employee/count":
      return EmployeeApi.countEmployees();
    case "/user/fetch":
      return UserApi.fetchUsers(pageNo, pageSize);
    case "/user/count":
      return UserApi.countUsers();
    default:
      return new Promise(
        reject => reject(
          {
            message: "Bad Request",
            status : 400
          }
        )
      )
  }
}

export default fetch;
