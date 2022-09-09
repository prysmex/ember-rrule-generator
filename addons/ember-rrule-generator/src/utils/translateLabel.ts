import { each, isFunction, isPlainObject, get } from 'lodash-es';

const replacePlaceholder = (text: string, replacements = {}) => {
  each(replacements, (value, key) => {
    text = text.replace(`%{${key}}`, value);
  });

  return text;
};

export type Translation = string | Record<string, string>;

export type Translations =
  | ((key: string, replacements?: Record<string, unknown>) => string | null)
  | Translation;

const translateLabel = (
  translations: Translations,
  key: string,
  replacements = {}
): string | null => {
  if (isFunction(translations)) {
    return translations(key, replacements);
  } else if (isPlainObject(translations)) {
    return replacePlaceholder(
      get(translations, key, `[translation missing '${key}']`) as string,
      replacements
    );
  }

  return null;
};

export default translateLabel;
