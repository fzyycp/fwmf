-- 常量定义


-- 功能按钮信息表
-- INSERT INTO `sys_t_function_info` (`FUNCTION_ID`, `FUNCTION_NAME`, `FUNCTION_CODE`, `MENU_ID`, `IS_AVAILABLE`)
-- VALUES
--   ('2017', '查询', 'search', '831', 'Y');

-- 菜单信息表
INSERT INTO `sys_t_menu_info` (`MENU_ID`, `MENU_PID`, `MENU_NAME`, `MENU_ACTION_KEY`, `MENU_CODE`, `IS_AVAILABLE`, `IS_LEAF`, `SYSTEM_ID`, `SORT`) VALUES
  ('10', '0', '书籍管理', '/book', 'book', 'Y', 'N', '1', '10')
  ,('11', '10', '书籍分类', '/book/category', 'category', 'Y', 'Y', '1', '11')
  ,('12', '10', '书籍信息', '/book/info', 'bookInfo', 'Y', 'Y', '1', '12')
  ,('13', '10', '书籍章节', '/book/chapter', 'chapter', 'Y', 'Y', '1', '13')
  ,('14', '10', '书籍内容', '/book/content', 'content', 'Y', 'Y', '1', '14')
  ,('15', '10', '书籍评论', '/book/comment', 'comment','Y', 'Y', '1', '15')

  ,('20', '0', '客户管理', '/customer', 'customer', 'Y', 'N', '1', '20')
  ,('21', '20', '客户信息', '/customer/info', 'customerInfo','Y', 'Y', '1', '21')
  ,('22', '20', '意见反馈', '/customer/advice', 'advice','Y', 'Y', '1', '22')

  ,('30', '0', '广告管理', '/ad', 'ad', 'Y', 'N', '1', '30')
  ,('31', '30', '广告信息', '/ad/info', 'adInfo', 'Y', 'Y', '1', '31')

  ,('40', '0', '系统管理', '/system', 'system', 'Y', 'N', '1', '40')
  ,('41', '40', '用户管理', '/system/user', 'user', 'Y', 'Y', '1', '41')
  ,('42', '40', '角色管理', '/system/role', 'role', 'Y', 'Y', '1', '42')
  ,('43', '40', '权限管理', '/system/authority', 'authority', 'Y', 'Y', '1', '43')
  ,('44', '40', '字典管理', '/system/code', 'code', 'Y', 'Y', '1', '44')
  ,('45', '40', '敏感词管理', '/system/sensitive', 'sensitive', 'Y', 'Y', '1', '45')
  ,('46', '40', '常见问题管理', '/system/qa', 'qa', 'Y', 'Y', '1', '46')
  ,('47', '40', '日志管理', '/system/record', 'record', 'Y', 'Y', '1', '47')
  ;

-- 角色关联功能按钮表
# INSERT INTO `sys_t_role_r_function` (`ROLE_ID`, `FUNCTION_ID`) VALUES
#   ('2', '1437')
;

-- 角色关联菜单表
INSERT INTO `sys_t_role_r_menu` (`ROLE_ID`, `MENU_ID`) VALUES
  ('1', '40')
  ,('1', '41')
  ,('1', '42')
  ,('1', '43')
  ,('1', '44')
  ,('1', '47')

  ,('2', '10')
  ,('2', '11')
  ,('2', '12')
  ,('2', '13')
  ,('2', '14')
  ,('2', '15')

  ,('2', '20')
  ,('2', '21')
  ,('2', '22')

  ,('2', '30')
  ,('2', '31')

  ,('2', '40')
  ,('2', '41')
  ,('2', '42')
  ,('2', '43')
  ,('2', '44')
  ,('2', '45')
  ,('2', '46')
  ,('2', '47')
;