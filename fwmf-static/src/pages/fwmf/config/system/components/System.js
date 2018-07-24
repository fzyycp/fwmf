import FContentTemplate from 'src/components/FContentTemplate';
import React, {Fragment} from 'react';
import {connect} from 'dva';
import {
  Form,
  Button,
  Divider,
  Popconfirm,
  message,
} from 'antd';
import StandardFormRow from 'src/components/StandardFormRow';
import {isAvailableListRender} from 'src/utils/utils'
import FAvailableSelect from 'src/components/FAvailableSelect';
import SystemDetail from './SystemDetail'

const FormItem = Form.Item;

@Form.create()
class System extends FContentTemplate {

  configTable() {
    const columns = [
      {
        title: '系统名称',
        dataIndex: 'systemName',
      }, {
        title: '系统编码',
        dataIndex: 'systemCode',
      }, {
        title: '是否可用',
        align: 'center',
        dataIndex: 'isAvailable',
        render: isAvailableListRender,
      }, {
        dataIndex: 'systemId',
        title: '操作',
        align: 'center',
        render: (text, record, index) => (<Fragment>
          <SystemDetail title="修改" onOkClick={(fieldValues) => this.handleEdit(fieldValues, record.systemId)}
                        record={record}>
            <a>编辑</a>
          </SystemDetail>
          <Divider type="vertical"/>
          <Popconfirm title="是否确认禁用?" onConfirm={this.changeSystemAvailable.bind(null, record)}>
            <a>{'Y' === record.isAvailable ? '禁用' : '启用'}</a>
          </Popconfirm>

        </Fragment>),
      },
    ];
    return {
      config: {
        dispatchType: 'system/query',
        dispatchParams: {
          isAvailable: '',
        },
        rowKey: 'systemId',
      },
      columns: columns,
    }
  }

  renderRightSearch() {
    return (
      <Form layout="inline">
        <StandardFormRow title="系统状态" style={{paddingBottom: 1}}>
          <FormItem>
            <FAvailableSelect onChange={this.handleAvailableChange}/>
          </FormItem>
        </StandardFormRow>
      </Form>
    );
  }

  renderRightOperator() {
    return (<SystemDetail title="新增" onOkClick={this.handleAdd}>
      <Button icon="plus" type="primary">新建</Button>
    </SystemDetail>);
  }

  handleAdd = fields => {
    this.props.dispatch({
      type: 'system/add',
      payload: {
        ...fields,
      },
      callback: res => {
        message.success('保存成功');
        this.reloadTable();
      },
    });
  };

  handleEdit = (fields, systemId) => {
    this.props.dispatch({
      type: 'system/edit',
      payload: {
        ...fields,
        systemId,
      },
      callback: res => {
        message.success('保存成功');
        this.reloadTable();
      },
    });
  };

  changeSystemAvailable = record => {
    this.props.dispatch({
      type: 'system/changeSystemAvailable',
      payload: {
        isAvailable: record.isAvailable === 'Y' ? 'N' : 'Y',
        systemId: record.systemId,
      },
      callback: res => {
        message.success('保存成功');
        this.reloadTable();
      },
    });
  };

  handleAvailableChange = e => {
    const isAvailable = e.target.value || '';
    this.queryTable({
      isAvailable: isAvailable,
    });
  };

}

function mapStateToProps(state) {
  const result = state.system && state.system.data ? state.system.data[0] : {
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
    loading: state.loading.models.system,
  };
}

export default connect(mapStateToProps)(System);
