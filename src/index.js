import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App';

const render = ()=> {

  ReactDOM.render(
    <React.Suspense fallback={<div/>}>
      <App />
    </React.Suspense>,
    document.getElementById('app'));
};
render();

/* eslint-disable */
if (module.hot) {
    module.hot.accept('./layouts/App', render)
}
/* eslint-enable */