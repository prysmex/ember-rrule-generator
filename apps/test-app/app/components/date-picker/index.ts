import Component from '@glimmer/component';

interface Signature {
  Args: {
    value: Date;
    name: string;
    handleChange: (e: { target: { value: Date; name: string } }) => void;
  };
}

export default class DatePickerComponent extends Component<Signature> {
  get value() {
    return this.args.value;
  }

  onChange = (e: Date) => {
    this.args.handleChange({
      target: {
        value: e,
        name: this.args.name,
      },
    });
  };
}
