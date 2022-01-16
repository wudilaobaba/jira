import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

/**
 * 对象拷贝
 * @param object
 */
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

/**
 * 封装组件初始化钩子
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 防抖钩子
 */
export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return debouncedValue;
};
