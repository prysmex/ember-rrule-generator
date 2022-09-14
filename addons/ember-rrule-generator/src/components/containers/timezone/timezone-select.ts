import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type Signature = BaseContainerSignature & {
  Args: {
    timezone: RRuleGenerator['state']['data']['timezone'];
  };
};

export default class ContainersTimezoneSelectComponent extends BaseContainerComponent<Signature> {
  get options() {
    const opts = this.args.timezone.options.supportedTimezones?.() || [];
    const results = opts.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
    results.unshift({
      value: '',
      label: translateLabel(this.args.translations, 'timezone.local') as string,
    });
    return results;
  }
}
