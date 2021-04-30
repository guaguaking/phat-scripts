import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'
import './index.scss'

const App = React.lazy(()=>import('./App'))

const render = ()=> {
    ReactDOM.render(
        <React.Suspense fallback={<div/>}>
            <App />
        </React.Suspense>,
        document.getElementById('app'))
}
render()

/* eslint-disable */
if (module.hot) {
    module.hot.accept('./App', render)
}
/* eslint-enable */