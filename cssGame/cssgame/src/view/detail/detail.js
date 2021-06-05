import React from 'react';
import './detail.css';
import { Link } from 'react-router-dom';
import CodeView from '../../components/codeView/codeView';

class Detail extends React.Component {

  constructor() {
    super();
    this.state = {
      info: '',
    }
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // let id = this.props.match.params.id;

    this.setState({
      info: {
        id: 1,
        name: 'flex的日常使用',
        grade: '中级',
        num: 100,
        date: 40,
        view: '<div class="flex-center" style="display: flex; width: 100px; height: 100px; justify-content: center; align-items: center; background: #73D9D9;"><div class="c" style="color: #fff;">hello world!</div></div>',
        html: '<div class="flex-center">\n  <div class="c">hello world!</div>\n</div>',
        code: '.flex-center {display: flex; width: 100px; height: 100px; justify-content: center; align-items: center; background: #73D9D9;} .c{color: #fff;}',
        content: 'Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。<br />任何一个容器都可以指定为Flex布局。'
      }
    });
  }

  render() {
    if (this.state.info === '') return null;

    let info = this.state.info;
    return (
      <div className="detail">
        <h1 className="datail-name">{info.name}</h1>
        <p className="datail-des">
          难度等级：{info.grade}&nbsp;&nbsp;&nbsp;已闯关：{info.num || 0}人&nbsp;&nbsp;&nbsp;{info.date > 0 ? '最短时间：' + info.date + '秒' : ''}
        </p>
        <div className="datail-codeView">
          <CodeView view={info.view} html={info.html}  code={info.code} />
        </div>
        <div className="detail-content" dangerouslySetInnerHTML={{ __html: this.state.info.content }}></div>
        <Link className="detail-btn" to={'/game/' + this.state.info.id}>去闯关</Link>
      </div>
    );
  }
}

export default Detail;
