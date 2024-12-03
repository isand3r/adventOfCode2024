import { promises as fs } from 'fs';

const loadData = async () => {
  const INPUT_LOCATION = './src/1.txt';
  const DATA_FORMAT = 'utf-8';
  const data = await fs.readFile(INPUT_LOCATION, DATA_FORMAT);
  return data.toString();
};

const splitLists = (input: string): [number[], number[]] => {
  const ROW_DELIMITER = '\n';
  const COLUMN_DELIMITER = '  ';
  const rows = input.split(ROW_DELIMITER);
  const leftList: number[] = [];
  const rightList: number[] = [];
  for(const row of rows) {
    const [left, right] = row.trim().split(COLUMN_DELIMITER);
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }
  return [leftList.sort(), rightList.sort()];
};

const main = async () => {
  const fileContents = await loadData();
  const [left, right] = splitLists(fileContents);

  // part 1
  let distance = 0;
  for(let i = 0; i < left.length; i++) {
    distance += Math.abs(left[i] - right[i]);
  }
  console.log({distance});

  // part 2
  let similarity = 0;
  for(let i = 0; i < left.length; i++) {
    const locationId = left[i];
    const occurences = right.filter(num => num === locationId).length;
    similarity += (locationId * occurences);
  }
  console.log({similarity});
};

main();