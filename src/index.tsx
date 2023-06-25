import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import queryString from 'query-string';
import App from './app/App';
import StoreProvider from './shared/context/StoreProvider';
import { NoteProvider } from './shared/customAlert/ui';
import UserProvider from './shared/userContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <BrowserRouter>
    <Provider store={store}>

    <UserProvider>
      <StoreProvider >
        <QueryClientProvider client={queryClient}>
            <QueryParamProvider
              adapter={ReactRouter6Adapter}
              options={{
                searchStringToObject: queryString.parse,
                objectToSearchString: queryString.stringify,
              }}
              >
              <NoteProvider>

                <App /> 
              </NoteProvider>
            </QueryParamProvider>
        </QueryClientProvider>
      </StoreProvider>
    </UserProvider>  
              </Provider>
          </BrowserRouter>
  </React.StrictMode>
);