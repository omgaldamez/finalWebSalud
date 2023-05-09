

d3.selectAll(".dropbtnReg").on("click", function () {

    //Asignar x y y dots
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

    //Asignar x y y dots
      d3.selectAll("#violinesRegiones path").attr("data-x", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[1] : null;
      })
      .attr("data-y", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[2] : null;
      });

    //Asignar x y y dots
    d3.selectAll("#flechasRegiones path").attr("data-x", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[1] : null;
      })
      .attr("data-y", function() {
        var d = d3.select(this).attr("d");
        var match = /M([\d.]+),([\d.]+)/.exec(d);
        return match ? match[2] : null;
      });

//--------------------------------------------
// regresar a 0 al inicio del click
d3.selectAll("#dotsRegiones path")
  .style("fill", "none")
  .style("stroke", "none")
  .style("opacity","0");

d3.selectAll("#violinesRegiones path")
.style("fill", "none")
.style("stroke", "none")
.style("opacity","0");

d3.selectAll("#flechasRegiones path")
.style("fill", "none")
.style("stroke", "none")
.style("opacity","0");

// transicion violines
d3.selectAll("#violinesRegiones path")
  .transition()
  .delay(function(d, i) {
    var x = parseFloat(d3.select(this).attr("data-x"));
    return x * 0;
  })
  .ease(d3.easeQuadIn)
  .style("fill", function() {
    return d3.select(this).attr("data-fill");
  })
  .style("opacity", "1");

// transicion flechas
d3.selectAll("#flechasRegiones path")
  .transition()
  .delay(function(d, i) {
    var x = parseFloat(d3.select(this).attr("data-x"));
    return x * 1;
  })
  .ease(d3.easeQuadIn)
  .style("fill", function() {
    return d3.select(this).attr("data-color");
  })
  .style("stroke", function() {
    return d3.select(this).attr("data-stroke");
  })
  .style("opacity","1");

// transicion dots
d3.selectAll("#dotsRegiones path")
  .transition()
  .delay(function(d, i) {
    var x = parseFloat(d3.select(this).attr("data-x"));
    return x * 5;
  })
  .ease(d3.easeQuadIn)
  .style("fill", function() {
    return d3.select(this).attr("data-color");
  })
  .style("stroke", function() {
    return d3.select(this).attr("data-stroke");
  })
  .style("opacity","1");




    });
    