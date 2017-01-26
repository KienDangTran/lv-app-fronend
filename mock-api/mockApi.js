import EmployeeApi from "./EmployeeApi";
import { getParameterByName } from "../src/utils/utils";

function fetch(uri) {
  let location = uri.split("?")[0];
  switch (location) {
    case "/employee/fetch":
      const pageNo   = getParameterByName("pageNo", uri);
      const pageSize = getParameterByName("pageSize", uri);
      return EmployeeApi.fetchEmployees(pageNo, pageSize);
    case "/employee/count":
      return EmployeeApi.countEmployees();
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
