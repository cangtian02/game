import React from 'react';
import './item.css';

export const GrirdItem = (props) => {
  let dom = [];
  let selected = props.selected;

  props.gridArr.forEach((val, i) => {
    let className = val.length > 20 ? 'small' : '';

    for (let j = 0, len = selected.length; j < len; j++) {
      if (selected[j].val === val && i === selected[j].index) {
        className = ' active';

        if (!props.canClick && (j === len - 2 || j === len - 1)) {
          className = ' error';
        }
      }
    }

    dom.push(<li key={i} className="game-grird-item"><div className={className} onClick={() => { props.click(i) }}><p>{val}</p></div></li>);
  });

  return (
    <div className="grid-box">
      <div className="grid-wrap">
        {dom}
        {props.selectedStepWin[props.selectedIndex] === 1 ? <div className="grid-item-win">已完成</div> : null}
      </div>
    </div>
  );
}

export const ClassItem = (props) => {
  let dom = [];
  props.classNameArr.forEach((val, i) => {
    dom.push(<li key={i} className={'class-item-li ' + (i === props.selectedIndex ? 'active' : '')} onClick={() => { props.click(i) }}>{val}</li>);
  });

  return (
    <div className="class-item">
      <ul className="class-item-ul">
        {dom}
      </ul>
    </div>
  );
}
