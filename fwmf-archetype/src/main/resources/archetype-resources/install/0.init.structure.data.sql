-- DB structure
CREATE DATABASE IF NOT EXISTS ${artifactId} CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

USE ${artifactId};

-- ----------------------------
-- Table structure for sys_t_app_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS  `sys_t_app_info` (
  `APP_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'APPID',
  `APP_CODE` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT 'APP编码',
  `APP_NAME` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT 'APP名称',
  `APP_OS` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'APP操作系统描述（安卓/IOS，中文/英文）',
  `SYSTEM_ID` bigint(20) DEFAULT NULL COMMENT '所属业务系统ID',
  `REJECT_GUEST_USER` char(1) COLLATE utf8mb4_bin DEFAULT 'N' COMMENT '拒绝游客用户登录【Y：是，N：否】',
  `REJECT_SHOPPING_USER` char(1) COLLATE utf8mb4_bin DEFAULT 'N' COMMENT '拒绝购物用户登录【Y：是，N：否】',
  `ALLOW_BACKGROUND_USER` char(1) COLLATE utf8mb4_bin DEFAULT 'Y' COMMENT '允许后台用户登录【Y：是，N：否】',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin DEFAULT 'Y' COMMENT '是否可用（Y：可用，N：不可用）',
  `TRACK_ID` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'AppStore的trackId',
  `SERVER_DOMAIN` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '服务器域名',
  PRIMARY KEY (`APP_ID`),
  UNIQUE KEY `UQ_APP_CODE` (`APP_CODE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='APP信息';

-- ----------------------------
-- Table structure for sys_t_code_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_code_info` (
  `CODE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '字典ID',
  `CODE_TYPE` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '字典类型',
  `CODE_NAME` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '字典名称',
  `CODE_CODE` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '字典编码',
  `CODE_ORDER` varchar(8) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`CODE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='数据字典表';

-- ----------------------------
-- Table structure for sys_t_function_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_function_info` (
  `FUNCTION_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '功能ID',
  `FUNCTION_NAME` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '功能名称',
  `FUNCTION_CODE` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '功能编码',
  `MENU_ID` bigint(20) NOT NULL COMMENT '所属菜单ID',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否可用【N:否 Y:是】',
  PRIMARY KEY (`FUNCTION_ID`),
  KEY `IDX_MENU` (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='功能按钮信息表';

-- ----------------------------
-- Table structure for sys_t_menu_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_menu_info` (
  `MENU_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `MENU_PID` bigint(20) NOT NULL DEFAULT '0' COMMENT '上级菜单ID',
  `MENU_NAME` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '菜单名称',
  `MENU_ACTION_KEY` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT '菜单所对应的ActionKey',
  `MENU_CODE` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '菜单编码',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '菜单是否可用【N:不可用  Y:可用】',
  `IS_LEAF` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否末级【N:不是  Y:是】',
  `SYSTEM_ID` bigint(20) NOT NULL COMMENT '系统ID',
  `SORT` int(11) NOT NULL DEFAULT '1' COMMENT '排序',
  PRIMARY KEY (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='菜单信息表';

-- ----------------------------
-- Table structure for sys_t_operation_record
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_operation_record` (
  `OPERATION_RECORD_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '操作记录ID',
  `NAMESPACE` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Action所在命名空间',
  `ACTION_NAME` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Action名字',
  `ACTION_CLASS` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Action对应的Class名',
  `METHOD_NAME` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '方法名字',
  `MENU` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单',
  `FUNCTION` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '功能',
  `OPT_LEVEL` int(8) DEFAULT NULL COMMENT ' 操作级别（1增,2删,4改,8查）',
  `OPT_CODE` varchar(8) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '操作识别码（add增,del删,mod改,view查）',
  `OPT_DESC` varchar(8) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '操作描述（新增,删除,修改,查看）',
  `IS_SUCCESS` char(1) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '是否成功【Y：成功  N：失败】',
  `RESULT` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '返回结果',
  `ERROR_MESSAGE` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '错误描述',
  `IS_DELETE` char(1) COLLATE utf8mb4_bin DEFAULT 'N' COMMENT '是否删除【N：未删除  Y：已删除】',
  `CREATE_PERSON` bigint(20) DEFAULT NULL COMMENT '创建者',
  `CREATE_PERSON_NAME` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者姓名',
  `CREATE_TIME` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`OPERATION_RECORD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='操作记录信息表';

-- ----------------------------
-- Table structure for sys_t_role_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_role_info` (
  `ROLE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `ROLE_NAME` varchar(100) COLLATE utf8mb4_bin NOT NULL COMMENT '角色名称',
  `ROLE_CODE` varchar(100) COLLATE utf8mb4_bin NOT NULL COMMENT '角色编码',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否可用（Y:可用  N:不可用）',
  `SYSTEM_ID` bigint(20) NOT NULL COMMENT '所属系统ID',
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='角色信息表';

-- ----------------------------
-- Table structure for sys_t_role_r_function
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_role_r_function` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `ROLE_ID` bigint(255) NOT NULL COMMENT '角色ID',
  `FUNCTION_ID` bigint(20) NOT NULL COMMENT '功能按钮ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='角色关联功能按钮表';

-- ----------------------------
-- Table structure for sys_t_role_r_menu
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_role_r_menu` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `ROLE_ID` bigint(20) NOT NULL COMMENT '角色ID',
  `MENU_ID` bigint(20) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='角色关联菜单表';

-- ----------------------------
-- Table structure for sys_t_sensitive_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_sensitive_info` (
  `SENSITIVE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '敏感词ID',
  `SENSITIVE_VALUE` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '敏感词',
  `REPLACE_VALUE` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '替换值',
  `CREATE_PERSON` bigint(20) DEFAULT NULL COMMENT '创建者',
  `CREATE_PERSON_NAME` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者姓名',
  `CREATE_TIME` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_PERSON` bigint(20) DEFAULT NULL COMMENT '更新者',
  `UPDATE_PERSON_NAME` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '更新者姓名',
  `UPDATE_TIME` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`SENSITIVE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='敏感词信息表';

-- ----------------------------
-- Table structure for sys_t_system_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_system_info` (
  `SYSTEM_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '系统ID',
  `SYSTEM_CODE` varchar(32) COLLATE utf8mb4_bin NOT NULL COMMENT '系统编码',
  `SYSTEM_NAME` varchar(32) COLLATE utf8mb4_bin NOT NULL COMMENT '系统名称',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否可用（Y：可用  N：不可用）',
  PRIMARY KEY (`SYSTEM_ID`),
  KEY `IDX_CODE` (`SYSTEM_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='系统信息表';

-- ----------------------------
-- Table structure for sys_t_user_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_user_info` (
  `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `LOGIN_NAME` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT '用户登录名',
  `USER_NAME` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户姓名',
  `PASSWORD` varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT ' 登录密码',
  `EFCT_YMD` date NOT NULL COMMENT '用户起用日',
  `EXPR_YMD` date NOT NULL DEFAULT '2049-12-31' COMMENT '用户失效日',
  `INS_TSTMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `ORIGIN_OS_ID` bigint(20) DEFAULT NULL COMMENT '所属系统ID',
  `USER_TYPE` varchar(1) COLLATE utf8mb4_bin DEFAULT '0' COMMENT '用户类别（0:框架用户，1:业务系统用户，3:购物用户，9:游客）',
  `IS_ENABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否启用：Y启用，N禁用',
  `IS_DELETE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'N' COMMENT '是否删除 N：未删除  Y：删除',
  `CREATE_PERSON` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT '创建人姓名',
  `UPDATE_PERSON` varchar(128) COLLATE utf8mb4_bin NOT NULL COMMENT '修改人姓名',
  `UPDATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `IDX_LOGIN_NAME` (`LOGIN_NAME`) USING BTREE,
  KEY `IDX_ORIGIN_OS_ID` (`ORIGIN_OS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='后台用户管理';

-- ----------------------------
-- Table structure for sys_t_user_r_role
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_user_r_role` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `USER_ID` bigint(20) NOT NULL COMMENT '用户ID',
  `ROLE_ID` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='用户关联角色表';

-- ----------------------------
-- Table structure for sys_t_user_r_system
-- ----------------------------
CREATE TABLE IF NOT EXISTS `sys_t_user_r_system` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `USER_ID` bigint(20) NOT NULL COMMENT '用户ID',
  `SYSTEM_ID` bigint(20) NOT NULL COMMENT '业务系统ID',
  `IS_AVAILABLE` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Y' COMMENT '是否可用',
  PRIMARY KEY (`ID`),
  KEY `IDX_USER_ID` (`USER_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户授权使用的业务系统表';
