import React from 'react';
import './tip.css';
import Utils from '../../../common/Utils';

class Tip extends React.Component {
  constructor() {
    super();

    this.state = {
      code: '',
      time: 5,
      toggle: false,
      tipClass: '',
    }
  }

  tranCode() {
    this.setState({
      code: Utils.tranCode(this.props.code),
    }, () => {
      if (window.hljs) {
        window.hljs.highlightBlock(document.getElementsByClassName('codeTip-hljs')[0]);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tipNum < this.props.tipNum) {
      this.setState({
        toggle: true,
        tipClass: '',
        time: 5,
      });

      setTimeout(() => {
        if (this.state.code === '') {
          this.tranCode();
        }
        this.setState({
          tipClass: 'show',
        });
      }, 20);

      this.timer = setInterval(() => {
        if (this.state.time === 1) {
          this.handelClose();
        }
        let t = this.state.time;
        t--;
        this.setState({
          time: t,
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  handelClose() {
    clearInterval(this.timer);
    this.setState({
      tipClass: 'hide',
    });
    setTimeout(() => {
      this.setState({
        toggle: false,
      });
      this.props.closeTip();
    }, 200);
  }

  render() {
    if (!this.state.toggle) return null;

    return (
      <div className={'game-tip ' + this.state.tipClass}>
        <div className="game-tip-time">倒计时：{this.state.time}</div>
        <div className="game-tip-code">
          <pre>
            <code className="hljs codeTip-hljs" dangerouslySetInnerHTML={{ __html: this.state.code }}></code>
          </pre>
        </div>
        <div className="game-tip-btn" onClick={() => this.handelClose()}>关闭</div>
      </div>
    );
  }
}

export default Tip;