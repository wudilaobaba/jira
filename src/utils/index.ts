import { useEffect, useState } from "react";
import set = Reflect.set;
import exp from "constants";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 对象拷贝
 * @param object
 */
export const cleanObject = (object: any) => {
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
 * 后面用范型
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return debouncedValue;
};

type clearFun = () => void;
type removeFun = (index: number) => void;
type addFun<T> = (v: T) => void;
export const useArray = <C>(value: C[]) => {
  const [arr, setArr] = useState<C[]>(value);
  const clear: clearFun = () => {
    setArr([]);
  };
  const removeIndex: removeFun = (index: number) => {
    const copy = [...arr];
    copy.splice(index, 1);
    setArr(copy);
  };
  const add: addFun<C> = (v: C) => {
    setArr([...arr, v]);
  };

  return {
    value: arr,
    setArr,
    clear,
    removeIndex,
    add,
  };
};
