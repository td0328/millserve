//公共业务路由创建
var express = require('express');
var router = express.Router();
var Index = require('../api/common/Index.js');
/* GET home page. */
router.get('/index/getMenus', function(req, res, next) {
  Index.getMenus(res).then();
  return ;
});
module.exports = router;
