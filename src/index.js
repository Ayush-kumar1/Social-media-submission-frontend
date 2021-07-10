import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {MediaProvider} from "./MediaContext"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MediaProvider>
    <App />
    </MediaProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


