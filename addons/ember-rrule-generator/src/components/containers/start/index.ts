import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';

import type RRuleGenerator from '../../r-rule-generator/index';
import OnDate from './on-date';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type Signature = BaseContainerSignature & {
  Args: {
    start: RRuleGenerator['state']['data']['start'];
  };
};

export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
  OnDate = OnDate;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'start.label'),
      on: translateLabel(this.args.translations, 'start.on'),
    };
  }
}
