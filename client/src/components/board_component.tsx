import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';
import { IStoneStatus, IStonePos } from 'src/interfaces';
import { UserComponent } from 'src/components/user_component';
import { CellComponent } from 'src/components/cell_component';

const style = require('./board_component.scss');

const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

/** 盤面全体を管理するコンテナコンポーネント */
const BoardComponent = (_props: IProps) => {
  // 石が置けるかどうかチェック
  const disableCellCheck = (pos: IStonePos) => {
    // 自身
    const board = _props.Board.boardState;
    const enemy = _props.Board.turn === 'black' ? 'white' : 'black';

    if (board[pos.y][pos.x] !== null) return true;

    // 上の確認
    for (let yy = pos.y; yy > 0; yy -= 1) {
      if (board[pos.y - 1][pos.x] === enemy) return false;
    }
    // 下の確認
    for (let yy = pos.y; yy < 7; yy += 1) {
      if (board[pos.y + 1][pos.x] === enemy) return false;
    }
    // 右の確認
    for (let xx = pos.y; xx > 0; xx -= 1) {
      if (board[pos.y][pos.x - 1] === enemy) return false;
    }
    // 左の確認
    for (let xx = pos.y; xx < 7; xx += 1) {
      if (board[pos.y][pos.x + 1] === enemy) return false;
    }

    // 斜めの確認
    // let count = 0;
    // while (count < 7) {
    //   if (board[pos.y - count] && board[pos.y - count]) {

    //   }
    //   count += 1;
    // }

    return true;
  };

  return (
    <div>
      <UserComponent />

      <ul className={style.board}>
        {
          _props.Board.boardState.map((items: IStoneStatus[], i: number) => items.map((item: IStoneStatus, i2: number) => {
            const disable: boolean = disableCellCheck({ x: i2, y: i });
            const key = `${i}-${i2}`;

            return <CellComponent stone={item} pos={{ x: i2, y: i }} disable={disable} key={key} />;
          }))
        }
      </ul>
    </div>
  );
};
export const BoardContainer = connect(distributeState)(BoardComponent);
