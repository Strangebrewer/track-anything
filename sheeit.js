const theThingie = "I am a stupid string. I don't know anything.";

switch (10) {
  case 10:
    console.log('5-3:::', 5-3);
  case 18-8:
    console.log('18-8:::', 18-8);
  case 22-12:
    console.log('22-12:::', 22-12);
}


console.time('regex-a');
switch (true) {
  case /I am a stupid string. I don't know anything./.test(theThingie):
    console.log('regex-a');
}
console.timeEnd('regex-a');

console.time('no-regex');
switch (theThingie) {
  case "I am a stupid string. I don't know anything.":
    console.log('no regex');
}
console.timeEnd('no-regex');

console.time('regex');
switch (true) {
  case /I am a stupid string. I don't know anything./.test(theThingie):
    console.log('regex');
}
console.timeEnd('regex');

console.time('no-regex');
switch (theThingie) {
  case "I am a stupid string. I don't know anything.":
    console.log('no regex');
}
console.timeEnd('no-regex');

console.time('regex-b');
switch (true) {
  case /I am a stupid string. I don't know anything./.test(theThingie):
    console.log('regex-b');
}
console.timeEnd('regex-b');

console.time('no-regex');
switch (theThingie) {
  case "I am a stupid string. I don't know anything.":
    console.log('no regex');
}
console.timeEnd('no-regex');

console.time('regex-c');
switch (true) {
  case /I am a stupid string. I don't know anything./.test(theThingie):
    console.log('regex-c');
}
console.timeEnd('regex-c');
