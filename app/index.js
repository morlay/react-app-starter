import React from 'react';
import { render } from 'react-dom';

import './index.styl';

import Root from './root/containers/Root';

console.log(document.getElementById('root'));

render(
  <Root />,
  document.getElementById('root')
);
