import React from 'react';
import './botBtn.css';

export default (props) => {
  return (
    <div className="game-btns">
      <div className={props.tipNum === 0 ? 'disable' : ''} onClick={() => props.handleTip()}>提示({props.tipNum})</div>
      <div onClick={() => props.handleReset()}>重置</div>
      <div onClick={() => props.handleChange()}>切换</div>
      <em onClick={() => props.handelShowGameInfo()}>?</em>
    </div>
  );
}
