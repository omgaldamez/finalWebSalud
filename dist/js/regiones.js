
d3.selectAll(".dropbtnReg").on("click", function () {
    //Asignar valores data- a HEATS SVG
    d3.selectAll("#dotsRegiones path").attr("data-x", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[1] : null;
      })
      .attr("data-y", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[2] : null;
      });
      
      d3.selectAll("#violinesRegiones path")
  .transition()
  .duration(3000)
  .style("fill", "#DADADA");


//--------------------------------------------
// set fill and stroke to none
d3.selectAll("#dotsRegiones path")
  .style("fill", "none")
  .style("stroke", "none");

// animate paths to make each visible
d3.selectAll("#dotsRegiones path")
  .transition()
  .delay(function(d, i) {
    var x = parseFloat(d3.select(this).attr("data-x"));
    return x * 3; // multiply x position by delay factor
  })
  .ease(d3.easeLinear) // add ease function
  .style("fill", function() {
    return d3.select(this).attr("data-color");
  })
  .style("stroke", function() {
    return d3.select(this).attr("data-stroke");
  });




    });
    