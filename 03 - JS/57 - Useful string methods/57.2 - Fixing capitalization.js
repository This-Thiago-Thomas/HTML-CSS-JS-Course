let cities = ['lonDon', 'ManCHESTer', 'BiRmiNGHAM', 'liVERpoOL'];
for (let i = 0; i < cities.length; i++) {
  let input = cities[i];
  let lower = input.toLowerCase();
  let firstLetter = lower.slice(0,1);
  let capitalized = lower.replace(firstLetter,firstLetter.toUpperCase());
  let result = capitalized;
  console.log(result);
}