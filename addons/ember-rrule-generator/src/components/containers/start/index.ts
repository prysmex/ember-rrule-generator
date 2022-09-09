import Component from '@glimmer/component';

import type RRuleGenerator from '../../r-rule-generator/index';
import OnDate from './on-date';

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    start: RRuleGenerator['state']['data']['start'];
  };
}

export default class ContainersStartComponent extends Component<Signature> {
  OnDate = OnDate;
}
