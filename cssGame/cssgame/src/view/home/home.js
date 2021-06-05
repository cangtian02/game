import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    // <NavLink activeClassName="active" to="/user">个人中心</NavLink>
    return (
      <div className="home">
        <div className="home-title">CSS 连连看</div>
        <div className="home-nav">
          <NavLink activeClassName="active" to="/item">题库刷题</NavLink>
          <NavLink activeClassName="active" to="/game/1">开始闯关</NavLink>
        </div>
        <p className="home-tips">提供题库请发邮件至：cangtian02@163.com</p>
      </div>
    );
  }
}

export default Home;
