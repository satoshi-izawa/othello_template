import React, { useCallback } from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';
import { IStoneStatus, IStonePos } from 'src/interfaces';
import { Header } from 'src/components/header';
import { CellComponent } from 'src/components/cell';

const style = require('./scss/board.scss');

const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

/** 盤面全体を管理するコンテナコンポーネント */
const BoardComponent = (props: IProps) => {
  const { Board } = props;
  // ボードの状態、自身のターン
  const { boardState: board, turn: self } = Board;
  // 敵
  const enemy = self === 'black' ? 'white' : 'black';

  // 石が置けるかどうかチェック true=置けない、false=置ける

  const disableCellCheck = useCallback(
    (pos: IStonePos) => {
      // 自身に石があったら置けない
      if (board[pos.y][pos.x] !== null) return true;

      // ボード上か(隣接が敵か、直線上に自分がいるか、自分までにnullが無いか)
      // 上
      for (let cnt = 0; cnt < pos.y; cnt += 1) {
        if (board[pos.y - cnt]) {
          if (board[pos.y - 1][pos.x] === enemy && board[pos.y - cnt][pos.x] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              console.log(`${pos.y}:${pos.x}が${pos.y - cnt2}:${pos.x} = ${board[pos.y - cnt2][pos.x]}`);
              if (board[pos.y - cnt2][pos.x] === null) break;
              if (board[pos.y - cnt2][pos.x] === self) {
                console.log(`${pos.y}:${pos.x} 上: OK`);
                return false;
              }
            }
          }
        }
      }
      // 下
      for (let cnt = 0; cnt < 7 - pos.y; cnt += 1) {
        if (board[pos.y + cnt]) {
          if (board[pos.y + 1][pos.x] === enemy && board[pos.y + cnt][pos.x] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y + cnt2][pos.x] === null) break;
              if (board[pos.y + cnt2][pos.x] === self) {
                console.log(`${pos.y}:${pos.x} 下: OK`);
                return false;
              }
            }
          }
        }
      }
      // 左
      for (let cnt = 0; cnt < pos.x; cnt += 1) {
        if (board[pos.x - cnt]) {
          if (board[pos.y][pos.x - 1] === enemy && board[pos.y][pos.x - cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y][pos.x - cnt2] === null) break;
              if (board[pos.y][pos.x - cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 左: OK`);
                return false;
              }
            }
          }
        }
      }
      // 右
      for (let cnt = 0; cnt < 7 - pos.x; cnt += 1) {
        if (board[pos.x + cnt]) {
          if (board[pos.y][pos.x + 1] === enemy && board[pos.y][pos.x + cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y][pos.x + cnt2] === null) break;
              if (board[pos.y][pos.x + cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 右: OK`);
                return false;
              }
            }
          }
        }
      }
      // 左上
      for (let cnt = 0; cnt < 8; cnt += 1) {
        if (board[pos.y - cnt] && board[pos.y - cnt][pos.x - cnt]) {
          if (board[pos.y - 1][pos.x - 1] === enemy && board[pos.y - cnt][pos.x - cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y - cnt2][pos.x - cnt2] === null) break;
              if (board[pos.y - cnt2][pos.x - cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 左上: OK`);
                return false;
              }
            }
          }
        }
      }
      // 左下
      for (let cnt = 0; cnt < 8; cnt += 1) {
        if (board[pos.y + cnt] && board[pos.y + cnt][pos.x - cnt]) {
          if (board[pos.y + 1][pos.x - 1] === enemy && board[pos.y + cnt][pos.x - cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y + cnt2][pos.x - cnt2] === null) break;
              if (board[pos.y + cnt2][pos.x - cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 左下: OK`);
                return false;
              }
            }
          }
        }
      }
      // 右下
      for (let cnt = 0; cnt < 8; cnt += 1) {
        if (board[pos.y + cnt] && board[pos.y + cnt][pos.x + cnt]) {
          if (board[pos.y + 1][pos.x + 1] === enemy && board[pos.y + cnt][pos.x + cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y + cnt2][pos.x - cnt2] === null) break;
              if (board[pos.y + cnt2][pos.x - cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 右下: OK`);
                return false;
              }
            }
          }
        }
      }
      // 右上
      for (let cnt = 0; cnt < 8; cnt += 1) {
        if (board[pos.y - cnt] && board[pos.y - cnt][pos.x + cnt]) {
          if (board[pos.y - 1][pos.x + 1] === enemy && board[pos.y - cnt][pos.x + cnt] === self) {
            for (let cnt2 = 2; cnt2 < cnt + 1; cnt2 += 1) {
              if (board[pos.y - cnt2][pos.x - cnt2] === null) break;
              if (board[pos.y - cnt2][pos.x - cnt2] === self) {
                console.log(`${pos.y}:${pos.x} 右上: OK`);
                return false;
              }
            }
          }
        }
      }

      return true;
    }, [Board],
  );

  return (
    <>
      <Header />

      <ul className={style.board}>
        {
          board.map((items: IStoneStatus[], i: number) => items.map((item: IStoneStatus, i2: number) => {
            const disable: boolean = disableCellCheck({ x: i2, y: i });
            const key = `${i}-${i2}`;

            return <CellComponent stone={item} pos={{ x: i2, y: i }} disable={disable} key={key} />;
          }))
        }
      </ul>
    </>
  );
};
export const BoardContainer = connect(distributeState)(BoardComponent);
