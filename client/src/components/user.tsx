import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';

const style = require('./scss/user.scss');


const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

/** ユーザーを管理するコンポーネント */
const UserComponent2 = (props: IProps) => {
  const { Board } = props;
  const { turn } = Board;

  return (
    <p className={style.name}>
      Your Turn
      <br />
      <span>{turn}</span>
    </p>
  );
};
export const UserComponent = connect(distributeState)(UserComponent2);
