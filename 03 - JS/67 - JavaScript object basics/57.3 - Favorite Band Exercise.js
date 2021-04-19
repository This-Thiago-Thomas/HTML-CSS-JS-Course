let bandInfo;

let lp = {
  name: "Linkin Park",
  nationality: "USA",
  genre: "Rock",
  members: 4,
  formed: 1992,
  split: false,
  albums: [
            { 
              name: "Hybrid Teory", 
              released: 1991 
            }, 
            {
              name: "Meteora", 
              released: 1992
            }
    ]
}

bandInfo = "Minha banda favorita é o "+lp.name+" dos " +lp.nationality+" e os meus albums favoritos são: "+lp.albums[0].name+" e "+lp.albums[1].name;

console.log(bandInfo);