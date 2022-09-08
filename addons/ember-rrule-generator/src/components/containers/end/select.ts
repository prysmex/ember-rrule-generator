import Component from '@glimmer/component';

import type RRuleGenerator from '../../r-rule-generator/index';

type End = RRuleGenerator['state']['data']['end'];

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    end: End;
  };
}

export default class ContainersEndSelectComponent extends Component<Signature> {
  handleChange = (e: { target: { value: unknown } }) => {
    const editedEvent = {
      target: {
        value: e.target.value,
        name: 'end.mode',
      },
    };

    this.args.handleChange(editedEvent);
  };
}
