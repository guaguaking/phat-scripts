import PropTypes from 'prop-types';
import React from "react";
import Style from './app.module.css';

let App = () => {
  return(
    <div className="page">
      <h1 className={Style.title}>React</h1>
    </div>

  );
};

App.propTypes = {
  className: PropTypes.string
};
// console.log(process.env.PUBLIC_PATH);

export default App;