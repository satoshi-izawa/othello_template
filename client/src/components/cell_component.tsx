import React from 'react';
import { IStoneStatus } from 'src/interfaces';

const style = require('./cell_component.scss');

interface IProps {
  stone: IStoneStatus;
}

/** オセロの石1つに対応するコンポーネントです */
export const CellComponent = (_props: IProps) => (
  <div className={style.root}>
    Hello, World!
  </div>
);
