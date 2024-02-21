let defoultCustomer = {
  counter: 0,
};

export let counter = (state = defoultCustomer, actions) => {
  switch (actions.type) {
    case "Plus":
      return state;
    default:
      return state;
  }
};
