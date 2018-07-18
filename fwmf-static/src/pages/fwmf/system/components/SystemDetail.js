import DetailModal from 'src/components/DetailModal';
import {
  Form,
  Input,
} from 'antd';
import {formItemLayout} from 'src/common/constants'
import {isAvailableFormItem} from 'src/utils/utils'

const FormItem = Form.Item;

class SystemDetail extends DetailModal{
  renderForm(){
    const { form } = this.props;
    const record = this.props.record || {};

    return (
      <Form>
        <FormItem {...formItemLayout} label="系统名称">
          {form.getFieldDecorator('systemName', {
            initialValue: record.systemName,
            rules: [{required: true, message: '系统名称不可以为空'}],
          })(<Input placeholder="请输入系统名称"/>)}
        </FormItem>
        <FormItem  {...formItemLayout} label="系统编码">
          {form.getFieldDecorator('systemCode', {
            initialValue: record.systemCode,
            rules: [{required: true, message: '系统编码不可以为空'}],
          })(<Input placeholder="请输入系统编码"/>)}
        </FormItem>
        {isAvailableFormItem(form,record.isAvailable)}
      </Form>
    );
  }
}
export default Form.create()(SystemDetail);
