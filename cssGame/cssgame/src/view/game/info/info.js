import React from 'react';
import './info.css';

class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      toggle: false,
      aniClass: '',
      info: '<p>在9宫格中，按照css的key: value键值对形式来选择，选择项为9宫格下class item相对应的css属性，所以在闯关前一定要熟读题目源码。</p><p>9宫格下面的class item可以手动切换，切换后就可以选择该class下相对应的css属性，当一个class的css选择完毕会自动跳到下一个未选择完毕的class，然后直至全部选择完毕，完成闯关。</p><p>在选择时，点击小方块没有任何反应，那么说明你选择的是value而不是key。在选择key后再选择value，出现选择的两个方块背景变红，然后回到正常状态，说明选择的是错误项。</p><p>在class item模块下方是选择的属性展示块和结果实时展示块，这两个块可点击下方切换按钮切换上下层级。</p><p>底部按钮：点击提示按钮会弹出源码提示框，可手动关闭，不手动关闭将在5秒后自动关闭，提示次数最多3次。点击重置按钮，会重置全部选择项和倒计时，重新开始，提示次数也会重置回3次。点击切换按钮，切换属性展示块和结果实时展示块上下层级。点击问号按钮，弹出游戏玩法介绍弹框。</p>'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggleGameInfoModal && !this.state.toggle) {
      this.setState({
        toggle: true,
        aniClass: '',
      });

      setTimeout(() => {
        this.setState({
          aniClass: 'show',
        });
      }, 20);
    }
  }

  handelClose() {
    this.setState({
      aniClass: 'hide',
    });
    setTimeout(() => {
      this.setState({
        toggle: false,
      });
      this.props.closeModal();
    }, 200);
  }

  render() {
    if (!this.state.toggle) return null;

    return (
      <div className={'game-info ' + this.state.aniClass}>
        <div className="game-info-title">玩法介绍</div>
        <div className="game-info-content" dangerouslySetInnerHTML={{__html: this.state.info}}></div>
        <div className="game-info-btn" onClick={() => this.handelClose()}>关闭</div>
      </div>
    );
  }
}

export default Info;