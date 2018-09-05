-- 常量定义
-- APP编码
SET @appCode = '${artifactId}-app';
-- APP名称
SET @appName = '${projectDesc}';
-- 项目代号
SET @managerKey = '${artifactId}';
-- 项目名称
SET @managerName = '${projectDesc}';

-- APP信息
INSERT INTO `sys_t_app_info` (`APP_ID`, `APP_CODE`, `APP_NAME`, `APP_OS`, `SYSTEM_ID`, `REJECT_GUEST_USER`, `REJECT_SHOPPING_USER`, `ALLOW_BACKGROUND_USER`, `IS_AVAILABLE`, `TRACK_ID`, `SERVER_DOMAIN`)
VALUES
  ('1', @appCode, @appName, NULL, '1', 'N', 'N', 'Y', 'Y', NULL, NULL);

-- 角色信息表
INSERT INTO `sys_t_role_info` (`ROLE_ID`, `ROLE_NAME`, `ROLE_CODE`, `IS_AVAILABLE`, `SYSTEM_ID`)
VALUES ('1', '超级管理员', 'SUPER', 'Y', '1')
  ,('2', '系统管理员', 'SYSTEM', 'Y', '1');

-- 系统信息表
INSERT INTO `sys_t_system_info` (`SYSTEM_ID`, `SYSTEM_CODE`, `SYSTEM_NAME`, `IS_AVAILABLE`) VALUES
  ('1', CONCAT(@managerKey,'-web'), @managerName, 'Y');

-- 后台用户信息(超级管理员为固化用户，只可以修改密码，用户系统错误配置恢复,默认密码123456)
INSERT INTO `sys_t_user_info` (`USER_ID`, `LOGIN_NAME`, `USER_NAME`, `PASSWORD`, `EFCT_YMD`, `EXPR_YMD`, `INS_TSTMP`, `ORIGIN_OS_ID`, `IS_ENABLE`, `IS_DELETE`, `CREATE_PERSON`, `UPDATE_PERSON`) VALUES
  ('1', 'super', '超级管理员', 'neyD8eWJSbO0e6vw47HfWg==', '2018-01-01', '2049-12-31', '2018-01-01 00:00:00', '1', 'Y', 'N', 'init', 'init')
  ,('2', 'system', '系统管理员', 'neyD8eWJSbO0e6vw47HfWg==', '2018-01-01', '2049-12-31', '2018-01-01 00:00:00', '1', 'Y', 'N', 'init', 'init');

-- 用户关联角色
INSERT INTO `sys_t_user_r_role` (`USER_ID`, `ROLE_ID`) VALUES
  ('1', '1')
  ,('2', '2');

-- 用户授权系统
INSERT INTO `sys_t_user_r_system` (`ID`, `USER_ID`, `SYSTEM_ID`, `IS_AVAILABLE`) VALUES
  ('1', '1', '1', 'Y')
  ,('2', '2', '1', 'Y');
