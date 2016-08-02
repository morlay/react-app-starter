import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';

import Icon_ from './Icon_.styl';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
  };

  state = {
    Icons: {},
  };

  componentDidMount() {
    System.import('./constants/Icons')
      .then((Icons) => {
        this.setState({
          Icons,
        });
      });
  }

  render() {
    const { Icons } = this.state;
    const { name, className } = this.props;

    const selectedIcons = Icons[name] || Icons.arrowUp;

    return (
      <span className={classNames(className, Icon_.root)}>
        {selectedIcons && cloneElement(selectedIcons, {
          preserveAspectRatio: 'xMidYMid meet',
        })}
      </span>
    );
  }
}

export default Icon;
