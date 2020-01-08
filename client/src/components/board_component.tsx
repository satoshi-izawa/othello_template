import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';
import { CellComponent } from 'src/components/cell_component';
import { IStoneStatus } from 'src/interfaces';
import { BoardAction } from 'src/reducers/board_action';

const style = require('./board_component.scss');

const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

const getReverseStones = (x: number, y: number, turnStone: IStoneStatus, cells: IStoneStatus[][]) => {
  const targetStones = [];
  const reversedStone = (turnStone === 'black') ? 'white' : 'black';

  // 右側チェック
  for (let i = 0; i < 7 - x; i += 1) {
    if (i === 0) {
      if (cells[y][x + 1] !== reversedStone) break;
    }

    if (cells[y][x + i + 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x + j + 1, y]);
      }
      break;
    }
  }

  // 左側チェック
  for (let i = 0; i < x; i += 1) {
    if (i === 0) {
      if (cells[y][x - 1] !== reversedStone) break;
    }

    if (cells[y][x - i - 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x - j - 1, y]);
      }
      break;
    }
  }

  // 下側のチェック
  for (let i = 0; i < 7 - y; i += 1) {
    if (i === 0) {
      if (cells[y + 1][x] !== reversedStone) break;
    }

    if (cells[y + i + 1][x] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x, y + j + 1]);
      }
      break;
    }
  }

  // 上側のチェック
  for (let i = 0; i < y; i += 1) {
    if (i === 0) {
      if (cells[y - 1][x] !== reversedStone) break;
    }

    if (cells[y - i - 1][x] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x, y - j - 1]);
      }
      break;
    }
  }

  // 右上方向のチェック
  let d = (7 - x < y) ? 8 - x : y;
  for (let i = 0; i < d; i += 1) {
    if (i === 0) {
      if (cells[y - 1][x + 1] !== reversedStone) break;
    }

    if (cells[y - i - 1][x + i + 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x + j + 1, y - j - 1]);
      }
      break;
    }
  }

  // 左上方向のチェック
  d = (x < y) ? x : y;
  for (let i = 0; i < d; i += 1) {
    if (i === 0) {
      if (cells[y - 1][x - 1] !== reversedStone) break;
    }

    if (cells[y - i - 1][x - i - 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x - j - 1, y - j - 1]);
      }
      break;
    }
  }

  // 右下方向のチェック
  d = (7 - x < 7 - y) ? 7 - x : 7 - y;
  for (let i = 0; i < d; i += 1) {
    if (i === 0) {
      if (cells[y + 1][x + 1] !== reversedStone) break;
    }

    if (cells[y + i + 1][x + i + 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x + j + 1, y + j + 1]);
      }
      break;
    }
  }

  // 左下方向のチェック
  d = (x < 7 - y) ? x : 7 - y;
  for (let i = 0; i < d; i += 1) {
    if (i === 0) {
      if (cells[y + 1][x - 1] !== reversedStone) break;
    }

    if (cells[y + i + 1][x - i - 1] === turnStone) {
      for (let j = 0; j < i; j += 1) {
        targetStones.push([x - j - 1, y + j + 1]);
      }
      break;
    }
  }

  return targetStones;
};


/** 盤面全体を管理するコンテナコンポーネント */
const BoardComponent = (props: IProps) => {
  const { Board } = props;
  const { cells, blackIsNext } = Board;
  const turn = (blackIsNext) ? 'black' : 'white';

  const handleClick = React.useCallback((x: number, y: number) => {
    if (cells[y][x]) return;

    const targetStones = getReverseStones(x, y, turn, cells as IStoneStatus[][]);

    if (targetStones.length > 0) {
      BoardAction.add(x, y, turn);
      targetStones.map(m => BoardAction.add(m[0], m[1], turn));
      BoardAction.changeTurn();
    }
  }, [blackIsNext]);

  return (
    <div className={style.root}>
      <div>
        Turn:
        {turn}
      </div>
      <div className={style.board}>
        {cells.map((row, i) => row.map((stone, j) => <CellComponent stone={stone as IStoneStatus} x={j} y={i} onClick={handleClick} blackIsNext={blackIsNext} />))}
      </div>
    </div>
  );
};
export const BoardContainer = connect(distributeState)(BoardComponent);
