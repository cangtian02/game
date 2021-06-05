import React from 'react';
import './win.css';
 
class Win extends React.Component {
  constructor() {
    super();
  
    this.state = {
      toggle: false,
    }
  }

  componentDidMount() {
    if (this.props.win) {
      this.setState({
        toggle: true,
      });
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.win !== this.props.win) {
      this.setState({
        toggle: nextProps.win,
      });
    }
  }

  handelClick(type) {
    this.setState({
      toggle: false,
    });
    type === 1 ? this.props.handelCloseWin() : type === 2 ? this.props.handelChallenge() : this.props.handelNextGame();
  }

  render() {
    if (!this.props.win || !this.state.toggle) return null;
  
    return (
      <div className="game-win">
        <div className="game-win-text">恭喜，闯关成功</div>
        <div className="game-win-time">用时：{this.props.times}s</div>
        <div className="game-win-btns">
          <div onClick={() => this.handelClick(1)}>关闭</div>
          <div onClick={() => this.handelClick(2)}>挑战自己</div>
          <div onClick={() => this.handelClick(3)}>下一关</div>
        </div>
      </div>
    );
  }      
}
    
export default Win;