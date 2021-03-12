
export const enumToObjArray = (e: any): any => {
  return Object.entries(e).map((kv: any) => { return { key: kv[0], value: kv[1] }; });
};
