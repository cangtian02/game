import React from 'react';
import BScroll from 'better-scroll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMaskFlag } from '../../redux/actions/index';
import Utils from '../../common/Utils';
import '../../assets/atom-one-dark.css';
import './game.css';

import Start from './start/start';  // 游戏开始倒计时提示
import Win from './win/win';  // 游戏完成提示
import Tip from './tip/tip';  // 源码提示
import Info from './info/info';  // 玩法介绍 
import Header from './header/header';  // 头部
import {GrirdItem, ClassItem} from './item/item';  // grird item, class item
import CodeHtmlDom from './codeHtml/codeHtml';  // 源码 实时样式展示
import BotBtn from './botBtn/botBtn';  // 底部按钮

const mapStateToProps = state => {
  return {
    maskFlag: state.maskFlag,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setMaskFlag,
  }, dispatch);
}

class Game extends React.Component {

  constructor() {
    super();

    this.cssObjJSON = '';
    this.cssObj = {};
    this.cssArr = [];

    this.codeObjData = '';
    this.classNameArr = [];
    this.styleArr = [];
    this.styleTranArr = [];

    this.htmlStr = '';

    this.gridArr = [];

    this.state = {
      canClick: false,
      selectedArrCopy: [],
      selectedArr: [],
      selectedIndex: -1,
      selectedStepWin: [],
      win: false,
      info: '',
      codeHtmlOrder: false,
      tipNum: 3,
      times: 0,
      isStart: true,
      toggleGameInfoModal: false,
    }
  }

  componentDidMount() {
    this.getData().then(() => {
      this.tranCodeObjData();
    });
  }


  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    this.classNameScroll && this.classNameScroll.destroy();
    this.props.setMaskFlag(false);
  }

  getData() {
    return new Promise((resolve, reject) => {
      this.cssObjJSON = {
        "data": {
          "position": "relative, absolute",
          "display": "flex, block",
          "text-align": "center",
          "margin": "0px",
          "padding": "0px",
          "color": "red",
          "justify-content": "center",
          "align-items": "center",
          "flex-wrap": "wrap",
          "boder-radius": "4px",
          "overflow": "hidden",
        }
      };
      this.cssObj = this.cssObjJSON.data;
      this.cssArr = Utils.objToArr(this.cssObj);

      this.codeObjData = '.flex-center {display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; background: #73D9D9;} .c{color: #fff;}';

      this.htmlStr = '<div class="flex flex-center"><div class="c">hello world!</div></div>';

      resolve();
    });
  }

  tranCodeObjData() {
    let reg1 = /\.(.+?)\}/g;
    let reg2 = /\.(.+?)\{/g;
    let reg3 = /\{(.+?)\}/g;

    let selectedArr = [];

    let arr = this.codeObjData.match(reg1);
    arr.forEach(val => {
      let s1 = val.match(reg2)[0];
      s1 = s1.substring(0, s1.length - 1);
      s1 = Utils.deleteSpace(s1);
      this.classNameArr.push(s1);

      let s2 = Utils.cssToObj(val.match(reg3)[0]);
      this.styleArr.push(s2);

      let s3 = Utils.objToArr(s2);
      this.styleTranArr.push(s3);

      let otherArr = this.getOther(8 - s3.length, s2);
      let arr1 = [...s3, ...otherArr];
      let arr2 = [];
      for (let i = 0, len = arr1.length; i < len; i++) {
        arr2.push(Object.keys(arr1[i])[0]);
        arr2.push(arr1[i][Object.keys(arr1[i])[0]]);
      }
      arr2.sort(Utils.randomsort);
      this.gridArr.push(arr2);

      selectedArr.push([]);
    });

    this.setState({
      selectedArrCopy: JSON.parse(JSON.stringify(selectedArr)),
      selectedArr: selectedArr,
      selectedStepWin: new Array(selectedArr.length),
      selectedIndex: 0,
      canClick: true,
      codeStr: '',
      info: {
        id: 1,
        name: 'flex的日常使用',
        grade: '中级',
        num: 1000,
        date: 40,
      }
    }, () => {
      if (document.getElementsByClassName('class-item-li')) {
        let item = document.getElementsByClassName('class-item-li');
        let w = 0;
        for (let i = 0; i < item.length; i++) {
          w += item[i].clientWidth + 9;
        }
        document.getElementsByClassName('class-item-ul')[0].style.width = w + 'px';
        if (!this.classNameScroll) {
          this.classNameScroll = new BScroll('.class-item', {
            scrollX: true,
            eventPassthrough: 'vertical',
            click: true,
          });
        } else {
          this.classNameScroll.refresh();
        }
      }

      // 是否已经读过游戏玩法
      if (window.localStorage.getItem('isReadGameInfo')) {
        this.setState({
          isStart: false
        });
      } else {
        this.setState({
          toggleGameInfoModal: true,
        });
      }
      this.props.setMaskFlag(true);
    });
  }

  getOther(len, codeObj) {
    let arr = [];
    let selected = [];
    let flag = true;

    while (flag) {
      if (arr.length === len) {
        flag = false;
      } else {
        let index = Utils.getRandom(this.cssArr.length);
        if (!selected.includes(index)) {
          let key = Object.keys(this.cssArr[index])[0];
          if (codeObj[key]) {
            let val = this.cssObj[key];
            if (val !== codeObj[key]) {
              if (!val.includes(',')) {
                arr.push(this.cssArr[index]);
                selected.push(index);
              } else {
                val = val.split(',')
                for (let i = 0, len = val.length; i < len; i++) {
                  if (val[i] !== codeObj[key]) {
                    let obj = {};
                    obj[key] = Utils.deleteSpace(val[i]);
                    arr.push(obj);
                    selected.push(index);
                    break;
                  }
                }
              }
            }
          } else {
            for (let key in this.cssArr[index]) {
              let val = this.cssArr[index][key].split(',');
              if (val === 0) {
                arr.push(this.cssArr[index]);
              } else {
                let obj = {};
                obj[key] = val[Utils.getRandom(val.length)];
                arr.push(obj);
              }
            }
            selected.push(index);
          }
        }
      }
    }

    return arr;
  }

  gameStart() {
    this.timer = setInterval(() => {
      let t = this.state.times;
      t++;
      this.setState({
        times: t,
      });
    }, 1000);
  }

  pushGridArr(i) {
    let arr = this.state.selectedArr;
    arr[this.state.selectedIndex].push({
      val: this.gridArr[this.state.selectedIndex][i],
      index: i,
    });
    return arr;
  }

  // 处理 9宫格 item 点击
  itemClick(i) {
    if (!this.state.canClick || this.state.win) return;

    let selectedIndex = this.state.selectedIndex;
    let codeObj = this.styleArr[selectedIndex];
    let gridArr = this.gridArr[selectedIndex];

    if (this.state.selectedArr[selectedIndex].length === 0) {
      if (this.cssObj[gridArr[i]] || codeObj[gridArr[i]]) {
        this.setState({
          selectedArr: this.pushGridArr(i)
        }, () => {
          this.isVictory();
        });
      }
    } else {
      if (this.state.selectedArr[selectedIndex].length % 2 === 0) {
        if (this.cssObj[gridArr[i]] || codeObj[gridArr[i]]) {
          this.setState({
            selectedArr: this.pushGridArr(i)
          }, () => {
            this.isVictory();
          });
        }
      } else {
        let key = this.state.selectedArr[selectedIndex][this.state.selectedArr[selectedIndex].length - 1].val;
        let val = gridArr[i];

        if (key === val) {
          let arr = this.state.selectedArr;
          arr[selectedIndex].splice(arr[selectedIndex].length - 1, 1);
          this.setState({
            selectedArr: arr,
          }, () => {
            this.isVictory();
          });
        } else {
          if (!codeObj[key] || codeObj[key] !== val) {
            this.setState({
              selectedArr: this.pushGridArr(i),
              canClick: false,
            }, () => {
              setTimeout(() => {
                let arr2 = this.state.selectedArr;
                arr2[selectedIndex].splice(arr2[selectedIndex].length - 2, 2);
                this.setState({
                  canClick: true,
                  selectedArr: arr2,
                });
              }, 600);
            });
          } else {
            this.setState({
              selectedArr: this.pushGridArr(i)
            }, () => {
              this.isVictory();
            });
          }
        }
      }
    }
  }

  // css数组转dom可用样式形式 可以setAttribute
  arrToStyle(arr) {
    let str = '';
    let key = '';
    for (let i = 0; i < arr.length; i++) {
      if (key === '') {
        key = arr[i].val;
        str += key + ': ';
      } else {
        str += arr[i].val + ';'
        key = '';
      }
    }
    return str;
  }

  // 判断游戏是否完成
  isVictory() {
    let codeStr = '';
    this.classNameArr.forEach((val, i) => {
      val = val.substring(1, val.length);
      codeStr += codeStr === '' ? '.' + val + '{<br/>' : '<br/>.' + val + '{<br/>';
      let dom = document.getElementsByClassName(val);
      dom[0].setAttribute('style', this.arrToStyle(this.state.selectedArr[i]));
      let style = this.arrToStyle(this.state.selectedArr[i]);
      style = style.split(';');
      if (style.length > 1) {
        for (let i = 0, len = style.length; i < len; i++) {
          if (style[i] !== '') {
            codeStr += '  ' + style[i] + ';<br />';
          }
        }
      }
      codeStr += '}';
    });
    this.setState({codeStr}, () => {
      if (window.hljs) {
        window.hljs.highlightBlock(document.getElementsByClassName('hljs')[0]);
      }
    });

    let f = 0;
    let selectedStepWin = [];

    this.state.selectedArr.forEach((val, i) => {
      if (val.length / 2 === this.styleTranArr[i].length) {
        f++;
        selectedStepWin.push(1);
      } else {
        selectedStepWin.push(0);
      }
    });

    if (f === this.state.selectedArr.length) {
      this.timer && clearInterval(this.timer);
      this.props.setMaskFlag(true);
      this.setState({
        win: true,
        selectedStepWin: selectedStepWin,
      });
    } else {
      if (selectedStepWin.indexOf(1) > -1) {
        this.setState({
          selectedStepWin: selectedStepWin,
        }, () => {
          if (this.state.selectedStepWin[this.state.selectedIndex] === 1) {
            setTimeout(() => {
              this.nextSelectedIndex();
            }, 600);
          }
        });
      }
    }
  }

  // 当完成一个class选择后自动切换到下一个未完成的class
  nextSelectedIndex() {
    let selectedIndex = this.state.selectedIndex;

    let fn = (index, type = '+') => {
      if (index + 1 === this.state.selectedStepWin.length) {
        if (this.state.selectedStepWin[index - 1] === 0) {
          selectedIndex = index - 1;
        } else {
          fn(index - 1, '-');
        }
      } else if (index > 0 && index + 1 < this.state.selectedStepWin.length) {
        let i = type === '+' ? index + 1 : index - 1;
        if (this.state.selectedStepWin[i] === 0) {
          selectedIndex = i;
        } else {
          fn(type === '+' ? index + 1 : index - 1, type);
        }
      } else if (index === 0) {
        if (this.state.selectedStepWin[1] === 0) {
          selectedIndex = 1;
        } else {
          fn(index + 1, '+');
        }
      }

      if (selectedIndex !== this.state.selectedIndex) {
        this.setState({
          selectedIndex: selectedIndex,
        });
      }
    }

    fn(this.state.selectedIndex);
  }

  // class item 点击切换
  classNameClick(i) {
    if (i === this.state.selectedIndex) return;

    this.setState({
      selectedIndex: i,
    });
  }

  // 展示源码提示
  handleShowTip() {
    if (this.state.tipNum === 0 || this.state.win) return;

    this.setState({
      tipNum: this.state.tipNum - 1
    });
    this.props.setMaskFlag(true);
  }

  // 切换源码 实时样式展示 上下层级
  handleCodeHtmlChange() {
    this.setState({
      codeHtmlOrder: !this.state.codeHtmlOrder
    });
  }

  // 游戏重置，重置数据并重新开始
  handleReset() {
    this.timer && clearInterval(this.timer);

    this.classNameArr.forEach(val => {
      val = val.substring(1, val.length);
      let dom = document.getElementsByClassName(val);
      dom[0].setAttribute('style', '');
    });

    this.setState({
      selectedArr: JSON.parse(JSON.stringify(this.state.selectedArrCopy)),
      selectedIndex: 0,
      selectedStepWin: [],
      tipNum: 3,
      codeStr: '',
      times: 0,
      win: false,
    }, () => {
      this.gameStart();
    });
  }

  // 关闭游戏开始提示并开始游戏
  handleStart() {
    this.props.setMaskFlag(false);
    this.setState({
      isStart: true,
    }, () => {
      this.gameStart();
    });
  }

  // 关闭游戏完成提示
  handelCloseWin() {
    this.props.setMaskFlag(false);
  }

  // 游戏重置
  handelChallenge() {
    this.props.setMaskFlag(false);
    this.handleReset();
  }

  // 进入下一关
  handelNextGame() {
    this.props.setMaskFlag(false);
  }

  // 关闭源码提示
  handelCloseTip() {
    this.props.setMaskFlag(false);
  }

  // 打开游戏玩法介绍弹框
  handelShowGameInfo() {
    this.setState({
      toggleGameInfoModal: true,
    });
    this.props.setMaskFlag(true);
  }

  // 关闭游戏玩法介绍弹框
  handelCloseGameInfoModal() {
    if (window.localStorage.getItem('isReadGameInfo')) {
      // 已经阅读过玩法介绍直接关闭
      this.setState({
        toggleGameInfoModal: false,
      });
      this.props.setMaskFlag(false);
    } else {
      // 没有阅读过代表是第一次进入游戏，关闭后打开游戏开始提示层
      window.localStorage.setItem('isReadGameInfo', 1);
      this.setState({
        toggleGameInfoModal: false,
        isStart: false
      });
    }
  }

  render() {
    if (this.state.selectedIndex === -1) return null;

    return (
      <div className="game">
        <Header 
          info={this.state.info}
          times={this.state.times}
          win={this.state.win}
        />

        <GrirdItem 
          canClick={this.state.canClick} 
          gridArr={this.gridArr[this.state.selectedIndex]} 
          selected={this.state.selectedArr[this.state.selectedIndex]} 
          selectedStepWin={this.state.selectedStepWin} 
          selectedIndex={this.state.selectedIndex} 
          click={(i) => { this.itemClick(i)}} 
        />

        <ClassItem 
          classNameArr={this.classNameArr} 
          selectedIndex={this.state.selectedIndex} 
          click={(i) => {this.classNameClick(i)}}
        />

        <CodeHtmlDom 
          codeHtmlOrder={this.state.codeHtmlOrder} 
          codeStr={this.state.codeStr} 
          htmlStr={this.htmlStr} 
        />

        <BotBtn 
          tipNum={this.state.tipNum}
          handleShowTip={() => this.handleShowTip()}
          handleReset={() => this.handleReset()} 
          handleCodeHtmlChange={() => this.handleCodeHtmlChange()} 
          handelShowGameInfo={() => this.handelShowGameInfo()} 
        />

        <Start 
          isStart={this.state.isStart} 
          click={() => this.handleStart()} 
        />

        <Win 
          win={this.state.win} 
          times={this.state.times} 
          handelCloseWin={() => this.handelCloseWin()} 
          handelChallenge={() => this.handelChallenge()} 
          handelNextGame={() => this.handelNextGame()} 
        />

        <Tip 
          tipNum={this.state.tipNum} 
          code={this.codeObjData} 
          closeTip={() => this.handelCloseTip()} 
        />

        <Info 
          toggleGameInfoModal={this.state.toggleGameInfoModal} 
          closeModal={() => this.handelCloseGameInfoModal()} 
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
