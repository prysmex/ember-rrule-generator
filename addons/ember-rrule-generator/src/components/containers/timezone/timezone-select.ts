import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';

type Signature = BaseContainerSignature & {
  Args: {
    timezone: RRuleGenerator['state']['data']['timezone'];
  };
};

export default class ContainersTimezoneSelectComponent extends BaseContainerComponent<Signature> {
  get options() {
    return this.args.timezone.options.supportedTimezones?.() || [];
  }
}
