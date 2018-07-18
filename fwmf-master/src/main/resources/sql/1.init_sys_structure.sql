-- 业务系统信息数据
DROP TABLE IF EXISTS `sys_t_system_info`;
CREATE TABLE `sys_t_system_info` (
  `SYSTEM_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '系统ID',
  `SYSTEM_CODE` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '系统编码',
  `SYSTEM_NAME` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '系统名称',
  `IS_AVAILABLE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '是否可用（1：可用  0：不可用）',
  PRIMARY KEY (`SYSTEM_ID`),
  KEY `IDX_CODE` (`SYSTEM_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统信息表';

-- 后台用户信息(超级管理员为固化用户，只可以修改密码，用户系统错误配置恢复)
DROP TABLE IF EXISTS `sys_t_user_info`;
CREATE TABLE `sys_t_user_info` (
  `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `LOGIN_NAME` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '用户登录名',
  `USER_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '用户姓名',
  `PASSWORD` varchar(255) COLLATE utf8_bin NOT NULL COMMENT ' 登录密码',
  `EFCT_YMD` char(10) COLLATE utf8_bin NOT NULL COMMENT '用户起用日',
  `EXPR_YMD` char(10) COLLATE utf8_bin NOT NULL DEFAULT '2049-12-31' COMMENT '用户失效日',
  `INS_TSTMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `ORIGIN_OS_ID` bigint(20) DEFAULT NULL COMMENT '所属系统ID',
  `IS_ENABLE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '是否启用：1启用，0禁用',
  `IS_DELETE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '是否删除 0：未删除  1：删除',
  `CREATE_PERSON` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '创建人姓名',
  `UPDATE_PERSON` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '修改人姓名',
  `UPDATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`USER_ID`),
  KEY `IDX_ORIGIN_OS_ID` (`ORIGIN_OS_ID`),
  KEY `IDX_LOGIN_NAME` (`LOGIN_NAME`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='后台用户管理';

-- 数据字典表
DROP TABLE IF EXISTS `sys_t_code_info`;
CREATE TABLE `sys_t_code_info` (
  `CODE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '字典ID',
  `CODE_TYPE` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '字典类型',
  `CODE_NAME` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '字典名称',
  `CODE_CODE` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '字典编码',
  `CODE_ORDER` varchar(8) COLLATE utf8_bin DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`CODE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='数据字典表';

-- 角色信息
DROP TABLE IF EXISTS `sys_t_role_info`;
CREATE TABLE `sys_t_role_info` (
  `ROLE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `ROLE_NAME` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '角色名称',
  `ROLE_CODE` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '角色编码',
  `IS_AVAILABLE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '是否可用（1:可用  0:不可用）',
  `SYSTEM_ID` bigint(20) NOT NULL COMMENT '所属系统ID',
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色信息表';

-- 用户关联角色
DROP TABLE IF EXISTS `sys_t_user_r_role`;
CREATE TABLE `sys_t_user_r_role` (
  `USER_ID` bigint(20) NOT NULL COMMENT '用户ID',
  `ROLE_ID` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`USER_ID`,`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='后台用户关联角色表';

-- 菜单信息
DROP TABLE IF EXISTS `sys_t_menu_info`;
CREATE TABLE `sys_t_menu_info` (
  `MENU_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `MENU_PID` bigint(20) NOT NULL DEFAULT '0' COMMENT '上级菜单ID',
  `MENU_NAME` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '菜单名称',
  `MENU_ACTION_KEY` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '菜单所对应的ActionKey',
  `MENU_CODE` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '菜单编码',
  `IS_AVAILABLE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '菜单是否可用【0:不可用  1:可用】',
  `IS_LEAF` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '是否末级【0:不是  1:是】',
  `SYSTEM_ID` bigint(20) NOT NULL COMMENT '系统ID',
  `SORT` int(11) NOT NULL DEFAULT '1' COMMENT '排序',
  PRIMARY KEY (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='菜单信息表';

-- 菜单按钮信息
DROP TABLE IF EXISTS `sys_t_function_info`;
CREATE TABLE `sys_t_function_info` (
  `FUNCTION_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '功能ID',
  `FUNCTION_NAME` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '功能名称',
  `FUNCTION_CODE` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '功能编码',
  `MENU_ID` bigint(20) NOT NULL COMMENT '所属菜单ID',
  `IS_AVAILABLE` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '是否可用【0:否 1:是】',
  PRIMARY KEY (`FUNCTION_ID`),
  KEY `IDX_MENU` (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='功能按钮信息表';

-- 角色关联菜单信息（系统管理员）
DROP TABLE IF EXISTS `sys_t_role_r_menu`;
CREATE TABLE `sys_t_role_r_menu` (
  `ROLE_ID` bigint(20) NOT NULL COMMENT '角色ID',
  `MENU_ID` bigint(20) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`ROLE_ID`,`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='角色关联菜单表';

-- 角色关联功能按钮信息
DROP TABLE IF EXISTS `sys_t_role_r_function`;
CREATE TABLE `sys_t_role_r_function` (
  `ROLE_ID` bigint(255) NOT NULL COMMENT '角色ID',
  `FUNCTION_ID` bigint(20) NOT NULL COMMENT '功能按钮ID',
  PRIMARY KEY (`ROLE_ID`,`FUNCTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='角色关联功能按钮表';

-- 操作记录信息表
DROP TABLE IF EXISTS `sys_t_operation_record`;
CREATE TABLE `sys_t_operation_record` (
  `OPERATION_RECORD_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '操作记录ID',
  `NAMESPACE` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT 'Action所在命名空间',
  `ACTION_NAME` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT 'Action名字',
  `ACTION_CLASS` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT 'Action对应的Class名',
  `METHOD_NAME` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '方法名字',
  `MENU` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '菜单',
  `FUNCTION` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '功能',
  `OPT_LEVEL` int(8) DEFAULT NULL COMMENT ' 操作级别（1增,2删,4改,8查）',
  `OPT_CODE` varchar(8) COLLATE utf8_bin DEFAULT NULL COMMENT '操作识别码（add增,del删,mod改,view查）',
  `OPT_DESC` varchar(8) COLLATE utf8_bin DEFAULT NULL COMMENT '操作描述（新增,删除,修改,查看）',
  `IS_SUCCESS` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '是否成功【1：成功  0：失败】',
  `RESULT` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '返回结果',
  `ERROR_MESSAGE` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `IS_DELETE` char(1) COLLATE utf8_bin DEFAULT '0' COMMENT '是否删除【0：未删除  1：已删除】',
  `CREATE_PERSON` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人姓名',
  `CREATE_TIME` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`OPERATION_RECORD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='操作记录信息表';

-- 客户意见反馈表
DROP TABLE IF EXISTS `sys_t_feedback`;
CREATE TABLE `sys_t_feedback` (
  `ADVICE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'bigint',
  `ADVICE_CONTENT` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '客户意见内容',
  `USER_ID` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `LOGIN_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '用户登录名',
  `USER_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '姓名',
  `TEL_NO` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '联系电话',
  `ADVICE_TYPE` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '意见反馈类型(保留字段，暂不使用)',
  `DEVICE_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '设备名称',
  `DEVICE_ID` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '设备唯一标识',
  `SYS_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '系统名称',
  `VERSION_NUM` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '系统版本号',
  `DEVICE_MODEL` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '设备模式',
  `CURRENT_MODEL` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '本地设备模式',
  `MOBILE_MODEL` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '手机型号',
  `APP_NAME` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'App应用名称',
  `APP_VERSION` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'App应用版本',
  `APP_BUILD_VERSION` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'App应用Build版本',
  `LANGUAGE` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '语言',
  `COUNTRY` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '国家',
  `NETWORK` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '网络情况',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提出时间',
  `HANDLE_PERSON_NAME` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '处理人姓名',
  `HANDLE_TIME` timestamp NULL DEFAULT NULL COMMENT '处理时间',
  `HANDLE_RESULT` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '处理结果',
  `DISPOSE_STATE` char(1) COLLATE utf8_bin DEFAULT '0' COMMENT '处理状态,默认为‘0’【0：未处理，1：已处理，2：已删除，3：已忽略，4：屏蔽，5：恢复】',
  PRIMARY KEY (`ADVICE_ID`),
  KEY `ADVICE_ID` (`ADVICE_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='客户意见反馈表';
