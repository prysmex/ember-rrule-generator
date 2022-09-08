import Component from '@glimmer/component';

import type RRuleGenerator from '../r-rule-generator/index';

export interface BaseContainerSignature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    name: string;
  };
}

export default class BaseContainerComponent<
  Args extends BaseContainerSignature = BaseContainerSignature
> extends Component<Args> {
  handleChange = (e: { target: { value: unknown } }) => {
    const editedEvent = {
      target: {
        value: e.target.value,
        name: this.args.name,
      },
    };

    this.args.handleChange(editedEvent);
  };
}
