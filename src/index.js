import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistedStore} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './style.scss'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
<PersistGate persistor={persistedStore}>
    <App />
</PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
