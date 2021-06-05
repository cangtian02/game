const express = require('express')
const router = express.Router()
const connection =  require('../sql/sql')

connection.connect()

// 查询题库等级列表
router.get('/api/queryItemgrade', function (req, res, next) {
  let sql = 'SELECT * FROM item_grade'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errcode: 0,
        message: '查询题库等级异常',
      })
    }
    res.json({
      errcode: 0,
      data: results,
    })
  })
})

// 根据题库等级查询题库列表
router.get('/api/queryItemList', function (req, res, next) {
  let sql = `SELECT * FROM item_store WHERE grade_id=${req.query.gradeId}`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errcode: 0,
        message: '查询题库列表异常',
      })
    }
    res.json({
      errcode: 0,
      data: results,
    })
  })
})

// 根据题库id查询题库详情
router.get('/api/queryItemDetail', function (req, res, next) {
  let sql = `SELECT * FROM item_store WHERE id=${req.query.itemId}`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errcode: 0,
        message: '查询题库详情异常',
      })
    }
    let data = results[0]
    let gradeId = data.grade_id

    if (gradeId) {
      let sql2 = `SELECT * FROM item_grade WHERE id=${gradeId}`
      connection.query(sql2, (err2, results2) => {
        if (err2) {
          data.grade_name = ''
          res.json({
            errcode: 0,
            data: data,
          })
        } else {
          data.grade_name = Array.isArray(results2) && results2[0] && results2[0].name ? results2[0].name : ''
          res.json({
            errcode: 0,
            data: data,
          })
        }
      })
    } else {
      data.grade_name = ''
      res.json({
        errcode: 0,
        data: data,
      })
    }
  })
})

// 根据题库id更新完成人数,如果时间比记录的时间短，就更新完成时间，并返回此记录是最新记录 data.newRecords表示已破纪录
router.get('/api/updateItemData', function (req, res, next) {
  let fn = time => {
    let sql = time > req.query.winTime || time == 0 ? `UPDATE item_store SET win_time=${req.query.winTime},win_num=win_num + 1 WHERE id=${req.query.itemId}` : `UPDATE item_store SET win_num=win_num + 1 WHERE id=${req.query.itemId}`

    connection.query(sql, (err, results) => {
      if (err) {
        return res.json({
          errcode: 0,
          message: '服务异常',
        })
      }
      let data = {}
      if (time > req.query.winTime || time == 0) data.newRecords = true
      res.json({
        errcode: 0,
        data: data,
      })
    })
  }

  getItemTime(req.query.itemId).then(time => {
    fn(time)
  }).catch(() => {
    fn(-1)
  })
})

// 根据题库id获取完成时间
function getItemTime(id) {
  return new Promise((resvole, reject) => {
    let sql = `SELECT * FROM item_store WHERE id=${id}`
    connection.query(sql, (err, results) => {
      if (err) {
        reject()
      } else {
        results[0].win_time >= 0 ? resvole(results[0].win_time) : reject()
      }
    })
  })
}

// 查询游戏配置
router.get('/api/queryGameConst', function (req, res, next) {
  let sql = 'SELECT * FROM game_const'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errcode: 0,
        message: '查询游戏配置异常',
      })
    }
    let data = {};
    results.forEach(val => {
      data[val.key] = val.value
    })

    res.json({
      errcode: 0,
      data: data
    })
  })
})

module.exports = router