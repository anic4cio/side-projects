const { createMachine, assign } = require('xstate');

// Action to increment the context amount
const addWater = assign({
  amount: (context, event) => context.amount + 1
});

// Guard to check if the glass is full
function glassIsFull(context, event) {
  return context.amount >= 10;
}

const glassMachine = createMachine(
  {
    id: 'glass',
    // the initial context (extended state) of the statechart
    context: {
      amount: 0
    },
    initial: 'empty',
    states: {
      empty: {
        on: {
          FILL: {
            target: 'filling',
            actions: 'addWater'
          }
        }
      },
      filling: {
        // Transient transition
        always: {
          target: 'full',
          cond: 'glassIsFull'
        },
        on: {
          FILL: {
            target: 'filling',
            actions: 'addWater'
          }
        }
      },
      full: {}
    }
  },
  {
    actions: { addWater },
    guards: { glassIsFull }
  }
);