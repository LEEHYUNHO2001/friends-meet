import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { queryClient } from '@/utils/query';

import { AppStore, RootState, setupStore } from './store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const render = (
  ui: React.ReactElement,
  {
    preloadedState = {
      // initalize
    },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// re-export everything from RTL
export * from '@testing-library/react';
// Override the `render` export name with our custom function
export { render };
