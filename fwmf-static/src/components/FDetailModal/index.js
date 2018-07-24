import { Component } from 'react';
import { Modal } from 'antd';
import merge from 'lodash/merge';

class FDetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showModalHandler = this.showModalHandler.bind(this);
    this.hideModalHandler = this.hideModalHandler.bind(this);
    this.okHandler = this.okHandler.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  showModalHandler = (e) => {
    e && e.stopPropagation();

    this.setState({
      visible: true,
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOkClick } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOkClick(values);
        this.hideModalHandler();
      }
    });
  };

  configModal(){
    return {};
  }

  renderForm() {
    return (<div>please init your form</div>);
  };

  render() {
    const { children,title } = this.props;
    const modalProps = merge({},this.configModal(),{
      title,
      keyboard: false,
      maskClosable: false,
      visible:this.state.visible,
      onOk:this.okHandler,
      onCancel:this.hideModalHandler,
    });

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal {...modalProps} >
          {this.renderForm()}
        </Modal>
      </span>
    );
  }
}

export default FDetailModal;
