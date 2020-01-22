import { IActionsConverter, IStoneStatus, ITurn } from 'src/interfaces';

/** アクションの種類 */
class Type {
  static readonly ADD = Symbol('ADD');
  static readonly CHANGE_TURN = Symbol('CHANGE_TURN');
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
  [Type.CHANGE_TURN]: { test: boolean };
}

type IAction = IActionsConverter<IActions>;

/**
 * アクションの種類ごとの状態変化を記載してください。
 * stateを更新する場合、必ず非破壊的してください。
 */
const reducer = (state = createInitialState(), action: IAction) => {
  switch (action.type) {
    case Type.ADD: {
      // 置く
      const copy = state.boardState.slice();
      copy[action.y][action.x] = state.turn;

      // ターン交代
      const userTurn: ITurn = state.turn === 'black' ? 'white' : 'black';

      return {
        ...state,
        turn: userTurn,
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
