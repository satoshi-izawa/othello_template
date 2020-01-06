import { dispatch } from 'src/store';
import { BoardActionType } from 'src/reducers/board_reducer';

const action = {
  /** 石を追加するアクション */
  add: (x: number, y: number) => dispatch({
    type: BoardActionType.ADD,
    x,
    y,
  }),
};

export {
  action as BoardAction,
};
