import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';

import type RRuleGenerator from '../../r-rule-generator/index';
import TimezoneSelect from './timezone-select';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type Signature = BaseContainerSignature & {
  Args: {
    timezone: RRuleGenerator['state']['data']['timezone'];
  };
};

export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
  TimezoneSelect = TimezoneSelect;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'timezone.label'),
    };
  }
}
