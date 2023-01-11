
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
export type IRecord = Record<'a' | 100, any>;

{
  let x: IRecord = {
    a: 'a value',
    100: 'ok',
  };

  console.log(x);
}


// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
export type IPartial = Partial<IRecord>;

{
  let x: IPartial = {
    a: 'a value'
  };
  console.log(x);
}

