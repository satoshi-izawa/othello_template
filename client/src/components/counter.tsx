import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';
import { IStoneStatus } from 'src/interfaces';

const style = require('./scss/counter.scss');

const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState> & { user: IStoneStatus };

/** カウンターを管理するコンポーネント */
const CounterComponent2 = (props: IProps) => {
  const { Board, user: self } = props;
  const { boardState: board } = Board;

  // ２次元配列をフラットに
  const boardFlat = board.reduce((flat, val) => flat.concat(val), []);

  // セルのカウンター
  const cellCounter = (type: IStoneStatus) => boardFlat.filter(val => val === type).length;

  // 自身の色の数
  const myCellCounter = cellCounter(self);

  // 結果
  const result = () => {
    if (cellCounter(null) === 0) {
      if (boardFlat.length / 2 < myCellCounter) {
        return '勝利';
      }
      return '敗北';
    }
    return null;
  };

  return (
    <>
      <p className={style.box}>
        {self}
        :
        <span>{myCellCounter}</span>
        {result()}
      </p>
    </>
  );
};
export const CounterComponent = connect(distributeState)(CounterComponent2);
