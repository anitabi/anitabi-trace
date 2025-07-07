export const throttle = (func: Function, delay: number): Function => {
  let timer: number | null = null;
  return function(this: any, ...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};
export const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const deepCopy = (object: object) => 'structuredClone' in window ? structuredClone(object) : JSON.parse(JSON.stringify(object)); 