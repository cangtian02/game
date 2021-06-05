import React from 'react';
import './mask.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMaskFlag } from '../../redux/actions/index';

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

class Mask extends React.Component {
  constructor() {
    super();

    this.state = {
      maskFlag: false,
      className: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.maskFlag) {
      this.setState({
        maskFlag: true,
      });

      setTimeout(() => {
        this.setState({
          className: ' active',
        });
      }, 100);

      document.getElementsByClassName('app')[0].setAttribute('class', 'app hidden');
    } else {
      this.setState({
        className: ' hide',
      });

      setTimeout(() => {
        this.setState({
          maskFlag: false,
          className: '',
        });

        document.getElementsByClassName('app')[0].setAttribute('class', 'app');
      }, 400);
    }
  }

  render() {
    if (!this.state.maskFlag) return null;

    return <div className={'g-mask' + this.state.className}></div>;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Mask);
