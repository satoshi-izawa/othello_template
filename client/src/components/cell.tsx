import React from 'react';
import { IStoneStatus, IStonePos } from 'src/interfaces';
import { BoardAction } from 'src/reducers/board_action';

const style = require('./scss/cell.scss');

interface IProps {
  stone: IStoneStatus;
  pos: IStonePos;
  disable: boolean;
}

/** オセロの石1つに対応するコンポーネントです */
export const CellComponent = (props: IProps) => {
  const { stone, pos, disable } = props;
  const { y, x } = pos;

  const handleAdd = () => {
    if (disable) return;

    BoardAction.add(y, x);
  };

  const colorstr: string = stone || '';
  const disableClassName = disable ? style.disable : '';

  return (
    <li onClick={handleAdd} className={`${style.cells} ${disableClassName}`}>
      <span className={`${style.cell} ${style[colorstr]}`}>{`${y}：${x}`}</span>
    </li>
  );
};
