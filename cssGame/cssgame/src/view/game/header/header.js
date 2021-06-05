import React from 'react';
import './header.css';

export default (props) => {
  return (
    <div className="game-header">
      <div className="l">
        <h1 className="game-name">{props.info.name}</h1>
        <p className="game-des">
          难度等级：{props.info.grade}&nbsp;&nbsp;已闯关：{(props.info.num > 999 ? '999+' : props.info.num) || 0}人&nbsp;&nbsp;{props.info.date > 0 ? '最短时间：' + props.info.date + '秒' : ''}
        </p>
      </div>
      <div className={'r ' + (props.times > 0 && !props.win ? 'tran' : '')}><p>{props.times}s</p></div>
    </div>
  );
}
