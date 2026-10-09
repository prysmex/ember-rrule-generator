const numericalFieldHandler = callback => e => {
  const inputNumber = parseInt(e.target.value, 10);
  // Check if is a number and is less than 1000
  if (isNaN(inputNumber) || inputNumber >= 1000) return;
  callback({
    target: {
      value: inputNumber,
      name: e.target.name
    }
  });
};

export { numericalFieldHandler as default };
//# sourceMappingURL=numerical-field-handler.js.map
