const fileContent = await Deno.readTextFile('./src/4.txt');
const input = fileContent.split('\n').map(row => row.split(''));

/**
  need to count:
  - forward row ---
  - reverse row ---
  - forward column |||
  - reverse column |||
  - forward LR diagonals \\\
  - reverse LR diagonals \\\
  - forward RL diagonals ///
  - reverse RL diagonals ///
 */

let count = 0;
const word = /XMAS/g;
const rowStrings: string[] = [];
const columnStrings: string[] = [];
const fDiagonalStrings: string[] = [];
const bDiagonalStrings: string[] = [];

const getMatchCount = (s: string) => {
  const [...forward] = s.matchAll(word);
  const [...reverse] = s.split('').reverse().join('').matchAll(word);
  return [forward.length, reverse.length];
};

const getfDiagonalString = (x: number, y: number) => {
  let string = '';
  if(x === 0 || y === 0) {
    let i: number = x;
    let j: number = y;
      while(i < input.length && j < input[i].length) {
        string += input[i][j];
        i++;
        j++;
      }
    }
  return string;
};

const getbDiagonalString = (x: number, y: number) => {
  let string = '';
  if(x === 0 || y === input[0].length - 1) {
    let i: number = x;
    let j: number = y;
    while(i < input.length && j >= 0) {
      string += input[i][j];
      i++;
      j--;
    }
  }
  return string;
};

for(let i = 0; i < input.length; i++) {
  const row = input[i];
  rowStrings.push(row.join(''));
  for(let j = 0; j < input[0].length; j++) {
    columnStrings[j] ? columnStrings[j] += row[j] : columnStrings.push(row[j]);
    const fDiag = getfDiagonalString(i, j);
    const bDiag = getbDiagonalString(i, j);
    if(fDiag) fDiagonalStrings.push(fDiag);
    if(bDiag) bDiagonalStrings.push(bDiag)
  }
}

const allStrings = [...rowStrings, ...columnStrings, ...fDiagonalStrings, ...bDiagonalStrings];
for(const s of allStrings) {
  const [forward, reverse] = getMatchCount(s);
  count += forward;
  count += reverse;
}

console.log({ count, col: columnStrings[0], fDiag: fDiagonalStrings[0], bDiag: bDiagonalStrings[input[0].length - 1] });
