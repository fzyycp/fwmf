import React, {Fragment} from 'react';
import FContentTemplate from 'src/components/FContentTemplate';
import {connect} from 'dva';
import {
  Row, Col,
  Input,
  Form,
  Button,
  Divider,
  Popconfirm,
  message,
} from 'antd';
import FAvailableSelect from 'src/components/FAvailableSelect';
import ShopDetail from './ShopDetail';

import {isAvailableListRender} from 'src/utils/utils'
import merge from 'lodash/merge';
import styles from './Shop.less';

const FormItem = Form.Item;

@Form.create()
class Shop extends FContentTemplate {

  configTable(props) {
    const columns = [
      {
        title: '商店名称',
        dataIndex: 'shopName',
      }, {
        title: '商店简称',
        dataIndex: 'shortName',
      }, {
        title: '商店授权系统',
        dataIndex: 'shopRSystemNames',
      }, {
        title: '商店授权App',
        dataIndex: 'shopRAppNames',
      }, {
        title: '是否启用',
        align: 'center',
        dataIndex: 'shopState',
        render: isAvailableListRender,
      }, {
        dataIndex: 'shopId',
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
          var newRecord = merge({},record);
          const areaCode = record.areaCode;
          if(areaCode && areaCode.length === 6){
            newRecord['areaCodeSelect'] = [areaCode.substring(0,2),areaCode.substring(2,4),areaCode.substring(4,6)];
          }
          return (<Fragment>
            <ShopDetail title="修改" onOkClick={(fieldValues) => this.handleEdit(fieldValues, record.shopId)}
                        record={newRecord}>
              <a>编辑</a>
            </ShopDetail>
            <Divider type="vertical"/>
            <Popconfirm title="是否确认禁用?" onConfirm={this.changeSystemAvailable.bind(null, record)}>
              <a>{'Y' === record.shopState ? '禁用' : '启用'}</a>
            </Popconfirm>

          </Fragment>)
        },
      },
    ];
    return {
      config: {
        dispatchType: 'shop/query',
        dispatchParams: {
          shopName: '',
          shopState: 'Y',
        },
        rowKey: 'shopId',
      },
      columns: columns,
    }
  }

  renderRightSearch() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="商店名称">
              {getFieldDecorator('shopName',{
                initialValue: '',
              })(
                <Input placeholder="模糊查询商店名称"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商店状态">
              {getFieldDecorator('shopState',{
                initialValue: 'Y',
              })(
                <FAvailableSelect/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderRightOperator() {
    return (
      <ShopDetail title="新增" onOkClick={this.handleAdd}>
        <Button icon="plus" type="primary">新建</Button>
      </ShopDetail>
    );
  }

  handleSearch = (e) => {
    e.preventDefault();

    const {form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.queryTable(fieldsValue);
    });
  };

  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
    form.setFieldsValue({'shopState':'Y'});
  };

  handleAdd = fields => {
    const {areaCodeSelected} = fields;
    this.props.dispatch({
      type: 'shop/add',
      payload: {
        ...fields,
        areaCode: areaCodeSelected[2],
      },
      callback: res => {
        message.success('保存成功');
        this.reloadTable();
      },
    });
  };

  handleEdit = (fields, shopId) => {
    this.props.dispatch({
      type: 'shop/edit',
      payload: {
        ...fields,
        shopId,
      },
      callback: res => {
        message.success('保存成功');
        this.reloadTable();
      },
    });
  };

  changeSystemAvailable = record => {
    this.props.dispatch({
      type: 'shop/changeShopAvailable',
      payload: {
        shopState: record.shopState === 'Y' ? 'N' : 'Y',
        shopId: record.shopId,
      },
    });
  };
}

// 数据转换
function mapStateToProps(state) {
  const result = state.shop && state.shop.data ? state.shop.data[0] : {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  };
  const {list, total, pageNum} = result;
  return {
    list,
    total,
    pageNum,
    loading: state.loading.models.shop,
  };
}

// 导出对象
export default connect(mapStateToProps)(Shop);
