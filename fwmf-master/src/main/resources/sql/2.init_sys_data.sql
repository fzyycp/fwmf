-- 业务系统信息数据
DELETE FROM `sys_t_system_info`;
INSERT INTO `sys_t_system_info` (`SYSTEM_ID`, `SYSTEM_CODE`, `SYSTEM_NAME`, `IS_AVAILABLE`) VALUES
  ('1', 'fwmf-master', '后台管理系统', '1')
  ,('2', 'fwmf-mobile', '接入网关', '1')
  ,('3', 'fwmf-runtime', '后台服务系统', '1')
  ;

-- 后台用户信息(超级管理员为固化用户，只可以修改密码，用户系统错误配置恢复)
DELETE FROM `sys_t_user_info`;
INSERT INTO `sys_t_user_info` (`USER_ID`, `LOGIN_NAME`, `USER_NAME`, `PASSWORD`, `EFCT_YMD`, `EXPR_YMD`, `INS_TSTMP`, `ORIGIN_OS_ID`, `IS_ENABLE`, `IS_DELETE`,`CREATE_PERSON`,`UPDATE_PERSON`) VALUES
  ('1', 'super', '超级管理员', 'neyD8eWJSbO0e6vw47HfWg==', '2018-01-01', '2049-12-31', '2018-01-01 00:00:00', '1', '1', '0','init','init')
  ,('2', 'system', '系统管理员', 'neyD8eWJSbO0e6vw47HfWg==', '2018-01-01', '2049-12-31', '2018-01-01 00:00:00', '1', '1', '0','init','init')
  ;

-- 角色信息
DELETE FROM `sys_t_role_info`;
INSERT INTO `sys_t_role_info` (`ROLE_ID`, `ROLE_NAME`, `ROLE_CODE`, `IS_AVAILABLE`, `SYSTEM_ID`) VALUES
  ('1', '超级管理员', 'SUPER', '1', '1')
  ,('2', '系统管理员', 'SYSTEM', '1', '1')
  ;

-- 用户关联角色
DELETE FROM `sys_t_user_r_role`;
INSERT INTO `sys_t_user_r_role` (`USER_ID`, `ROLE_ID`) VALUES
  ('1', '1')
  ,('2', '2')
  ;

-- 菜单信息
DELETE FROM `sys_t_menu_info`;
INSERT INTO `sys_t_menu_info` (`MENU_ID`, `MENU_PID`, `MENU_NAME`, `MENU_ACTION_KEY`, `MENU_CODE`, `IS_AVAILABLE`, `IS_LEAF`, `SYSTEM_ID`, `SORT`) VALUES
     ('1000', '0', '系统管理', '/system', 'system', '1', '0', '1', '1000')
     ,('1001', '1000', '用户管理', '/system/user', 'user', '1', '1', '1', '1001')
     ,('1002', '1000', '角色管理', '/system/role', 'role', '1', '1', '1', '1002')
     ,('1003', '1000', '字典管理', '/system/code', 'code', '1', '1', '1', '1003')
     ,('1004', '1000', '操作日志', '/system/optrecord', 'optrecord', '1', '1', '1', '1004')
     ,('1005', '1000', '意见反馈', '/system/feedback', 'feedback', '1', '1', '1', '1005')
     ;

-- 菜单按钮信息
DELETE FROM `sys_t_function_info`;
-- INSERT INTO `sys_t_function_info` (`FUNCTION_ID`, `FUNCTION_NAME`, `FUNCTION_CODE`, `MENU_ID`, `IS_AVAILABLE`) VALUES
--       ('1', '新　增', 'add', '14', '1')
--      ,('2', '修　改', 'edit', '14', '1');

-- 角色关联菜单信息（系统管理员）
DELETE FROM `sys_t_role_r_menu`;
INSERT INTO `sys_t_role_r_menu` (`ROLE_ID`, `MENU_ID`) VALUES
  ('1', '1000')
  ,('1', '1001')
  ,('1', '1002')
  ,('1', '1004')

  ,('2', '1000')
  ,('2', '1001')
  ,('2', '1002')
  ,('2', '1003')
  ,('2', '1004')
  ,('2', '1005')
  ;

-- 角色关联功能按钮信息
DELETE FROM `sys_t_role_r_function`;
-- INSERT INTO `sys_t_role_r_function` (`ROLE_ID`, `FUNCTION_ID`) VALUES
--      ('1', '1')
--     ,('3', '20');


  