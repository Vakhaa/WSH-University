import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Suspense fallback={(<div>Loading ~~~~</div>)}>
    <React.StrictMode>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  // </Suspense>
);

