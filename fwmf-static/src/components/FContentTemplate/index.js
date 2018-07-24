import React, {PureComponent} from 'react';
import {
  Card,
  Table,
  Layout,
} from 'antd';
import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import {PAGE_SIZE, PAGE_SIZE_OPTIONS} from 'src/common/constants'
import merge from 'lodash/merge';
import styles from './FContentTemplate.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const DEFAULT_CONFIG_TABLE = {
  config: {
    dispatchType: '',
    dispatchParams: {},
    initSearch: true,
    rowKey: '',
  },
  columns: [],
  paging: {
    pageNo: 1,
    pageSize: PAGE_SIZE,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
  },
};

class FContentTemplate extends PureComponent {

  // 配置对象
  configTable(props) {
    return {};
  }

  initState(props) {
    return {};
  }

  constructor(props) {
    super(props);

    const ftable = merge({}, DEFAULT_CONFIG_TABLE, this.configTable(props));
    const initState = this.initState(props);
    this.state = {
      ftable,
      ...initState,
    };
    this.tableParam = {
      pageNo: ftable.paging.pageNo,
      pageSize: ftable.paging.pageSize,
    };
    this.queryParam = {
      ...ftable.config.dispatchParams,
    };
  }

  // 重新加载表格
  reloadTable() {
    this.queryTable(this.queryParam);
  }

  queryTable(param) {
    this.queryParam = param || {};
    const {dispatch} = this.props;
    const {ftable} = this.state;
    dispatch({
      type: ftable.config.dispatchType,
      payload: merge({}, this.tableParam, this.queryParam),
    });
  }

  componentDidMount() {
    const {ftable} = this.state;
    ftable && ftable.config && ftable.config.initSearch && this.reloadTable();
  }

  renderLeft() {
    return '';
  }

  renderRight() {
    const {hasRightSearch = true, hasRightOperator = true, hasRightTable = true} = this.props;
    return (<Card bordered={false}>
      <div className={styles.tableList}>
        {hasRightSearch && (<div className={styles.tableListForm}>{this.renderRightSearch()}</div>)}
        {hasRightOperator && (<div className={styles.tableListOperator}>
          {this.renderRightOperator()}
        </div>)}
        {hasRightTable && this.renderRightTable()}
      </div>
    </Card>);
  }

  // 右部查询区域
  renderRightSearch() {

  }

  // 右部操作按钮区域
  renderRightOperator() {

  }

  // 右下表格
  renderRightTable() {
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

    return (<Table rowKey={ftable.config.rowKey} dataSource={list} columns={ftable.columns}
                   loading={loading} onChange={this.handleTableChange}
                   pagination={paginationProps}/>);
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    this.tableParam = merge({}, {
      ...filters,
    });
    if (sorter.field) {
      this.tableParam.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.reloadTable();
  };

  render() {
    const {hasLeft = false} = this.props;
    return (<PageHeaderLayout title="">
      <Layout style={{background: '#fff'}}>
        {hasLeft && this.renderLeft()}
        {this.renderRight()}
      </Layout>
    </PageHeaderLayout>);
  }
}

export default FContentTemplate;
