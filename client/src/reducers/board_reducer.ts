import { IActionsConverter } from 'src/interfaces';

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
      return {
        ...state,
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
