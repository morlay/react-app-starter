import { cloneElement, PropTypes, Component } from 'react';

import * as IconMaps from './IconMaps';

import Icon_ from './Icon_.scss';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(IconMaps))
  };

  render() {
    const { name } = this.props;
    return cloneElement(IconMaps[name], {
      className: Icon_.root
    });
  }
}

export default Icon;
