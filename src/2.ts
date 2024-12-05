const fileContent = await Deno.readTextFile('./src/2.txt');
const input = fileContent
  .split('\n')
  .map(s => s.split(' ').map(n => Number(n)));

const isSafe = (report: number[]): 1 | 0 => {
  for(let i = 2; i < report.length; i++) {
    const a: number = report[i-2];
    const b: number = report[i-1];
    const c: number = report[i];
    const diffab: number = a - b;
    const diffbc: number = b - c;
    const asc = a < b && b < c;
    const desc = a > b && b > c;

    if(
      diffab === 0 ||
      diffbc === 0 ||
      Math.abs(diffab) > 3 ||
      Math.abs(diffbc) > 3 ||
      (!asc && !desc)
    ) return 0;
  }
  return 1;
};

// part 1
const safeCount = input.reduce((acc, row) => {
  return acc + isSafe(row);
}, 0)
console.log({safeCount});

// part 2
// brute force - if not safe, try every variation of the report
// with one number removed until it is
const delimitedSafeCount = input.reduce((acc, row) => {
  const safe = isSafe(row);
  if(!safe) {
    for(let i = 0; i < row.length; i++) {
      if(isSafe(row.toSpliced(i, 1)) === 1) return acc + 1;
    }
    return acc;
  }
  return acc + safe;
}, 0);
console.log({delimitedSafeCount});
