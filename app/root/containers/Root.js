import Root_ from './Root_.scss';

import React, { Component } from 'react';
import config from 'config';

class Root extends Component {
  render() {
    return (
      <div className={Root_.root}>
        {config.API_BASE_URL}
        adasd
      </div>
    );
  }
}

export default Root;
