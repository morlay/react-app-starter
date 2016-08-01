import React from 'react';
import config from 'modules/config';
import Icon from 'modules/icons/Icon';

import Root_ from './Root_.styl';

const Root = () => (
  <div className={Root_.root}>
    {config.API_BASE_URL}
    <Icon name='test' />
  </div>
);

export default Root;
