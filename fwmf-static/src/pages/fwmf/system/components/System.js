import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {
  Card,
  Form,
  Button,
  message,
  Divider,
  Table,
  Popconfirm,
} from 'antd';
import StandardFormRow from 'src/components/StandardFormRow';
import TagSelect from 'src/components/TagSelect';
import FTable from 'src/containers/FTable';
import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import {isAvailableListRender} from 'src/utils/utils'
import {PAGE_SIZE, PAGE_SIZE_OPTIONS, DOMAIN} from 'src/common/constants'
import SystemDetail from './SystemDetail'
import styles from './System.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

class System extends PureComponent {

  initTable = () => {
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
                        record={record}><a href="#">编辑</a></SystemDetail>
          <Divider type="vertical"/>
          <Popconfirm title="是否确认禁用?" onConfirm={this.changeSystemAvailable.bind(null, record)}>
            <a href="#">{'Y' === record.isAvailable ? '禁用' : '启用'}</a>
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
        initSearch: true,
      },
      columns: columns,
      paging: {
        pageNo: 1,
        pageSize: PAGE_SIZE,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
      },
    }
  };

  constructor() {
    super();
    const ftable = this.initTable();
    this.state = {
      ftable,
      isAvailable: '',
    };
  }

  query(param, paging) {
    const {dispatch} = this.props;
    const {ftable} = this.state;
    dispatch({
      type: ftable.config.dispatchType,
      payload: {
        pageNo: paging.pageNo,
        pageSize: paging.pageSize,
        isAvailable: param.isAvailable,
      },
    });
  }

  componentDidMount() {
    const {ftable} = this.state;
    this.query(ftable.config.dispatchParams, ftable.paging);
  }

  handleAdd = fields => {
    this.props.dispatch({
      type: 'system/add',
      payload: {
        ...fields,
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
    });
  };

  changeSystemAvailable = record => {
    this.props.dispatch({
      type: 'system/changeSystemAvailable',
      payload: {
        isAvailable: record.isAvailable === 'Y' ? 'N' : 'Y',
        systemId: record.systemId,
      },
    });
  };

  renderForm() {
    return (
      <Form layout="inline">
        <StandardFormRow title="系统状态" style={{paddingBottom: 1}}>
          <FormItem>
            <TagSelect defaultValue={['Y', 'N']} onChange={this.handleAvailableChange}>
              <TagSelect.Option value="Y">启用</TagSelect.Option>
              <TagSelect.Option value="N">禁用</TagSelect.Option>
            </TagSelect>
          </FormItem>
        </StandardFormRow>
      </Form>
    );
  };

  handleAvailableChange = checkedValue => {
    const isAvailable = (checkedValue.length === 0 || checkedValue.length === 2) ? '' : checkedValue[0];
    this.query({
      isAvailable: isAvailable,
    },this.state.ftable.paging);
  };
  handleTableChange = (pagination, filtersArg, sorter) => {
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.query({
      isAvailable: this.state.isAvailable,
    },{
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  render() {
    const {pageNum, list, total, loading} = this.props;


    const paginationProps = {
      current: pageNum,
      showSizeChanger: true,
      showQuickJumper: true,
      total: total,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showTotal: (total) => `共 ${total} 条记录`,
    };

    const {ftable} = this.state;

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <SystemDetail title="新增" onOkClick={this.handleAdd}>
                <Button icon="plus" type="primary">新建</Button>
              </SystemDetail>
            </div>
            <Table rowKey="systemId" dataSource={list} columns={ftable.columns}
                   loading={loading} onChange={this.handleTableChange}
                   pagination={paginationProps}/>
          </div>
        </Card>
      </PageHeaderLayout>
    )
      ;
  }
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
