/** セルに乗せられている石の状態です。白、黒、空き */
export type IStoneStatus = 'white' | 'black' | null;

/** セルの位置 */
export type IStonePos = {
  x: number;
  y: number;
};

/** ターン */
export type ITurn = 'white' | 'black';

/** 各reducer内のIActionsを元に、アクションの決まった形のオブジェクトへ変換します */
export type IActionsConverter<T> = {
  [P in keyof T]: { type: P } & T[P];
}[keyof T];
