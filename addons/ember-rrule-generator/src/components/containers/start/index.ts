import Component from '@glimmer/component';

import type RRuleGenerator from '../../r-rule-generator/index';

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    start: RRuleGenerator['state']['data']['start'];
  };
}

export default class ContainersStartComponent extends Component<Signature> {
  handleChange = (e: { target: { value: unknown } }) => {
    const editedEvent = {
      target: {
        value: e.target.value,
        name: 'start.onDate.date',
      },
    };

    this.args.handleChange(editedEvent);
  };
}
