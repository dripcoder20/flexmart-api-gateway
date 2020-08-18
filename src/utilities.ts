import snakeCase from "lodash/snakeCase";

// this converts the key of the objects to snake case
export function toSnakeCase(object) {
  let data = {};
  for (let key of Object.keys(object)) {
    data[snakeCase(key)] = object[key];
  }

  return data;
}
