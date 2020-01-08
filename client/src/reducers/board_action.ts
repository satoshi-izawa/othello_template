import { dispatch } from 'src/store';
import { BoardActionType } from 'src/reducers/board_reducer';
import { IStoneStatus } from 'src/interfaces';

const action = {
  /** 石を追加するアクション */
  add: (x: number, y: number, stone: IStoneStatus) => dispatch({
    type: BoardActionType.ADD,
    x,
    y,
    stone,
  }),
  changeTurn: () => dispatch({
    type: BoardActionType.CHANGE_TURN,
  }),
};

export {
  action as BoardAction,
};
