import { promises as fs } from 'fs';

const INPUT_LOCATION = './src/2.txt';
const DATA_FORMAT = 'utf-8';
const ROW_DELIMITER = '\n';
const COLUMN_DELIMITER = ' ';

const checkSafety = (report: number[]): number => {
  // create a shift register, looks at chunks [ a b c ]
  for(let i = 2; i < report.length; i++) {
    let safe = true;
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

const main = async () => {
  const fileContent = (await fs.readFile(INPUT_LOCATION, DATA_FORMAT)).toString();
  const input = fileContent.split(ROW_DELIMITER);

  let safeCount = 0;
  for(let i = 0; i < input.length; i++) {
    const reportData = input[i].split(COLUMN_DELIMITER).map(col => Number(col));
    safeCount += checkSafety(reportData);
  }
  console.log({safeCount});
};

main();