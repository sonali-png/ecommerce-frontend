export const createAttributeMap = (attributes = []) => {
  const map = {};
  attributes.forEach((attribute) => {
    map[String(attribute._id)] = attribute.name;
  });

  return map;
}