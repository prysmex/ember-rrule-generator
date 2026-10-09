# Changelog

## 0.6.1 (2026-10-09)

#### :bug: Bug Fix
* Stop re-exporting utils/constants into the app tree: it has no default export, which broke Embroider/Vite builds.
