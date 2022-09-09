import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';

export default class SelectComponent extends Component {
  isSelected = helper(function ([value, resp]: [string, string]) {
    return `${value}` === `${resp}`;
  });
}
