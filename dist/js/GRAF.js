let endpoint_ArrowPIB = "datos/JSON_SexeniosPIB.json";

d3.json(endpoint_ArrowPIB).then((datosjson) => {
  let Entidad = [];
  let S1 = [];
  let S2 = [];
  let S3 = [];
  let S4 = [];
  let S1vsS2 = [];

  let i = 0;

  datosjson.data.forEach(function (data) {
    S1.push(data.S1);
    S2.push(data.S2);
    S3.push(data.S3);
    S4.push(data.S4);
    S1vsS2.push(data.S1vsS2);
    Entidad.push(data.ENTIDAD);
  });

  d3.select(".grafico").on("mouseenter", function () {
      d3.select(".grafico").attr("data-OrdenGraf", Entidad);

      d3.selectAll("#Arrow g").on("mouseenter", function () {
        d3.select("#TC1").text("Ranking: " + Entidad[0]);
        d3.select("#TC2").text("HOVER " + Entidad[2]);
        d3.select("#TC3").text("HOVER " + Entidad[3]);
        d3.select("#TC4").text("HOVER " + Entidad[5]);
        //d3.select(this).attr("transform", "translate(0,-150)");

      });

      d3.selectAll("#chart text").on("mouseenter", function () {
      d3.select("#TC5").text(this.innerHTML);
    });
      //d3.select(this).attr("transform", "translate(0,-150)");

      d3.selectAll("#chart").on("mouseenter", function () {
        d3.select("#TC5").text(this.innerText);
        //d3.select(this).attr("transform", "translate(0,-150)");
    console.log("ENTRA texto");
      });

  });

  d3.selectAll(".grafico text").on("mouseenter", function () {
    d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    console.log("ENTRA HOVER");
  });
  
  d3.selectAll("#Estados text")
  .attr("new-attr", function() {
    return this.innerHTML;
  });
  

// Access values using dot notation
console.log(Entidad); // Output: John Doe
console.log(Entidad[0]); // Output: 30
console.log(datosjson.data.Entidad); // Output: 30
console.log(datosjson);

const siblings = datosjson.data.filter(row => row.ENTIDAD === 'AGS');
console.log("filtro: ", siblings)
console.log("filtro2: ", siblings.index)
console.log("filtro2: ", siblings[0].index)


function searchSiblings(searchString, columnName) {
  for (let i = 0; i < datosjson.data.length; i++) {
    if (datosjson.data[i][columnName] === searchString) {
      return datosjson.data[i];
    }
  }
  return null; // return null if no match is found
}

// Example usage
const match = searchSiblings("2.32%", "S1");
console.log("match: ",match); // prints {index: 0, ENTIDAD: "AGS", S1: "2.32%", S2: "2.79%", S3: "3.11%", S4: "2.93%", S1vsS2: "20%", S1vsS3:
console.log("match index: ",match.index); // prints {index: 0, ENTIDAD: "AGS", S1: "2.32%", S2: "2.79%", S3: "3.11%", S4: "2.93%", S1vsS2: "20%", S1vsS3:

});


