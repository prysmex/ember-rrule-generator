export type Translation = string | Record<string, string>;
export type Translations = ((key: string, replacements?: Record<string, unknown>) => string | null) | Translation;
declare const translateLabel: (translations: Translations, key: string, replacements?: {}) => string | null;
export default translateLabel;
//# sourceMappingURL=translateLabel.d.ts.map