
function promise(thing) {
  return new Promise((resolve, reject) => {
    if (typeof thing === 'string') resolve('yay');
    else reject('boo');
  });
}

(async function () {
  // try {
  //   const first = await promise('string');
  //   console.log('first res:::', first);    
  // } catch (err) {
  //   console.log('first err:::', err);
  // }

  promise()
    .then(res => console.log('second res:::', res))
    .catch(err => console.log('second err:::', err));

  // try {
  //   const third = await promise();
  //   console.log('third res:::', third);
  // } catch (err) {
  //   console.log('third err:::', err);
  // }

  const third = await promise()
    .catch(err => {
      console.log('third err:::', err);
    });
  if (third) console.log('third res:::', third);
})();
