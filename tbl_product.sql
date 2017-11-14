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
  `to_customer_time` bigint(20) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `make_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


/*
测试数据
*/
INSERT INTO `tbl_product` VALUES (1, 'p1.1', 'f1', 'm1', 'type111', 10, 20171201, '0', 1);
INSERT INTO `tbl_product` VALUES (2, 'p2.1', 'f1', 'm1', 'type222', 30, 20171201, '1', 2);
INSERT INTO `tbl_product` VALUES (3, 'p1.3', 'f1', 'm3', 'type13', 10, 20171201, '1', 1);
INSERT INTO `tbl_product` VALUES (4, 'p1.4', 'f1', 'm4', 'type13', 10, 20171201, '1', 1);
INSERT INTO `tbl_product` VALUES (5, 'p1.5', 'f1', 'm4', 'type13', 10, 20171201, '2', 1);
INSERT INTO `tbl_product` VALUES (6, 'p1.6', 'f1', 'm4', 'type13', 10, 20171203, '2', 1);