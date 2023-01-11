const items = [
  { type: 'A', data: 'aa' },
  { type: 'B', data: 'bb' },
  { type: 'C', data: 'cc' },
  { type: 'D', data: 'd', special: true },
] as const;

type Type = typeof items[number]['type'];

const type: Type = 'A';

type Key = keyof typeof items[number];

const key: Key = 'data';

export default Type;