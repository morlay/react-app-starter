import Root_ from './Root_.styl';

import React from 'react';
import config from 'config';
import Icon from 'modules/icons/Icon';

const Root = () => (
  <div className={Root_.root}>
    {config.API_BASE_URL}
    <Icon name='test' />
  </div>
);

export default Root;
