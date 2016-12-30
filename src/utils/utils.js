export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  };

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export const getQueryVariables = () => {
  const variables = document.location.search.substring(1).split("&");
  const result    = [];
  if (variables) {
    variables.map(
      variable => {
        const [k, v] = variable.split("&");
        result.push({ [k]: v });
      }
    );
  }
  return result;
};

export const addLocationSearchVariable = (key, value) => {
  if (!key || !value) {
    return;
  }
  const queryVariables = getQueryVariables();
  if (!document.location.search) {
    document.location.search += `?${key}=${value}`;
  } else if (!queryVariables[key]) {
    document.location.search += `&${key}=${value}`;
  } else {
    queryVariables[key] = value;
    let query           = document.location.search.split("?")[0];
    queryVariables.map(([k, v], index) => query += `${index === 0 ? "?" : "&"}${k}=${v}`);
    document.location.search = query;
  }
};
