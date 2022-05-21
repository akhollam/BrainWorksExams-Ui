import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import axios from 'axios';
import DTest from './DTest';
import Customers from './customers';
import CustomerExams from './CustomerExams';
import CustomerExamsQuestions from './CustomerExamsQuestions';

axios.defaults.baseURL = 'http://localhost:8080/exam-api';
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF8',
  Authorization: 'Basic dXNlcjpQYXNzd29yZEAxMQ==',
};
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.url = '' + config.url;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={
          <App
            isAuthenticated={() => {
              return true;
            }}
          />
        }>
        <Route path='/login' element={<Login />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/:id' element={<CustomerExams />} />
        <Route path='/customers/:id/:action' element={<CustomerExams />} />
        <Route path='/customers/:id/:examCode/questions' element={<CustomerExamsQuestions />} />
        <Route path='*' element={<DTest />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
