import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon, Spin, Dropdown, Divider, Tooltip, message} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import Link from 'umi/link';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import {enquireScreen, unenquireScreen} from 'enquire-js';
import SiderMenu from 'components/SiderMenu';

import Authorized from 'utils/Authorized';
import {getMenuData} from 'common/menu';
import logo from 'assets/logo.svg';
import {SYSTEM_TITLE, MAIN_SYSTEM} from '../common/constants';
import styles from './MasterLayout.less';

const {Content, Header} = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

@connect(({user, global, loading}) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))
export default class MasterLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    isMobile,
  };

  getChildContext() {
    const {location, routerData} = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle() {
    return SYSTEM_TITLE;
  }

  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  handleMenuClick = ({key}) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };

  render() {
    const {
      collapsed,
      location,
      children,
    } = this.props;
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          title={this.getPageTitle()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          {this.renderHeader()}
          <Content style={{margin: '24px 24px 0', height: '100%'}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }

  renderHeader() {
    const {
      currentUser,
      collapsed,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Header style={{padding: 0}}>
        <div className={styles.header}>
          {isMobile && (
            [
              (
                <Link to="/" className={styles.logo} key="logo">
                  <img src={logo} alt="logo" width="32"/>
                </Link>
              ),
              <Divider type="vertical" key="line"/>,
            ]
          )}
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <div className={styles.right}>
            <Tooltip title="返回应用系统">
              <a
                target="_blank"
                href={MAIN_SYSTEM}
                className={styles.action}
              >
                <Icon type="rollback"/>
              </a>
            </Tooltip>
            {currentUser.userName ? (
              <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <span className={styles.name}>{currentUser.userName}</span>
              </span>
              </Dropdown>
            ) : <Spin size="small" style={{marginLeft: 8}}/>}
          </div>
        </div>
      </Header>
    );
  }
}
