// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

import type RRuleGenerator from './components/r-rule-generator/index.gts';

export default interface Registry {
  RRuleGenerator: typeof RRuleGenerator;
}
