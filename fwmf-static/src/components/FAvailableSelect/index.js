import React, {PureComponent} from 'react';
import {Radio} from 'antd';
import lang from 'lodash/lang';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FAvailableSelect extends PureComponent {

  handleAvailableChange = e => {
    lang.isFunction(this.props.onChange) && this.props.onChange(e);
  };

  render() {
    return (
      <RadioGroup defaultValue={this.props.value  || ''} onChange={this.handleAvailableChange}>
        {this.props.noAll !== true
        && <RadioButton value="">全部</RadioButton>}
        <RadioButton value="Y">启用</RadioButton>
        <RadioButton value="N">禁用</RadioButton>
      </RadioGroup>
    );
  }
}

export default FAvailableSelect;
