import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {AuthProvider} from "./Context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path='/*' element={<App />}/>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);
