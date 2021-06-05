import React from 'react';
import { withRouter } from 'react-router-dom';
import './list.css';
import img from '../../../assets/img.jpg';

function Item(props) {
  let dom = [];

  props.list.forEach((val, i) => {
    dom.push(
      <div className="item-list" key={i} onClick={() => {props.click(i)}}>
        <h2 className="clamp2">{val.name}</h2>
        <img src={val.img} alt={val.name} />
        <p>已闯关：{val.num || 0}人&nbsp;&nbsp;&nbsp;{val.date > 0 ? '最短时间：' + val.date + '秒' : ''}</p>
      </div>
    );
  });

  return dom;
}

function NoList() {
  return (
    <div className="nolist">还没有题哦，欢迎提供题库~<br />提供题库请发邮件至：cangtian02@163.com</div>
  );
}

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      grade: props.grade,
      list: [],
    }
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.grade !== this.state.grade) {
      this.setState({
        grade: nextProps.grade
      }, () => {
        this.getList();
      });
    }
  }

  getList() {
    let arr = [];

    if (this.state.grade !== 4) {
      for (let i = 0; i < this.state.grade; i++) {
        arr.push({
          id: 1,
          img: img,
          name: 'flex的日常使用',
          num: 100,
          date: 30,
        });
      }
    }
    
    this.setState({
      list: arr
    });
  }

  itemClick(i) {
    this.props.history.push('/detail/' + this.state.list[i].id);
  }

  render() {
    return (
      <div className="item-list-box">
        {
          this.state.list.length === 0
          ?
          <NoList />
          :
          <Item list={this.state.list} click={i => this.itemClick(i)} />
        }
      </div>
    );
  }
}

export default withRouter(List);
