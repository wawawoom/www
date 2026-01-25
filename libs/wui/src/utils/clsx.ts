/**
 * Combine plusieurs classes CSS en une seule chaîne
 * Filtre les valeurs falsy (null, undefined, '', false, 0)
 *
 * @param classes - Classes CSS à combiner (peuvent être des strings, null, undefined, etc.)
 * @returns Chaîne de classes CSS séparées par des espaces
 *
 * @example
 * clsx('foo', 'bar', null, undefined, 'baz') // 'foo bar baz'
 * clsx('wui-text', 'wui-text--m', className) // 'wui-text wui-text--m [className]'
 */

export const clsx = (
  ...classes: (string | null | undefined | false | 0)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
