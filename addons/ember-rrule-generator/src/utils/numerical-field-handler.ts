type EventToAdapt = {
  target: { value: string; name: string };
};

type AdaptedEvent = {
  target: { value: number; name: string };
};

const numericalFieldHandler =
  (callback: (e: AdaptedEvent) => unknown) => (e: EventToAdapt) => {
    const inputNumber = parseInt(e.target.value, 10);
    // Check if is a number and is less than 1000
    if (isNaN(inputNumber) || inputNumber >= 1000) return;

    callback({
      target: { value: inputNumber, name: e.target.name },
    });
  };

export default numericalFieldHandler;
