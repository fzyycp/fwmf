import { Component } from 'react';
import { Modal } from 'antd';

class DetailModal extends Component {

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
    if (e){
      e.stopPropagation();
    }
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

  renderForm() {
    return (<div>please init your form</div>);
  };

  render() {
    const { children,title } = this.props;

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          {this.renderForm()}
        </Modal>
      </span>
    );
  }
}

export default DetailModal;
