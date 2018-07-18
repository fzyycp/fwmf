import {PureComponent} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import {PAGE_SIZE_OPTIONS} from 'src/common/constants'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/**
 * 配置参数
 * {
 *    config: {
 *      dispatchType: 'system/query',
 *      dispatchParams: {
 *        isAvailable: '',
 *      },
 *      initSearch:true,
 *    },
 *    columns: columns,
 *    paging: {
 *      pageSize: PAGE_SIZE,
 *      pageSizeOptions: PAGE_SIZE_OPTIONS,
 *    }
 *  }
 */
class FTable extends PureComponent {

  constructor(props) {
    super(props);
    const {paging,config} = this.props;
    this.state = {
      list: [],
      model:config.dispatchType.substring(0,config.dispatchType.indexOf('/')),
      paginationProps: {
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
        pageSizeOptions: (paging && paging.pageSizeOptions) || PAGE_SIZE_OPTIONS,
        showTotal: (total) => `共 ${total} 条记录`,
      },
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    const {dispatch, config} = this.props;
    dispatch({
      type: config.dispatchType,
      payload: {
        ...config.dispatchParams,
      },
    });
  }

  render() {
    const {list} = this.state;
    const {columns} = this.props;
    return (<Table dataSource={list} columns={columns}/>);
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
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

    dispatch({
      type: 'system/query',
      payload: params,
    });
  };

}

function mapStateToProps(state) {
  const {model} = state;
  const result = state[model] && state[model].data ?state[model].data[0] : {
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
    loading: state.loading.models[model],
  };
}

export default connect(mapStateToProps)(FTable);
