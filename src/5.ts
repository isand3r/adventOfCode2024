const input = await Deno.readTextFile('./src/5.txt');
const [ord, pg] = input.split('\n\n');
const ruleSets = ord.split('\n').map(i => i.split('|'));
const updates = pg.split('\n').map(i => i.split(','));
let sum: number = 0;
let fixedSum: number = 0;

// part 1
const ruleEval = (update: string[], rule: string[]): boolean => {
  if(update.includes(rule[0]) && update.includes(rule[1])) {
    if(update.indexOf(rule[0]) > update.indexOf(rule[1]))
      return false;
  }
  return true;
};

const checkPageOrder = (update: string[]): boolean => {
  const checks: boolean[] = ruleSets.map(rule => ruleEval(update, rule));
  if(checks.includes(false)) return false;
  return true;
};

// part 2
const fixOrder = (update: string[]): string[] => {
  let updateCopy = update;
  for(const rule of ruleSets) {
    if(update.includes(rule[0]) && update.includes(rule[1])) {

    }
  }
  return updateCopy;
};

// main loop
updates.forEach(u => {
  const valid = checkPageOrder(u);
  const middleIndex = (u.length - 1) / 2;
  if(valid) {
    sum += Number(u[middleIndex]);
  } else {
    const corrected = fixOrder(u);
    fixedSum += Number(corrected[middleIndex]);
  }
});

console.log({ sum, fixedSum });
