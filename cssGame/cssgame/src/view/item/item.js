import React from 'react';
import './item.css';
import List from './list/list';

function Tab(props) {
  let dom = [];

  props.tabData.forEach((val, i) => {
    dom.push(
      <div className={i === props.tabActive ? 'active' : ''} key={i} onClick={() => { props.click(i) }}>
        {val.name}
      </div>
    );
  });

  return (
    <div className="item-tab">{dom}</div>
  );
}

class Item extends React.Component {

  constructor() {
    super();

    this.state = {
      tabData: [{ grade: 1, name: '简单' }, { grade: 2, name: '中级' }, { grade: 3, name: '高级' }, { grade: 4, name: '大师' }],
      tabActive: 0,
    }
  }

  componentDidMount() {

  }

  tabClick(i) {
    this.setState({tabActive: i});
  }

  render() {
    return (
      <div className="item">
        <Tab tabData={this.state.tabData} tabActive={this.state.tabActive} click={i => this.tabClick(i)} />
        <List grade={this.state.tabData[this.state.tabActive].grade} />
      </div>
    );
  }
}

export default Item;
