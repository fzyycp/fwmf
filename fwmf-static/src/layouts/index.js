import React from 'react';
import { IntlProvider } from 'react-intl';
import withRouter from 'umi/withRouter';
import dynamic from 'umi/dynamic';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

// Import i18n messages
import { translationMessages } from 'src/i18n';

import MasterLayout from 'layouts/MasterLayout';

function mapStateToProps({ global }) {
  return {
    locale: global.locale,
  };
}

const app = (messages) => withRouter(
  connect(mapStateToProps)(({ children, location, locale }) => {
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
      >
        <LocaleProvider locale={locale === 'zh' ? zhCN : {}}>
          <MasterLayout location={location}>{children}</MasterLayout>
        </LocaleProvider>
      </IntlProvider>
    );
  })
);

export default dynamic(async () => {
  if (!window.Intl) {
    await import('intl');
    await Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/zh.js'),
    ]);
  }

  return app(translationMessages);
});
