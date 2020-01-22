import React from 'react';
import { IStoneStatus, IStonePos } from 'src/interfaces';
// import { dispatch } from 'src/store';
import { BoardAction } from 'src/reducers/board_action';

const style = require('./cell_component.scss');

interface IProps {
  stone: IStoneStatus;
  pos: IStonePos;
  disable: boolean;
}

/** オセロの石1つに対応するコンポーネントです */
export const CellComponent = (_props: IProps) => {
  const axisY: number = _props.pos.y;
  const axisX: number = _props.pos.x;

  const handleAdd = () => {
    if (_props.disable) return;

    BoardAction.add(axisY, axisX);
  };

  const colorstr: string = _props.stone ? _props.stone : 'transparent';

  const color = {
    backgroundColor: colorstr,
  };

  return (
    <li onClick={handleAdd} className={_props.disable ? `${style.disable}` : ''}>
      <span className={style.cell} style={color}>{`${axisY}：${axisX}`}</span>
    </li>
  );
};
