import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './App.scss';
// import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './services/store';
function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
