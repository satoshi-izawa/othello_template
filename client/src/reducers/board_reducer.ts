import { IActionsConverter, IStoneStatus, ITurn } from 'src/interfaces';

/** アクションの種類 */
class Type {
  static readonly ADD = Symbol('ADD');
}

/** 座標 */
interface ICoordinate {
  x: number;
  y: number;
}


/** 初期状態 */
const createInitialState = () => ({
  boardState: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, 'black', 'white', null, null, null],
    [null, null, null, 'white', 'black', null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ] as IStoneStatus[][],
  turn: 'black' as ITurn,
});

type IState = ReturnType<typeof createInitialState>;

/** 各アクション毎のパラメータ。IActionsConverterを経由して、定型的なオブジェクトの形に変換されます。 */
interface IActions {
  [Type.ADD]: ICoordinate;
}

type IAction = IActionsConverter<IActions>;

/**
 * アクションの種類ごとの状態変化を記載してください。
 * stateを更新する場合、必ず非破壊的してください。
 */
const reducer = (state = createInitialState(), action: IAction) => {
  switch (action.type) {
    case Type.ADD: {
      // 置いた位置
      const Y = action.y;
      const X = action.x;

      // 置いたユーザー
      const selfTurn: ITurn = state.turn;

      // 敵
      const enemyTurn: ITurn = selfTurn === 'black' ? 'white' : 'black';

      // 置く
      const copyBoard = state.boardState.slice();
      copyBoard[Y][X] = state.turn;


      // ひっくり返す
      // 上方向
      for (let cnt = 1; cnt < Y; cnt += 1) {
        if (copyBoard[Y - cnt][X] === selfTurn) {
          for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
            if (copyBoard[Y - cnt2][X] === null) break;
            copyBoard[Y - cnt2][X] = selfTurn;
          }
          break;
        }
      }
      // 下方向
      for (let cnt = 1; cnt < 8 - Y; cnt += 1) {
        if (copyBoard[Y + cnt][X] === selfTurn) {
          for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
            if (copyBoard[Y + cnt2][X] === null) break;
            copyBoard[Y + cnt2][X] = selfTurn;
          }
          break;
        }
      }
      // 右方向
      for (let cnt = 1; cnt < 8 - X; cnt += 1) {
        if (copyBoard[Y][X + cnt] === selfTurn) {
          for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
            if (copyBoard[Y][X + cnt2] === null) break;
            copyBoard[Y][X + cnt2] = selfTurn;
          }
          break;
        }
      }
      // 左方向
      for (let cnt = 1; cnt < X; cnt += 1) {
        if (copyBoard[Y][X - cnt] === selfTurn) {
          for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
            if (copyBoard[Y][X - cnt2] === null) break;
            copyBoard[Y][X - cnt2] = selfTurn;
          }
          break;
        }
      }
      // 左上
      for (let cnt = 1; cnt < 7; cnt += 1) {
        if (copyBoard[Y - cnt] && copyBoard[Y - cnt][X - cnt]) {
          if (copyBoard[Y - cnt][X - cnt] === selfTurn) {
            for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
              if (copyBoard[Y - cnt2][X - cnt2] === null) break;
              copyBoard[Y - cnt2][X - cnt2] = selfTurn;
            }
            break;
          }
        }
      }
      // 右上
      for (let cnt = 1; cnt < 7; cnt += 1) {
        if (copyBoard[Y - cnt] && copyBoard[Y - cnt][X + cnt]) {
          if (copyBoard[Y - cnt][X + cnt] === selfTurn) {
            for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
              if (copyBoard[Y - cnt2][X + cnt2] === null) break;
              copyBoard[Y - cnt2][X + cnt2] = selfTurn;
            }
            break;
          }
        }
      }
      // 左下
      for (let cnt = 1; cnt < 7; cnt += 1) {
        if (copyBoard[Y + cnt] && copyBoard[Y + cnt][X - cnt]) {
          if (copyBoard[Y + cnt][X - cnt] === selfTurn) {
            for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
              if (copyBoard[Y + cnt2][X - cnt2] === null) break;
              copyBoard[Y + cnt2][X - cnt2] = selfTurn;
            }
            break;
          }
        }
      }
      // 右下
      for (let cnt = 1; cnt < 7; cnt += 1) {
        if (copyBoard[Y + cnt] && copyBoard[Y + cnt][X + cnt]) {
          if (copyBoard[Y + cnt][X + cnt] === selfTurn) {
            for (let cnt2 = 1; cnt2 < cnt; cnt2 += 1) {
              if (copyBoard[Y + cnt2][X + cnt2] === null) break;
              copyBoard[Y + cnt2][X + cnt2] = selfTurn;
            }
            break;
          }
        }
      }

      return {
        ...state,
        turn: enemyTurn,
      };
    }
  }
  return state;
};

export {
  reducer as BoardReducer,
  Type as BoardActionType,
  IState as BoardState,
};
