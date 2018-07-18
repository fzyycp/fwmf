import { isUrl } from 'utils/utils';

const menuData = [{
  name: '基础配置',
  icon: 'setting',
  path: 'fwmf',
  children: [
    {
      name: '系统信息',
      path: 'system',
      // hideInBreadcrumb: true,
      // hideInMenu: true,
    },
    {
      name: '菜单管理',
      path: 'menu',
      // hideInBreadcrumb: true,
      // hideInMenu: true,
    },
  ],
},
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

function formatterBreadcrumb(data) {
  return data.reduce((result, current) => {
    let childrenResult = {};
    if (current.children) {
      childrenResult = formatterBreadcrumb(current.children);
    }
    return {
      ...result,
      [current.path]: {
        name: current.name,
      },
      ...childrenResult,
    };
  }, {});
}

export const getBreadcrumbNameMap = () => formatterBreadcrumb(getMenuData(menuData));
