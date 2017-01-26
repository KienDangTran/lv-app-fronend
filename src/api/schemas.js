import { schema } from "normalizr";

/*
 We use this Normalizr schemas to transform API responses from a nested form
 to a flat form where employees are placed in `entities`, and nested
 JSON objects are replaced with their IDs. This is very convenient for
 consumption by reducers, because we can easily build a normalized tree
 and keep it updated as we callApi more data.

 Read more about Normalizr: https://github.com/paularmstrong/normalizr

 API may return results with lower letters while the query
 doesn't contain any. For example, "SOMEUSER" could result in "SomeUser"
 leading to a frozen UI as it wouldn't find "SOMEUSER" in the entities.
 That's why we're forcing upper cases there.
 */

const employee = new schema.Entity(
  "employee",
  {},
  { idAttribute: employee => employee.code.toUpperCase() }
);

const user = new schema.Entity(
  "user",
  {},
  { idAttribute: user => user.userId.toUpperCase() }
);

/**
 * Schemas for API responses.
 */
const schemas = {
  EMPLOYEE      : employee,
  EMPLOYEE_ARRAY: new schema.Array(employee),
  USER          : user,
  USER_ARRAY    : new schema.Array(user)
};

export default schemas;
