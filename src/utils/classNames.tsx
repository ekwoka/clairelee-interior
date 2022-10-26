export const classNames = (...str: (string | false | undefined)[]) =>
  str.filter(Boolean).join(' ');
