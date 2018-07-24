import React from 'react';
import {connect} from 'dva';
import Redirect from 'umi/redirect';
import {SYSTEM_TITLE} from '../common/constants';
import styles from './index.css';

function IndexPage({login}) {
  if (login) {
    return <Redirect to="/login"/>;
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>{SYSTEM_TITLE}</h1>
      <div className={styles.welcome}/>
      <ul className={styles.list}>
        <li>该控制台提供整个系统所有基础数据的维护，</li>
        <li><strong>错误的数据可能导致系统不可用，请谨慎维护</strong></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    login: state.global.login,
  };
}

export default connect(mapStateToProps)(IndexPage);
