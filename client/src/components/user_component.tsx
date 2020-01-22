import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';


const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

/** ユーザーを管理するコンテナコンポーネント */
const UserComponent2 = (_props: IProps) =>
  // console.log(_props.Board.turn);

  (
    <p>
      Your Turn:「
      {_props.Board.turn}
      」
    </p>
  );
export const UserComponent = connect(distributeState)(UserComponent2);
