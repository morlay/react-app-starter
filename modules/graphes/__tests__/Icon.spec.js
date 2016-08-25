import React from 'react';
import { expect, mount } from '@morlay/tests-react';

import Icon from '../Icon';
import Icon_ from '../Icon_.styl';

describe(__filename, () => {
  describe('#Icon', () => {
    it('should be render', () => {
      const wrapper = mount(<Icon name='add' />);
      expect(wrapper).has.className(Icon_.root);
    });
  });
});
