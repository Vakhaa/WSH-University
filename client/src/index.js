import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store/store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Suspense fallback={(<div>Loading ~~~~</div>)}>
    <React.StrictMode>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  // </Suspense>
);

