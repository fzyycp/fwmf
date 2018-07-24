import React, {PureComponent} from 'react';
import {Cascader} from 'antd';

import {AREA_DATA} from './area.json';
import merge from 'lodash/merge';

class FArea extends PureComponent {

  filter(inputValue, path) {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }

  render() {
    const newProps = merge({}, {
      options: AREA_DATA,
      showSearch: {filter: this.filter},
    }, this.props);
    return (
      <Cascader
        {...newProps}
      />
    );
  }
}

export default FArea;
