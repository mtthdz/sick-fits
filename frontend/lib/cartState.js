const { createContext } = require('react');

const LocalStateContext = createContext();
const localStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // this is our own custom provider
  // we will store data (state)
  // and functionality (updaters)

  const cartOpen = true;

  return (
    <localStateProvider value={{ cartOpen }}>{children}</localStateProvider>
  );
}

export { CartStateProvider };
