import React from 'react';
import { IStoneStatus } from 'src/interfaces';

const style = require('./cell_component.scss');

interface IProps {
  stone: IStoneStatus;
  x: number;
  y: number;
  blackIsNext: boolean;
  onClick: (x: number, y: number) => unknown;
}

/** オセロの石1つに対応するコンポーネントです */
export const CellComponent = (props: IProps) => {
  const {
    stone,
    x,
    y,
    onClick,
    blackIsNext,
  } = props;

  const handleClick = React.useCallback(() => { onClick(x, y); }, [blackIsNext]);
  const renderStone = () => {
    if (stone === 'black') {
      return <span className={style.cell_black} />;
    } if (stone === 'white') {
      return <span className={style.cell_white} />;
    }
    return <span />;
  };

  return (
    <div className={style.cell} onClick={handleClick}>
      [
      {y}
      ,
      {x}
      ]
      <br />
      {renderStone()}
    </div>
  );
};
