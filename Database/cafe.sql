-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-02-27 16:11:37
-- 服务器版本： 5.5.62-log
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wd1900113`
--

-- --------------------------------------------------------

--
-- 表的结构 `ca_cate`
--

CREATE TABLE `ca_cate` (
  `cid` int(11) NOT NULL COMMENT '主键',
  `imgurl` text COMMENT '图片',
  `cname` varchar(50) NOT NULL COMMENT '名称',
  `cdesc` text NOT NULL COMMENT '描述'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='菜品分类';

--
-- 转存表中的数据 `ca_cate`
--

INSERT INTO `ca_cate` (`cid`, `imgurl`, `cname`, `cdesc`) VALUES
(1, '../Assets/uploads/cate/201912171132038901.jpg', '早餐', '早上要补阳气，早餐要以谷类食物为主，可以加牛奶、粥等'),
(2, '../Assets/uploads/cate/201912171132189988.jpg', '午餐', '要吃的营养，要吃的好，要吃得饱，为下午继续工作提供必要的能量'),
(3, '../Assets/uploads/cate/201912171132287601.jpg', '晚餐', '晚餐一定要注意定量，以少为好，切不可狂饮暴食。'),
(4, '../Assets/uploads/cate/201912171132489658.jpg', '甜品', '甜品，也叫甜点，是一个很广的概念，大致分为甜味点心和广式的糖水。甜品，一般不会被当作正餐，通常作为下午茶的小食。'),
(5, '../Assets/uploads/cate/201912171132598214.jpg', '饮料', '饮料 是供直接饮用或按一定比例用水冲调或冲泡饮用的，饮料也可分为饮料浓浆或固体形态，它的作用是解渴、补充能量等功能。'),
(8, '../Assets/uploads/cate/201912231145236214.jpg', '肉类', '富含大量的蛋白质和脂肪，以及卡路里，其属于酸性食物。肉类含蛋白质丰富，一般在10-20%之间。瘦肉比肥肉含蛋白质多。');

-- --------------------------------------------------------

--
-- 表的结构 `ca_chef`
--

CREATE TABLE `ca_chef` (
  `chid` int(11) NOT NULL COMMENT '主键',
  `imgurl` text NOT NULL COMMENT '图片',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `job` varchar(50) NOT NULL COMMENT '职位',
  `score` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '评分（1-5）',
  `descs` text NOT NULL COMMENT '介绍',
  `is_rec` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否推荐（0不推荐，1推荐）'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='厨师表';

--
-- 转存表中的数据 `ca_chef`
--

INSERT INTO `ca_chef` (`chid`, `imgurl`, `name`, `job`, `score`, `descs`, `is_rec`) VALUES
(1, '../Assets/uploads/chef/201912152243008359.jpg', 'Nicolus Smith', '行政总厨', 1, '是酒店厨房的管理部门领导，主要对炒锅进行日常管理，对厨房所有菜品进行高标准控制等工作，要求具有大餐饮行业炒锅或主管工作经验，还应有厨房管理的能力和技巧。', 1),
(2, '../Assets/uploads/chef/201912152244085456.jpg', 'Henry Collins', '厨师长', 2, '是酒店厨房的管理部门领导，主要对炒锅进行日常管理，对厨房所有菜品进行高标准控制等工作，要求具有大餐饮行业炒锅或主管工作经验，还应有厨房管理的能力和技巧。', 0),
(3, '../Assets/uploads/chef/201912152244262823.jpg', 'Nicolus Smith', '主厨', 3, '对食品准备有技巧的人,他负责管理厨房和大企业(如旅馆或饭店)的炊事人员,计划菜单,订购食品原料,指挥和协助烹饪工作,准备特定的饭菜等——亦称“炊事长”。主厨已经是很多大企业中不可缺少的职位。', 1),
(4, '../Assets/uploads/chef/20191215231255670.jpg', 'Nicolus Smith', '厨房部门主管', 4, '配菜根据菜肴品种和各自的质量要求，把经过刀工处理后的两种或两种以上的主料和辅料适当搭配，使之成为一个（或一桌）完整的菜肴原料。配菜的恰当与否，直接关系到菜的色、香、味、形和营养价值，也决定到整桌菜肴是否协调。可谓是饭桌上很重要的一门学问。', 0),
(5, '../Assets/uploads/chef/201912152313053888.jpg', 'Henry Collins', '炒菜厨师', 5, '饮食行业红案之一，负责将砧板切好配好的原料腌好调味、上粉上浆、用炉子烹制、协助厨师制作造型。简单的说就是厨房里面的全能选手也是一个杂工，帮厨师打杂，什么都需要会了解，但什么都不是一把手。这个职位源于粤菜，最初的目的是为厨师减轻负担。', 1),
(6, '../Assets/uploads/chef/201912171134083875.jpg', 'Nicolus Smith', '切配厨师', 5, '该工种在大，中，小型餐馆，酒店}经常试用，是不可缺少的职业之一。一桌酒席，凉菜先上，凉菜是头菜，直接能让顾客感觉对这家餐馆是否有兴趣。有时也会制作简单或者复杂的果盘。', 1),
(9, '../Assets/uploads/chef/202001101713527032.jpg', 'Henry Collinsa', '切配厨师', 5, '该工种在大，中，小型餐馆，酒店}经常试用，是不可缺少的职业之一。一桌酒席，凉菜先上，凉菜是头菜，直接能让顾客感觉对这家餐馆是否有兴趣。有时也会制作简单或者复杂的果盘。', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ca_comment`
--

CREATE TABLE `ca_comment` (
  `coid` int(11) NOT NULL COMMENT '主键',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `email` varchar(50) NOT NULL COMMENT '邮箱',
  `content` text NOT NULL COMMENT '评论内容',
  `did` int(10) UNSIGNED NOT NULL COMMENT '动态ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='评论表';

--
-- 转存表中的数据 `ca_comment`
--

INSERT INTO `ca_comment` (`coid`, `nickname`, `email`, `content`, `did`) VALUES
(1, 'Adam Smith', '1@qq.com', '喷香扑鼻的八宝粥送来的时候，我怀揣着激动的心情，颤抖的打开，五颜六色豆类的芳香气息顿时充满了我整个鼻腔，打开一尝，啊...这口感，软糯不腻、这质量、只怪我读书少，无法用华丽的语言来形容它，配合 q弹的茶叶饭和香浓鸡腿味道的馅饼，我感觉我的舌头都高潮了??????', 1),
(2, 'Michle Parres', '1@qq.com', '味道很好，商家很贴心', 1),
(5, 'Adam Smith', '1@qq.com', '喷香扑鼻的八宝粥送来的时候，我怀揣着激动的心情，颤抖的打开，五颜六色豆类的芳香气息顿时充满了我整个鼻腔，打开一尝，啊...这口感，软糯不腻、这质量、只怪我读书少，无法用华丽的语言来形容它，配合 q弹的茶叶饭和香浓鸡腿味道的馅饼，我感觉我的舌头都高潮了??????', 1),
(4, 'Michle Parres', '1@qq.com', '味道很好，商家很贴心', 2),
(7, '899', '1786876546@qq.com', '898', 1),
(8, 'r', '345@qq.com', 'wrewr', 1),
(9, '1', '11@qq.com', '1', 1);

-- --------------------------------------------------------

--
-- 表的结构 `ca_dynamic`
--

CREATE TABLE `ca_dynamic` (
  `did` int(11) NOT NULL COMMENT '主键',
  `imgurl` text NOT NULL COMMENT '图片',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '时间',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `comment_num` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '评论数'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='动态表';

--
-- 转存表中的数据 `ca_dynamic`
--

INSERT INTO `ca_dynamic` (`did`, `imgurl`, `author`, `addtime`, `title`, `content`, `comment_num`) VALUES
(1, '../Assets/uploads/dynamic/202001141316119686.jpg', 'Adam Smith', 1576556178, '如何烹调、品尝美味的鸡肉', 'Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset表单的发布而普及，Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset床单的发布而普及。', 6),
(2, '../Assets/uploads/dynamic/202001141317327379.jpg', 'Adam Smith', 1576556178, '如何烹调、品尝美味的鸡肉', 'Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset表单的发布而普及，Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset床单的发布而普及。', 1),
(3, '../Assets/uploads/dynamic/202001141317442515.jpg', 'Michle Parres', 1576556186, '如何烹调、品尝美味的鸡肉', 'Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset表单的发布而普及，Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset床单的发布而普及。', 0),
(4, '../Assets/uploads/dynamic/201912171216399202.jpg', 'Adam Smith', 1576556203, '如何烹调、品尝美味的鸡肉', 'Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset表单的发布而普及，Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset床单的发布而普及。', 0),
(5, '../Assets/uploads/dynamic/201912171802517644.jpg', 'Michle Parres', 1576576976, '如何烹调、品尝美味的鸡肉', 'Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset表单的发布而普及，Lorem Ipsum只是印刷和排版行业的虚拟文本。自15世纪以来，Lorem Ipsum一直是业界标准的虚拟文本，当时一个不知名的印刷商拿了一个铅字厨房，拼凑起来做一本铅字样本书。它不仅存活了五个世纪，而且在电子排版方面也有了飞跃，基本上保持不变。它在20世纪60年代随着含有Lorem Ipsum pass的Letraset床单的发布而普及。', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ca_food`
--

CREATE TABLE `ca_food` (
  `fid` int(11) NOT NULL COMMENT '主键',
  `imgurl` text NOT NULL COMMENT '图片',
  `fname` varchar(50) NOT NULL COMMENT '名称',
  `price1` decimal(6,2) UNSIGNED NOT NULL DEFAULT '0.00' COMMENT '购买价格',
  `price2` decimal(6,2) UNSIGNED DEFAULT '0.00' COMMENT '市场价格',
  `score` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '评分（1-5）',
  `album` text COMMENT '相册',
  `fdesc` text NOT NULL COMMENT '描述',
  `cid` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '分类ID',
  `is_rec` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否推荐（0不推荐，1推荐）'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='菜品表';

--
-- 转存表中的数据 `ca_food`
--

INSERT INTO `ca_food` (`fid`, `imgurl`, `fname`, `price1`, `price2`, `score`, `album`, `fdesc`, `cid`, `is_rec`) VALUES
(1, '../Assets/uploads/food/201912151619352298.jpg', '皮蛋瘦肉粥', '15.66', '25.66', 4, NULL, '青菜、皮蛋、猪瘦肉', 1, 1),
(2, '../Assets/uploads/food/201912151622331964.jpg', '柴鱼皮花生瘦肉粥', '22.66', '32.66', 5, NULL, '柴鱼皮，瘦肉，花生等原料大火熬制而成，浓而不腻', 1, 0),
(3, '../Assets/uploads/food/201912151636569221.jpg', '艇仔粥', '26.66', '36.66', 3, NULL, '香菇、虾仁、干贝、猪肉', 1, 0),
(4, '../Assets/uploads/food/201912151638363945.jpg', '虫草花蒸土鸡', '9.90', '16.00', 3, NULL, '作为江南家招牌菜之一，精选养足180天的清远土鸡，加上绿色天然的虫草花作为辅料', 2, 0),
(5, '../Assets/uploads/food/201912151639115403.jpg', '番茄炒蛋', '5.90', '9.90', 4, NULL, '好看的皮囊万里挑房 有趣的灵魂200多斤', 2, 1),
(6, '../Assets/uploads/food/201912151639518641.jpg', '梅菜扣肉', '10.90', '17.00', 3, NULL, '这道菜的精华主要在梅菜上，吸收了猪肉的香味，让人赞不绝口', 2, 0),
(7, '../Assets/uploads/food/20191215164013144.jpg', '特色虾卷+私房可乐鸡', '12.90', '37.55', 4, NULL, '来自大海的味道！', 3, 1),
(8, '../Assets/uploads/food/201912151640448521.jpg', '肉沫茄子+卤蛋+时蔬+小菜+米饭', '12.90', '37.55', 2, NULL, '有荤有素，酸香口感。就是没鱼....', 3, 0),
(9, '../Assets/uploads/food/201912151641033822.jpg', '泰式碳烤猪颈肉+香辣滋味走地鸡+卤蛋双拼饭', '13.90', '37.55', 3, NULL, '爽爆味蕾！不服来战！', 3, 0),
(10, '../Assets/uploads/food/20191215164122758.jpg', '多肉芒芒甘露', '25.00', '35.00', 4, NULL, '冷饮480ml，热饮500ml。经典茫茫与杨枝甘露的灵感碰撞', 4, 1),
(11, '../Assets/uploads/food/201912151641454487.jpg', '豆豆波波茶', '25.00', '35.00', 2, NULL, '厚厚黄豆粉铺满在芋圆波波上，搭配秘制豆乳奶盖，阿萨姆奶茶底部', 4, 0),
(12, '../Assets/uploads/food/201912151642069915.jpg', '多肉葡萄', '28.00', '38.00', 5, NULL, '冷热饮670ml 选用当季巨峰葡萄，颗颗手剥，果肉厚实。', 4, 1),
(13, '../Assets/uploads/food/201912151642241067.jpg', '喜茶拿铁', '19.00', '29.00', 2, NULL, '热360ML 冰480ML。选用优质阿拉比卡咖啡豆拼配', 5, 0),
(14, '../Assets/uploads/food/20191215164245590.jpg', '咖啡波波冰', '25.00', '35.00', 4, NULL, '冰480ml 热360ml 咖啡外送可能会影响口感。', 5, 0),
(15, '../Assets/uploads/food/201912151643033736.jpg', '芝芝拿铁', '25.00', '35.00', 3, NULL, '冰480ml 热360ml 咖啡外送可能会影响口感。', 5, 1),
(16, '../Assets/uploads/food/201912232008059460.jpg', '安心油条', '3.00', '13.00', 4, 'null', '面粉、小麦粉', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ca_foodimg`
--

CREATE TABLE `ca_foodimg` (
  `fiid` int(11) NOT NULL COMMENT '相册主键',
  `imgurl` text NOT NULL COMMENT '相册图片',
  `fid` int(11) NOT NULL COMMENT '食物外键'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='相册表';

--
-- 转存表中的数据 `ca_foodimg`
--

INSERT INTO `ca_foodimg` (`fiid`, `imgurl`, `fid`) VALUES
(1, '../Assets/uploads/foodimg/201912202018128740.jpg', 1),
(2, '../Assets/uploads/foodimg/201912202018212594.jpg', 1),
(3, '../Assets/uploads/foodimg/201912202018302792.jpg', 1),
(4, '../Assets/uploads/foodimg/201912202018371199.jpg', 1),
(5, '../Assets/uploads/foodimg/201912202018469646.jpg', 1),
(6, '../Assets/uploads/foodimg/201912202026341946.jpg', 2),
(7, '../Assets/uploads/foodimg/201912202026425225.jpg', 2),
(8, '../Assets/uploads/foodimg/201912202026512433.jpg', 2),
(9, '../Assets/uploads/foodimg/201912202027012534.jpg', 2),
(10, '../Assets/uploads/foodimg/201912202027126935.jpg', 2),
(11, '../Assets/uploads/foodimg/201912202029156865.jpg', 3),
(12, '../Assets/uploads/foodimg/201912202029503987.jpg', 3),
(13, '../Assets/uploads/foodimg/201912232001417783.jpg', 3),
(14, '../Assets/uploads/foodimg/201912232001545319.jpg', 3);

-- --------------------------------------------------------

--
-- 表的结构 `ca_orders`
--

CREATE TABLE `ca_orders` (
  `oid` int(11) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '姓名',
  `phone` char(11) NOT NULL COMMENT '手机号',
  `date` date NOT NULL COMMENT '日期',
  `time` varchar(50) NOT NULL COMMENT '时间',
  `people` tinyint(3) UNSIGNED NOT NULL COMMENT '人数',
  `remark` text COMMENT '备注'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='订单表';

--
-- 转存表中的数据 `ca_orders`
--

INSERT INTO `ca_orders` (`oid`, `name`, `phone`, `date`, `time`, `people`, `remark`) VALUES
(2, '张一', '13800138001', '2019-12-14', '下午1点', 1, '不吃辣'),
(4, '张二', '13800138002', '2019-12-16', '下午3点', 3, '少放辣'),
(5, '张三', '13800138003', '2019-12-17', '下午4点', 4, '不吃葱'),
(6, '张三', '13800138003', '2019-12-16', '下午5点', 5, '不吃蒜'),
(7, '张三', '13800138003', '2019-12-18', '下午6点', 6, '不吃香菜');

-- --------------------------------------------------------

--
-- 表的结构 `so_dynamic`
--

CREATE TABLE `so_dynamic` (
  `did` int(11) NOT NULL COMMENT '动态主键',
  `pic` text COMMENT '图片',
  `descs` text NOT NULL COMMENT '心情描述',
  `pos` varchar(50) NOT NULL COMMENT '位置',
  `tag` varchar(125) NOT NULL COMMENT '标签',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '发布时间',
  `uid` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '用户ID',
  `zannum` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '点赞数量'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='动态';

--
-- 转存表中的数据 `so_dynamic`
--

INSERT INTO `so_dynamic` (`did`, `pic`, `descs`, `pos`, `tag`, `addtime`, `uid`, `zannum`) VALUES
(50, '2019120515455691343.png,2019120515455681851.png', 'dfdsfs', '广东 广州', '探险游', 1575531956, 10, 0),
(51, '2019120515462470539.png,2019120515462448464.png,2019120515462499434.png', 'dsfdsf', '广东 广州', '七日游', 1575531984, 11, 0),
(49, '2019120515454313509.png', 'qweq', '广东 广州', '探险游,七日游', 1575531943, 10, 0),
(47, '2019120515444497868.png,2019120515444466880.png', '12321', '广东 广州', '冰川景色', 1575531884, 9, 0),
(48, '2019120515445738048.png,2019120515445793503.png,2019120515445768481.png', '123', '广东 广州', '冰川景色,探险游', 1575531897, 9, 0),
(60, '2019121018262571445.png,2019121018262531694.png,2019121018262596829.png,2019121018262579844.png,2019121018262551543.png,2019121018262587713.png,2019121018262551588.png,2019121018262540270.png,2019121018262561613.png', '我乃行天之道，總司一切的男人', '海外 其他 ', '七日游', 1575973585, 13, 2),
(59, '2019121018110789752.png,2019121018110796612.png,2019121018110763537.png,2019121018110720897.png,2019121018110784663.png,2019121018110763447.png', '世界的破坏者', '北京 东城区 ', '七日游', 1575972667, 12, 1),
(61, '2019122111121957333.png', '123', '北京 东城区 ', '探险游,七日游', 1576897939, 15, 0),
(83, '2019120717454314711.png,2019120717454332345.png,2019120717454339233.png', '是一场由企业举办的文化旅游节庆，其特点是规模大、地域广、时间长、内容多。2019年的欢乐体验较去年有更多的升级与升华，无论你身在何处、无论你对旅游有多么个性化的需求，在这里大多能找到你中意的玩法', '北京 丰台区 ', '冰川景色,探险游', 1575711943, 9, 1),
(81, '2019120717400577689.png,2019120717400553666.png,2019120717400519584.png', '无处安放的美腿 ​ ​​​​', '上海 徐汇区 ', '冰川景色', 1575711605, 13, 0),
(80, '2019120717383421693.png,2019120717383429983.png,2019120717383492359.png', '闪亮亮的美人鱼 ​ ​​​​', '上海 黄浦区 ', '七日游', 1575711514, 13, 1),
(78, '2019120717124493805.png,2019120717124490068.png,2019120717124453202.png', '女生出门一定要擦防晒！！！ ​ ​​​​', '上海 静安区 ', '冰川景色,七日游', 1575709964, 13, 3),
(77, '2019120717100063673.png,2019120717100095819.png,2019120717100084686.png', '镇魂那几毛钱的特效，和无法言述的剧情全是靠朱一龙和白宇撑起来的！\r\n特效不好、道具不行，剧情狗血，故事情节有改动，没事，最后我们都因为演技成了镇魂女孩！', '北京 海淀区 ', '冰川景色,探险游', 1575709800, 12, 4),
(76, '2019120717061442243.png,2019120717061414705.png,2019120717061420122.png', '我喜欢你，胜于昨日，略匮明朝。', '陕西 西安 蓝田县', '冰川景色', 1575709574, 11, 3),
(82, '2019120717442071204.png,2019120717442018120.png', '今晨，北京迎来今冬初雪，在初雪的装点下，北京颐和园内银装素裹，有种一夜穿越回古朝的感觉，美景甚是迷人。皑皑的白雪堆积在路上，仿佛刷了一路的白漆，洁白无瑕；踩上去，又好像地上铺了一层厚厚的棉被，凉凉的，湿湿的。', '北京 崇文区 ', '冰川景色,探险游', 1575711860, 9, 1),
(75, '2019120717005225235.png,2019120717005247804.png,2019120717005214200.png', '最近，小八沉迷于《庆余年》这部剧，不能自拔。连夜开会员也要追到最新一集[允悲]饭碗cp太甜了，王启年、范思辙太搞笑，滕梓荆让人感动，庆帝、长公主一出来就是权谋剧的画风[喵喵]这部剧可真的太上头了，泥萌看了吗？ ', '北京 朝阳区 ', '探险游', 1575709252, 10, 3),
(74, '2019120716523673770.png,2019120716523679342.png,2019120716523635438.png', '现在，去西安旅游，又多了一个打卡目标！去西安大唐不夜城，和“不倒翁小姐姐”牵手。每晚演出都被围的水泄不通，当她把手伸过来“牵手”的那一刻，那一瞬间，便是一眼万年。君君带你梦回大唐！', '陕西 西安 莲湖区', '七日游', 1575708756, 9, 3),
(84, '2019120717475387309.png,2019120717475328062.png,2019120717475348147.png', '欧阳娜娜穿黑色露肩裙出席活动，大波浪卷发超美，娜比真的有在好好成长呀[泪] ​​​​', '北京 顺义区 ', '七日游', 1575712073, 10, 1),
(85, '2019120717490453984.png,2019120717490469324.png,2019120717490435448.png', '#林小宅 杨超越#杨超越粉丝开撕网红林小宅，\r\n起因是因为林小宅去年疑似diss过杨超越。对此林小宅发博否认，杨超越粉丝还说她已经报名创造营2020[摊手]准备出道了，此事，你们怎么看 ​​​​', '北京 大兴区 ', '七日游', 1575712144, 10, 0),
(86, '2019120717512386623.png,2019120717512334024.png,2019120717512314533.png', '这个世界的第一天。 ', '陕西 西安 雁塔区', '七日游', 1575712283, 11, 1),
(87, '2019120717522258596.png,2019120717522255775.png,2019120717522240087.png', '山路元无雨，空翠湿人衣。', '陕西 西安 阎良区', '探险游', 1575712342, 11, 0),
(88, '2019120717543730481.png,2019120717543757814.png,2019120717543724991.png', '#影视剧逃不过的设定#\r\n有哪些影视剧中逃不过的设定[doge]\r\n分手总是在雨天\r\n接吻总是被电话打断\r\n反派总是死于话多\r\n上床必怀孕', '北京 房山区 ', '探险游', 1575712477, 12, 0),
(89, '2019120717561067704.png,2019120717561017222.png,2019120717561057265.png', '#狼殿下#\r\n我等疾冲等到得了相思病，等到顾医生都要开始营业了[允悲]还有等一个唐三可以么！！！！\r\n小甜豆沁也要来了么！！！！！', '北京 房山区 ', '冰川景色,探险游', 1575712570, 12, 1);

-- --------------------------------------------------------

--
-- 表的结构 `so_focus`
--

CREATE TABLE `so_focus` (
  `fid` int(11) NOT NULL COMMENT '关注主键',
  `uid` int(10) UNSIGNED NOT NULL COMMENT '关注者ID',
  `touid` int(10) UNSIGNED NOT NULL COMMENT '被关注者ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='关注表';

--
-- 转存表中的数据 `so_focus`
--

INSERT INTO `so_focus` (`fid`, `uid`, `touid`) VALUES
(8, 12, 11),
(11, 13, 10),
(12, 13, 12),
(13, 14, 13),
(49, 10, 9),
(69, 15, 12),
(51, 13, 9),
(52, 13, 11),
(55, 9, 10),
(56, 11, 12),
(57, 11, 13),
(58, 11, 10),
(59, 11, 9),
(60, 12, 13),
(61, 12, 11),
(62, 12, 10),
(63, 12, 9),
(64, 9, 13),
(65, 10, 11);

-- --------------------------------------------------------

--
-- 表的结构 `so_likes`
--

CREATE TABLE `so_likes` (
  `lid` int(11) NOT NULL COMMENT '点赞主键',
  `uid` int(10) UNSIGNED NOT NULL COMMENT '用户ID',
  `did` int(10) UNSIGNED NOT NULL COMMENT '动态ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='点赞表';

--
-- 转存表中的数据 `so_likes`
--

INSERT INTO `so_likes` (`lid`, `uid`, `did`) VALUES
(22, 14, 60),
(23, 15, 60),
(24, 15, 59),
(32, 9, 50),
(9, 10, 51),
(10, 10, 50),
(41, 9, 56),
(33, 9, 53),
(47, 10, 73),
(51, 13, 75),
(49, 13, 74),
(52, 13, 77),
(53, 13, 78),
(54, 9, 77),
(55, 9, 76),
(56, 9, 75),
(58, 11, 78),
(59, 11, 77),
(60, 11, 74),
(61, 12, 78),
(62, 12, 77),
(63, 12, 76),
(64, 12, 75),
(65, 12, 74),
(66, 13, 80),
(67, 9, 82),
(68, 9, 83),
(69, 11, 86),
(70, 10, 76),
(71, 9, 84),
(72, 15, 89);

-- --------------------------------------------------------

--
-- 表的结构 `so_user`
--

CREATE TABLE `so_user` (
  `uid` int(11) NOT NULL COMMENT '用户主键',
  `phone` char(11) NOT NULL COMMENT '手机',
  `pwd` varchar(30) NOT NULL COMMENT '密码',
  `photo` text COMMENT '头像',
  `nickname` varchar(20) NOT NULL COMMENT '昵称',
  `email` varchar(30) NOT NULL COMMENT '电子邮箱',
  `sex` set('男','女','保密') NOT NULL COMMENT '性别',
  `descs` text NOT NULL COMMENT '简介'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户';

--
-- 转存表中的数据 `so_user`
--

INSERT INTO `so_user` (`uid`, `phone`, `pwd`, `photo`, `nickname`, `email`, `sex`, `descs`) VALUES
(9, '13800138000', '123456', NULL, '1', '1@qq.com', '男', '1'),
(10, '13800138002', '123456', NULL, '2', '2@qq.com', '男', '2'),
(11, '13800138003', '123456', NULL, '3', '3@qq.com', '男', '3'),
(12, '15173504707', 'pass123456', '2019121017274765402.png', 'Decade', '9574610133@qq.com', '男', '世界的破坏者'),
(13, '18675473615', '111111', '2019121018155590950.png', 'Kabuto', '111@qq.com', '男', '總司統領一切的男人，天道總司'),
(14, '13800138001', '123123', NULL, '123123', '123@qq.com', '男', '123'),
(15, '13580135801', '123456', '2019122111114043096.png', '小明', '55@qq.com', '男', '22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ca_cate`
--
ALTER TABLE `ca_cate`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `ca_chef`
--
ALTER TABLE `ca_chef`
  ADD PRIMARY KEY (`chid`);

--
-- Indexes for table `ca_comment`
--
ALTER TABLE `ca_comment`
  ADD PRIMARY KEY (`coid`);

--
-- Indexes for table `ca_dynamic`
--
ALTER TABLE `ca_dynamic`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `ca_food`
--
ALTER TABLE `ca_food`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `ca_foodimg`
--
ALTER TABLE `ca_foodimg`
  ADD PRIMARY KEY (`fiid`);

--
-- Indexes for table `ca_orders`
--
ALTER TABLE `ca_orders`
  ADD PRIMARY KEY (`oid`);

--
-- Indexes for table `so_dynamic`
--
ALTER TABLE `so_dynamic`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `so_focus`
--
ALTER TABLE `so_focus`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `so_likes`
--
ALTER TABLE `so_likes`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `so_user`
--
ALTER TABLE `so_user`
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `ca_cate`
--
ALTER TABLE `ca_cate`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `ca_chef`
--
ALTER TABLE `ca_chef`
  MODIFY `chid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `ca_comment`
--
ALTER TABLE `ca_comment`
  MODIFY `coid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `ca_dynamic`
--
ALTER TABLE `ca_dynamic`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `ca_food`
--
ALTER TABLE `ca_food`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=19;

--
-- 使用表AUTO_INCREMENT `ca_foodimg`
--
ALTER TABLE `ca_foodimg`
  MODIFY `fiid` int(11) NOT NULL AUTO_INCREMENT COMMENT '相册主键', AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `ca_orders`
--
ALTER TABLE `ca_orders`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `so_dynamic`
--
ALTER TABLE `so_dynamic`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT COMMENT '动态主键', AUTO_INCREMENT=90;

--
-- 使用表AUTO_INCREMENT `so_focus`
--
ALTER TABLE `so_focus`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '关注主键', AUTO_INCREMENT=70;

--
-- 使用表AUTO_INCREMENT `so_likes`
--
ALTER TABLE `so_likes`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT COMMENT '点赞主键', AUTO_INCREMENT=73;

--
-- 使用表AUTO_INCREMENT `so_user`
--
ALTER TABLE `so_user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键', AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
