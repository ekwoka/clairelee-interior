export const classNames = (...str: (string | boolean)[]) =>
  str.filter(Boolean).join(' ');
