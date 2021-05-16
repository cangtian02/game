/*
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: duiying
 * @LastEditTime: 2019-09-25 16:43:16
 * @Description: ...
 */
class pushBox {

  constructor() {
    this.initialCoordinate = window.leval.data
    this.boy = window.leval.boy
    this.targetNum = window.leval.targetNum
    this.copyInitialCoordinate = JSON.parse(JSON.stringify(this.initialCoordinate))
    this.copyBoy = JSON.parse(JSON.stringify(this.boy))

    this.stepNum = 0
    this.recordInitialCoordinate = []
    this.recordBoy = []
    this.isWin = false

    this.imgs = {
      bg: './bg.png',
      wall: './wall.png',
      box: './box.png',
      target: './target.png',
      win: './win.png',
      boy: './boy.png',
      grass: './grass.png',
    }

    this.can
    this.ctx
    this.ctxWidth
    this.ctxHeight
    this.boxDefaultWidth = 50

    this.init()
  }

  init() {
    this.can = document.getElementById('canvas')
    this.ctx = this.can.getContext("2d")

    this.can.width = this.initialCoordinate[0].length * this.boxDefaultWidth
    this.can.height = this.initialCoordinate.length * this.boxDefaultWidth
    this.ctxWidth = this.can.width
    this.ctxHeight = this.can.height

    this.loadImg()
  }

  loadImg() {
    let n1 = 0
    let n2 = 0

    for (let key in this.imgs) {
      n1++
      let img = new Image();
      img.src = this.imgs[key];
      img.onload = () => {
        n2++
        this.imgs[key] = img
        if (n2 === n1) {
          this.drawCheckerboard()
          this.run()
        }
      }
    }
  }

  drawCheckerboard() {
    let ic = this.initialCoordinate
    for (let i = 0; i < ic.length; i++) {
      for (let j = 0; j < ic[i].length; j++) {
        let val = ic[i][j]
        let arr = ['target', 'box', 'boy', 'win', 'wall']
        if (val === -1) this.drawItem('grass', j, i)
        if (val > -1) this.drawItem('bg', j, i)
        if (arr[val - 1]) this.drawItem(arr[val- 1], j, i)
      }
    }
  }

  drawItem(key, x, y) {
    let bdw = this.boxDefaultWidth
    this.ctx.drawImage(this.imgs[key], bdw * x, bdw * y, bdw, bdw)
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight)
  }

  run() {
    document.onkeydown = event => {
      let e  = event  ||  window.e
      let keyCode = e.keyCode || e.which
      this.boxMove(keyCode)
    }

    document.getElementById('back').onclick = () => {
      this.back()
    }

    document.getElementById('reset').onclick = () => {
      this.reset()
    }
  }

  boxMove(keyCode) {
    if (this.isWin) return
    
    let initialCoordinate = this.initialCoordinate
    let boy = this.boy

    // left
    if (keyCode === 37) {
      let leftType = initialCoordinate[boy[0]][boy[1] - 1]
      if ([1, 4, 5].includes(leftType)) return

      let nextLeftType = initialCoordinate[boy[0]][boy[1] - 2]
      if (leftType === 2 && [2, 4, 5].includes(nextLeftType)) return
      
      this.tranRecord(leftType, nextLeftType, boy[0], boy[1] - 2)
      this.tranBoy(boy[0], boy[1] - 1)
    }

    // up
    if (keyCode === 38) {
      let upType = initialCoordinate[boy[0] - 1][boy[1]]
      if ([1, 4, 5].includes(upType)) return

      let nextUpType = initialCoordinate[boy[0] - 2][boy[1]]
      if (upType === 2 && [2, 4, 5].includes(nextUpType)) return
      
      this.tranRecord(upType, nextUpType, boy[0] - 2, boy[1])
      this.tranBoy(boy[0] - 1, boy[1])
    }

    // right
    if (keyCode === 39) {
      let rightType =initialCoordinate[boy[0]][boy[1] + 1]
      if ([1, 4, 5].includes(rightType)) return

      let nextRightType = initialCoordinate[boy[0]][boy[1] + 2]
      if (rightType === 2 && [2, 4, 5].includes(nextRightType)) return

      this.tranRecord(rightType, nextRightType, boy[0], boy[1] + 2)
      this.tranBoy(boy[0], boy[1] + 1)
    }

    // down
    if (keyCode === 40) {
      let downType = initialCoordinate[boy[0] + 1][boy[1]]
      if ([1, 4, 5].includes(downType)) return

      let nextDownType = initialCoordinate[boy[0] + 2][boy[1]]
      if (downType === 2 && [2, 4, 5].includes(nextDownType)) return

      this.tranRecord(downType, nextDownType, boy[0] + 2, boy[1])
      this.tranBoy(boy[0] + 1, boy[1])
    }

    if ([37, 38, 39, 40].includes(keyCode)) {
      this.initialCoordinate[boy[0]][boy[1]] = 0
      this.stepNum++
      this.judgeWin()
      this.clearCanvas()
      this.drawCheckerboard()
    }
  }

  tranRecord(type, nextType, i , j) {
    if (type === 2) {
      this.recordHistory()
      this.initialCoordinate[i][j] = nextType === 1 ? 4 : 2
    }
  }

  tranBoy(i, j) {
    this.initialCoordinate[i][j] = 3
    this.boy = [i, j]
  }

  judgeWin() {
    let arr = JSON.stringify(this.initialCoordinate)
    let num = arr.match(/[4]/ig) ? arr.match(/[4]/ig).length : 0
    if (num === this.targetNum) {
      this.isWin = true
      document.getElementById('p').innerText = '游戏成功！共进行了' + this.stepNum + '步'
    } 
  }

  recordHistory() {
    this.recordInitialCoordinate.push(JSON.parse(JSON.stringify(this.initialCoordinate)))
    this.recordBoy.push(JSON.parse(JSON.stringify(this.boy)))
  }

  back() {
    if (this.recordInitialCoordinate.length === 0 || this.isWin) return

    this.stepNum++
    this.initialCoordinate = JSON.parse(JSON.stringify(this.recordInitialCoordinate[this.recordInitialCoordinate.length - 1]))
    this.recordInitialCoordinate.pop()
    this.boy = JSON.parse(JSON.stringify(this.recordBoy[this.recordBoy.length - 1]))
    this.recordBoy.pop()
    this.clearCanvas()
    this.drawCheckerboard()
  }

  reset() {
    this.initialCoordinate = JSON.parse(JSON.stringify(this.copyInitialCoordinate))
    this.boy = JSON.parse(JSON.stringify(this.copyBoy))
    this.stepNum = 0
    this.isWin = false
    this.clearCanvas()
    this.drawCheckerboard()
    document.getElementById('p').innerText = ''
  }

}

window.onload = () => {
  new pushBox()
}
