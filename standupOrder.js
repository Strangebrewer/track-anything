const devs = [
  'Alla',
  'Keith',
  'Jon',
  'TJ',
  'Hideky',
  'Bryce'
];

// Mine, off the cuff
function shuffle(arr) {
  let copy = [...arr];
  let newArr = [];

  while (copy.length) {
    let current = Math.floor(Math.random() * copy.length);
    newArr.push(copy[current]);
    copy.splice(current, 1);
  }
  
  return newArr;
}

console.log('devs:::', shuffle(devs));

// From Stack Overflow: "the d-facto unbiased shuffled algorithm is the Fisher-Yates (aka Knuth) Shuffle"
function shuffleTwo(arr) {
  let copy = [...arr];
  let current = copy.length;
  let temporary;
  let random;

  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current -= 1;

    temporary = copy[current];
    copy[current] = copy[random];
    copy[random] = temporary;
  }

  return copy;
}

console.log('devs2:::', shuffleTwo(devs));