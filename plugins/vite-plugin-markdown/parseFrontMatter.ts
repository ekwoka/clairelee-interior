export const parseFrontMatter = (data: string) => {
  const metadata = data.match(/---(.*\n)*---/);
  if (!metadata) return {};
  const details = (metadata[0].match(/(.*):(.*)/g) || []).reduce<
    Record<string, string | string[]>
  >((obj, detail) => {
    const [key, value] = detail.split(/\s*:\s*/) as [string, string];
    obj[key] = arrayKeys.includes(key) ? value.split(/\s*,\s*/) : value;
    return obj;
  }, {});
  return details;
};

const arrayKeys: string[] = ['images', 'core', 'tools', 'badges'];
