import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {
  Tree,
  Layout,
  Divider,
  Button,
  Popconfirm,
} from 'antd';
import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import {isAvailableListRender} from 'src/utils/utils'
import {PAGE_SIZE, PAGE_SIZE_OPTIONS} from 'src/common/constants'
import styles from './Menu.less';

const TreeNode = Tree.TreeNode;
const {Content, Sider} = Layout;

class Menu extends PureComponent {

  initTable = () => {
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'systemName',
      }, {
        title: '菜单编码',
        dataIndex: 'systemCode',
      }, {
        title: '功能编码',
        dataIndex: 'systemCode',
      }, {
        title: '是否可用',
        align: 'center',
        dataIndex: 'isAvailable',
        render: isAvailableListRender,
      }, {
        title: '是否末级',
        align: 'center',
        dataIndex: 'isAvailable',
        render: isAvailableListRender,
      }, {
        title: '排序',
        align: 'center',
        dataIndex: 'isAvailable',
        render: isAvailableListRender,
      }, {
        dataIndex: 'systemId',
        title: '操作',
        align: 'center',
        render: (text, record, index) => (<Fragment>
          <a>修改</a>
          <Divider type="vertical"/>
          <a>查看</a>
          <Divider type="vertical"/>
          <a>删除</a>
          <Divider type="vertical"/>
          <Popconfirm title="是否确认禁用?" onConfirm={this.changeMenuAvailable.bind(null, record)}>
            <a>{'Y' === record.isAvailable ? '禁用' : '启用'}</a>
          </Popconfirm>

        </Fragment>),
      },
    ];
    return {
      config: {
        dispatchType: 'menu/query',
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
      systems: [],
    };
  }

  componentDidMount() {
    this.query('root', '0');
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  query(nodeType, parentId) {
    const {dispatch} = this.props;
    dispatch({
      type: 'menu/getSystemMenuTree',
      payload: {
        nodeType,
        parentId,
      },
    });
  }

  render() {
    const systemTree = this.state.systems.map(item=>{
      return (<TreeNode title={item.systemName} key={item.systemId}></TreeNode>);
    });

    return (
      <PageHeaderLayout title="">
        <Layout style={{background: '#fff'}}>
          <Sider width={200} style={{background: '#fff', border: true}}>
            <Tree
              showLine
              defaultExpandedKeys={['0-0']}
              onSelect={this.onSelect}
            >
              {systemTree}
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0">
                  <TreeNode title="leaf" key="0-0-0-0"/>
                  <TreeNode title="leaf" key="0-0-0-1"/>
                  <TreeNode title="leaf" key="0-0-0-2"/>
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode title="leaf" key="0-0-1-0"/>
                </TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2">
                  <TreeNode title="leaf" key="0-0-2-0"/>
                  <TreeNode title="leaf" key="0-0-2-1"/>
                </TreeNode>
              </TreeNode>
            </Tree>
          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">新建</Button>
              <Button icon="plus" type="primary">修改</Button>
              <Button icon="plus" type="primary">查看</Button>
              <Button icon="plus" type="primary">删除</Button>
            </div>
          </Content>
        </Layout>
      </PageHeaderLayout>

    )
      ;
  }
}

function mapStateToProps(state) {
  const result = state.menu && state.menu.data ? state.menu.data[0] : {
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
    loading: state.loading.models.menu,
  };
}

export default connect(mapStateToProps)(Menu);
