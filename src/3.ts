const input = await Deno.readTextFile('./src/3.txt');

const regex = /mul\(\d+\,\d+\)/g;

const instructions = input.match(regex);

const multiplicationResults = instructions?.map(
  (mul) => {
    const [values] = mul.matchAll(/mul\((\d+)\,(\d+)\)/g);
    const [a, b] = [values[1], values[2]];
    return Number(a) * Number(b);
  }
);

const sum = multiplicationResults?.reduce((acc, i) => acc + i, 0);

console.log(sum);