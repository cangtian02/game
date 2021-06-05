import React from 'react';
import './start.css';
 
class Start extends React.Component {
  constructor() {
    super();
  
    this.state = {
      time: 3,
    }
  }

  componentDidMount() {
    if (!this.props.isStart) {
      this.init();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isStart) {
      this.init();
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  
  init() {
    this.timer = setInterval(() => {
      if (this.state.time === 1) {
        clearInterval(this.timer);
        this.props.click();
      }
      let t = this.state.time;
      t--;
      this.setState({
        time: t,
      });
    }, 1000);
  }

  handelStart() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
    });
    this.props.click();
  }

  render() {
    if (this.props.isStart) return null;
  
    return (
      <div className="game-start">
        <div className="game-start-time">{this.state.time}</div>
        <div className="game-start-btn" onClick={() => this.handelStart()}>开始闯关</div>
      </div>
    );
  }      
}
    
export default Start;