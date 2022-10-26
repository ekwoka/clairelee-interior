import { createSignal } from 'solid-js';

export const createBeacon = <T extends (prev: T) => T>(
  val: T | ReturnType<T>
): Beacon<T> => {
  const [signal, setSignal] = createSignal(val);
  return ((val?: T) =>
    val !== undefined ? setSignal(val) : signal()) as Beacon<T>;
};

type Beacon<T extends (prev: T) => T> = {
  (): T;
  (val: T | ReturnType<T>): T;
};
