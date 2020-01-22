import { dispatch } from 'src/store';
import { BoardActionType } from 'src/reducers/board_reducer';

const action = {
  /** 石を追加するアクション */
  add: (y: number, x: number) => dispatch({
    type: BoardActionType.ADD,
    y,
    x,
  }),
  /** ターン交代 */
  changeTurn: () => dispatch({
    type: BoardActionType.CHANGE_TURN,
    test: true,
  }),
};

export {
  action as BoardAction,
};
