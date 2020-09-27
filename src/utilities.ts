import snakeCase from "lodash/snakeCase";

function parseArray(object) {
  let data = [];
  for (let item of object) {
    data.push(toSnakeCase(item));
  }
  return data;
}
function parseObject(object) {
  let data = {};
  for (let key of Object.keys(object)) {
    if (object[key] instanceof Object) {
      data[snakeCase(key)] = toSnakeCase(object[key]);
      continue;
    }
    data[snakeCase(key)] = object[key];
  }
  return data;
}
// this converts the key of the objects to snake case
export function toSnakeCase(object) {
  if (object instanceof Array) {
    return parseArray(object);
  }
  if (object instanceof Object) {
    return parseObject(object);
  }
  return object;
}
