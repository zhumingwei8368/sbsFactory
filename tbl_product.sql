/*
Navicat MySQL Data Transfer

Source Server         : mysql-local
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : sbsdb

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-11-14 20:39:12
*/
create database sbsdb;
use sbsdb;

CREATE TABLE `tbl_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `factory` varchar(256) DEFAULT NULL,
  `material` varchar(256) DEFAULT NULL,
  `type` varchar(256) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `to_customer_time` varchar(32) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `make_order` int(11) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;


/*
测试数据
*/
INSERT INTO `tbl_product` VALUES (12, '大啊啊啊23', 'asdsad', '按时', '工艺C', 12, '2017-11-21', '2', 2, '2017-11-18 11:13:43');
INSERT INTO `tbl_product` VALUES (13, '大啊啊啊', 'asdsad', '按时', '工艺C', 12, '2017-11-21', '1', 3, '2017-11-18 11:14:28');
INSERT INTO `tbl_product` VALUES (27, 'sadasd', '1', '3', '工艺C', 111, '2017-11-30', '2', 1, '2017-11-18 16:29:59');
INSERT INTO `tbl_product` VALUES (28, '产品1111', 'f222', 'sadasd', '工艺C', 12, '2017-11-25', '0', NULL, '2017-11-18 16:42:28');
INSERT INTO `tbl_product` VALUES (29, '产品222', 'f222', 'sadasd', '工艺A', 1, '2017-11-25', '3', NULL, '2017-11-18 16:50:28');
INSERT INTO `tbl_product` VALUES (30, '产品333', 'f223', 'sadasd', '工艺B', 121, '2017-11-25', '4', NULL, '2017-11-18 16:50:38');