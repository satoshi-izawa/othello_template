import React from 'react';
import { Reducers } from 'src/store';
import { connect } from 'react-redux';
import { CellComponent } from 'src/components/cell_component';

const style = require('./board_component.scss');

const distributeState = ({ Board }: Reducers) => ({ Board });
type IProps = ReturnType<typeof distributeState>;

/** 盤面全体を管理するコンテナコンポーネント */
const BoardComponent = (_props: IProps) => (
  <div className={style.root}>
    <CellComponent stone="white" />
    <CellComponent stone="black" />
  </div>
);

export const BoardContainer = connect(distributeState)(BoardComponent);
