let stations = ['MAN675847583748sjt567654;Manchester Piccadilly',
                'GNF576746573fhdg4737dh4;Greenfield',
                'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
                'SYB4f65hf75f736463;Stalybridge',
                'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'];

for (let i = 0; i < stations.length; i++) {
  let input = stations[i];
  let city = input.slice(0,3);
  let positionpev = input.indexOf(';');
  let fullCity = input.slice(positionpev+1);
  

  let result = city+": "+fullCity;
  console.log(result);
}