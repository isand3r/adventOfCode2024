const input = await Deno.readTextFile('./src/3.txt');

// part 1
const getInstructionInRange = (input: string, regex: RegExp, start: number, end: number) => {
  return input.slice(start, end).match(regex);
};

const evalMulInstruction = (mul: string): number => {
  const [values] = mul.matchAll(/mul\((\d+)\,(\d+)\)/g);
  const [a, b] = [values[1], values[2]];
  return Number(a) * Number(b);
};

const sum = (numbers: number[]) => {
  return numbers.reduce((acc, i) => acc + i, 0);
};

// part 1
const partOne = () => {
  const mulInstructions = getInstructionInRange(input, /mul\(\d+\,\d+\)/g, 0, input.length);
  const multiplicationResults = mulInstructions?.map((mul) => evalMulInstruction(mul));
  const part1Answer = sum(multiplicationResults!);
  console.log({part1Answer});
}
partOne();

// part 2
// setEndPointer
// find index of first don't() --> evaluate everything before that
// find next index of do()
// find next index of don't()
// evaluate everything between
// repeat until end of input
const partTwo = () => {
  let start = 0;
  let end = input.indexOf('don\'t()');
  let part2Answer = 0;

  while(end !== -1 && end < input.length) {
    const mulInstructions = getInstructionInRange(input, /mul\(\d+\,\d+\)/g, start, end);
    if(mulInstructions) part2Answer += sum(mulInstructions.map(m => evalMulInstruction(m)));
    const newStart = input.slice(end).indexOf('do()');
    if(newStart === -1) {
      end = input.length;
    } else {
      start = newStart + end;
      const newEnd = input.slice(start).indexOf('don\'t()');
      if (newEnd === -1) {
        end = newEnd;
      } else {
        end = newEnd + start;
      }
    }
  }

  console.log({part2Answer});
};
partTwo();
