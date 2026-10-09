import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

/* eslint-enable @typescript-eslint/no-explicit-any */class BaseContainerComponent extends Component {
  handleChange = e => {
    const editedEvent = {
      target: {
        value: e.target.value,
        name: this.args.name
      }
    };
    this.args.handleChange(editedEvent);
  };
  static {
    setComponentTemplate(precompileTemplate("", {
      strictMode: true
    }), this);
  }
}

export { BaseContainerComponent as default };
//# sourceMappingURL=base-container.js.map
