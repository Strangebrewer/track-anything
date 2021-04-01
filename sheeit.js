
const numbnuts = [1, 1.1, 1.101, 1.1011, 1.15, 1.125, 50, 200, 65, 5, 47, 152, 305, 9, 125, 15, 97, 84, 0.1, 0.5];
const sorted = [];
let totalTime = 0;

for (let i = 0; i < numbnuts.length; i++) {
  const element = numbnuts[i];
  totalTime += element;
  setTimeout(() => sorted.push(element), element)
}

setTimeout(() => console.log('sorted:::', sorted), totalTime);
