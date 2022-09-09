import Component from '@glimmer/component';

interface Signature {
  Args: {
    handleChange: (a: unknown) => void;
  };
}

export default class NumberInputComponent extends Component<Signature> {
  handleChange = (e: { target: { value: string; name: string } }) => {
    const inputNumber = +e.target.value;
    // Check if is a number and is less than 1000
    if (isNaN(inputNumber) || inputNumber >= 1000) return;

    const editedEvent = {
      target: { value: inputNumber, name: e.target.name },
    };

    this.args.handleChange(editedEvent);
  };
}
