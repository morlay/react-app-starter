import React from 'react';
import { render } from 'react-dom';

import './index.styl';

import Root from './root/containers/Root';

render(
  <Root />,
  global.document.getElementById('root')
);
