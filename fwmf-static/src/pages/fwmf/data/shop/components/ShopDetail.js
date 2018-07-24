import FDetailModal from 'src/components/FDetailModal';
import {Form, Row, Col, Input, Radio, InputNumber} from 'antd';
import FArea from 'src/components/FArea';
import {formItemLayout} from 'src/common/constants'
import {isAvailableFormItem} from 'src/utils/utils'
import lang from 'lodash/lang';

import styles from './ShopDetail.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
class ShopDetail extends FDetailModal {

  configModal() {
    return {
      width: 800,
    };
  }

  onAreaSelected(value, selectedOptions) {
  }

  renderForm() {
    const {form} = this.props;
    const record = this.props.record || {};
    const areaCode = record.areaCode;
    const areaCodeSelected = [];
    if (areaCode && areaCode.length === 6) {
      areaCodeSelected.push(areaCode.substring(0, 2) + '0000');
      areaCodeSelected.push(areaCode.substring(0, 4) + '00');
      areaCodeSelected.push(areaCode);
    }

    return (
      <Form>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="商店名称">
              {form.getFieldDecorator('shopName', {
                initialValue: record.shopName,
                rules: [{required: true, message: '商店名称不可以为空'}],
              })(<Input placeholder="请输入商店名称"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="店主账号">
              {form.getFieldDecorator('shopKeeperName', {
                initialValue: record.shopKeeperName,
                rules: [{required: true, message: '店主账号不可以为空'}],
              })(<Input placeholder="请输入店主账号" disabled={!lang.isUndefined(record.shopId)}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem  {...formItemLayout} label="商店简称">
              {form.getFieldDecorator('shortName', {
                initialValue: record.shortName,
                rules: [{required: true, message: '商店简称不可以为空'}],
              })(<Input placeholder="请输入商店简称"/>)}
            </FormItem>
            <FormItem  {...formItemLayout} label="店主姓名">
              {form.getFieldDecorator('shopKeeperUserName', {
                initialValue: record.shopKeeperUserName,
                rules: [{required: true, message: '商店店主姓名不可以为空'}],
              })(<Input placeholder="请输入商店店主姓名" disabled={!lang.isUndefined(record.shopId)}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem labelCol={{span: 3}} wrapperCol={{span: 21}} label="分配比例(%)">
              <Col span={24}>
                {form.getFieldDecorator('allocatRatio', {
                  initialValue: record.allocatRatio || 0,
                  rules: [{required: true, message: '分配比例不可以为空'}],
                })(<InputNumber precision={2} size={200} min={0} max={100}/>)}
                <span className="ant-form-text"> %</span>
                <span className={styles.shopDetailAllocate}>（分配到商店的比例，包含下级）</span>
              </Col>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {isAvailableFormItem(form, record.isAvailable)}
            <FormItem {...formItemLayout} label="所在地区">
              {form.getFieldDecorator('areaCodeSelected', {
                initialValue: areaCodeSelected,
                rules: [{required: true, message: '所在地区不可以为空'}],
              })(<FArea placeholder="请输入商店所在地区" onChange={this.onAreaSelected}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem  {...formItemLayout} label="支付方式">
              {form.getFieldDecorator('payStyle', {
                initialValue: record.payStyle || '0',
              })(<RadioGroup>
                <RadioButton value="0">平台支付</RadioButton>
                <RadioButton value="1">商店支付</RadioButton>
              </RadioGroup>)}
            </FormItem>
            <FormItem  {...formItemLayout} label="详细地址">
              {form.getFieldDecorator('address', {
                initialValue: record.address,
              })(<Input placeholder="请输入详细地址"/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ShopDetail;
