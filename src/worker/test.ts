import { calc } from '../util/calc';
export { };

addEventListener('message', ({ data }: MessageEvent) => {
  // calc(2500_000_000);
  console.log('!!msg', data);
});


addEventListener('messageerror', (err) => {
  console.log('!!msgErr', err);
});


// setTimeout(() => {
//   throw new Error('Error');
// }, 5000);