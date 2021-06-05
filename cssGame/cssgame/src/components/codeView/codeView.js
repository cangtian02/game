import React from 'react';
import './codeView.css';
import '../../assets/atom-one-dark.css';
import Utils from '../../common/Utils';

class CodeView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabActive: 0,
      view: props.view,
      html: props.html,
      code: '',
    }
  }

  componentDidMount() {
    this.tranCode();
  }

  tranCode() {
    this.setState({
      code: Utils.tranCode(this.props.code),
    }, () => {
      if (window.hljs) {
        window.hljs.highlightBlock(document.getElementsByClassName('codeView-html-hljs')[0]);
        window.hljs.highlightBlock(document.getElementsByClassName('codeView-css-hljs')[0]);
      }
    });
  }

  tabClick(i) {
    this.setState({
      tabActive: i,
    });
  }

  render() {
    if (!this.state.html && !this.state.code) return null;

    return (
      <div className="codeView">
        <div className="codeView-tab">
          <div className={this.state.tabActive === 0 ? 'active' : ''} onClick={() => {this.tabClick(0)}}>view</div>
          <div className={this.state.tabActive === 1 ? 'active' : ''} onClick={() => {this.tabClick(1)}}>html</div>
          <div className={this.state.tabActive === 2 ? 'active' : ''} onClick={() => {this.tabClick(2)}}>css</div>
        </div>
        <div className="codeView-content">
          <div className={'codeView-tab-content' + (this.state.tabActive === 0 ? '' : ' none')}>
            <div dangerouslySetInnerHTML={{__html: this.state.view}}></div>
          </div>
          <div className={'codeView-tab-content' + (this.state.tabActive === 1 ? '' : ' none')}>
            <pre>
              <code className="hljs codeView-html-hljs">{this.state.html}</code>
            </pre>
          </div>
          <div className={'codeView-tab-content' + (this.state.tabActive === 2 ? '' : ' none')}>
            <pre>
              <code className="hljs codeView-css-hljs" dangerouslySetInnerHTML={{__html: this.state.code}}></code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default CodeView;
