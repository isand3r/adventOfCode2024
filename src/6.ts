const input = await Deno.readTextFile('./src/6.txt');
const matrix = input.split('\n').map(i => i.split(''));
const UP = '^';
const RIGHT = '>';
const DOWN = 'v';
const LEFT = '<'
const DIRECTIONS = [ UP, RIGHT, LEFT, DOWN ];
const OBSTACLE = '#';
const CLEAR = '.';
type Guard = {
  x: number;
  y: number;
  direction: string;
  visited: {x: number, y: number}[];
}
const guard: Guard = { x: 0, y: 0, direction: '^', visited: []};

// part 1
const isGuard = (char: string): boolean => DIRECTIONS.includes(char);
const isClear = (char: string): boolean => char !== OBSTACLE && char === CLEAR;
const isNextClear = (): boolean => {
  const { y, x, direction } = guard;
  if(direction === UP) return isClear(matrix[y-1][x]);
  if(direction === RIGHT) return isClear(matrix[y][x+1]);
  if(direction === DOWN) return isClear(matrix[y+1][x]);
  if(direction === LEFT) return isClear(matrix[y][x-1]);
  return false;
}
const initGuard = () => {
  for(let y = 0; y < matrix.length; y ++) {
    for(let x = 0; x < matrix[0].length; x ++) {
      if(isGuard(matrix[y][x])) {
        guard.x = x;
        guard.y = y;
        guard.direction = matrix[y][x];
      }
    }
  }
};
const moveLeft = (): void => { guard.x -= 1 };
const moveRight = (): void => { guard.x += 1 };
const moveUp = (): void => { guard.y -= 1 };
const moveDown = (): void => { guard.y += 1 };
const turnRight = (): void => {
  const { direction } = guard;
  if(direction === UP) guard.direction = RIGHT;
  if(direction === RIGHT) guard.direction = DOWN;
  if(direction === DOWN) guard.direction = LEFT;
  if(direction === LEFT) guard.direction = UP;
};

// find and set initial Guard state
initGuard();
console.log('INITIAL', guard);

while(1) {
  const {x, y, direction } = guard;
  if(guard.visited.filter(l => l.x === x && l.y === y).length === 0) guard.visited.push({x,y});
  if(direction === UP) {
    if(y === 0) break;
    if(isNextClear()) {
      moveUp()
    } else {
      turnRight();
    };
  } else if(direction === RIGHT) {
    if(x === matrix[0].length) break;
    if(isNextClear()) {
      moveRight()
    } else {
      turnRight();
    };
  } else if(direction === DOWN) {
    if(y === matrix.length) break;
    if(isNextClear()) {
      moveDown();
    } else {
      turnRight();
    };
  } else if(direction === LEFT) {
    if(x === 0) break;
    if(isNextClear()) {
      moveLeft();
    } else {
      turnRight();
    };
  } else {
    console.error('invalid direction - cowardly dying :(', { guard });
    break;
  }
}
console.log('FINAL', { x: guard.x, y: guard.y, direction: guard.direction, visited: guard.visited.length });

// part 2
const isLoop = () => {};