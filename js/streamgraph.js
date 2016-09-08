
chart("mariana");

var datearray = [];
var colorrange = [];


function chart(color) {

if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}else if ( color == "mariana" ) {
    colorrange = [ "#7A1315", "#3F2874", "#2A296F", "#287250", "#3B783A", "#775C25", "#6E2965", "#6E293C" ];
}
strokecolor = colorrange[0];

//var format = d3.time.format("%m/%d/%y");
var format = d3.time.format("%Y-%m-%d");

        var margin = {
            top: 30,
            right: 40,
            bottom: 20,
            left: 30
        };

var width = document.body.clientWidth - 100 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var tooltip = d3.select("#stream")
    .append( "div" )
    .attr( "class", "tooltip" )
    .style( "position", "absolute" )
    .style( "visibility", "hidden" )
    .style( "top", "200px" )
    .style( "right", "55px" );

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var localized = d3.locale({
  "decimal": ",",
  "thousands": ".",
  "grouping": [3],
  "currency": ["R$", ""],
  "dateTime": "%d/%m/%Y %H:%M:%S",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  "shortDays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  "shortMonths": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
});

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.months, 6)
    .tickFormat(localized.timeFormat('%b %Y'));


var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.count_by; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svgWidth = width + margin.left + margin.right;
var svgHeight = height + margin.top + margin.bottom;

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on('zoom', zoomed);

var svg = d3.select("#stream").append("svg")
            .attr({
                'version': '1.1',
                'viewBox': '0 0 ' + svgWidth + ' ' + svgHeight,
                'width': '100%',
                'class': 'streamchart'
            })
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")") 
            .call(zoom);

 var chart = svg.append('g').attr('id', 'g-chart');

  function zoomed() {
    chart.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
  }

var ultimoAFazer = "tipo";
document.getElementById("aFazeres").onclick = function() {
    var aFazeres = document.getElementById("aFazeres");

    if(aFazeres.options[aFazeres.selectedIndex].value != ultimoAFazer){
      ultimoAFazer = aFazeres.options[aFazeres.selectedIndex].value;
      d3.select("#g-chart").selectAll("*").remove();
      createGraph("http://web.cloud.lsd.ufcg.edu.br:44142/ementas/contagem?count_by="+aFazeres.options[aFazeres.selectedIndex].value);
    }
};

function createGraph(request){
    var graph = d3.json(request, function(data) {
    data.forEach(function(d) {
      d.date = format.parse(d.time);
      d.value = +d.count;
    });

  /*var graph = d3.csv("data.csv", function(data) {
    data.forEach(function(d) {
      console.log(d.month);
      d.date = format.parse(d.month);
      d.value = +d.count;
    });
  */
    var layers = stack(nest.entries(data));

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);
    
    var invertedx = "";

    chart.selectAll(".layer")
        .data(layers)
      .enter().append("path")
        .attr("class", "layer")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d, i) { return z(i); });


    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.selectAll(".layer")
      .attr("opacity", 1)
      .on("mouseover", function(d, i) {
        chart.selectAll(".layer").transition()
        .duration(250)
        .attr("opacity", function(d, j) {
          return j != i ? 0.6 : 1;
      })})

      .on("mousemove", function(d, i) {
        mousex = d3.mouse(this);
        mousex = mousex[0];
        invertedx = x.invert(mousex);
        invertedx = (invertedx.getMonth()+1)+"/"+invertedx.getFullYear();
        var selected = (d.values);
        for (var k = 0; k < selected.length; k++) {
          datearray[k] = selected[k].date
          datearray[k] = (datearray[k].getMonth()+1)+"/"+datearray[k].getFullYear();
        }

        mousedate = datearray.indexOf(invertedx);
        pro = d.values[mousedate].value;
        d3.select(this)
        .classed("hover", true)
        .attr("stroke", strokecolor)
        .attr("stroke-width", "0.5px"), 
        tooltip.html( "<p>" + d.key + "<br>quant: " + pro + "<br>data: "+invertedx+"</p>" ).style("visibility", "visible");
        
      })
      .on("mouseout", function(d, i) {
       chart.selectAll(".layer")
        .transition()
        .duration(250)
        .attr("opacity", "1");
        d3.select(this)
        .classed("hover", false)
        .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.count_by + "<br>quant: " + pro + "<br>data: "+invertedx+"</p>" )
        .style("visibility", "hidden");
    }).on("click", function(d, i) {
        mousex = d3.mouse(this);
        mousex = mousex[0];
        invertedx = x.invert(mousex);
        invertedx = invertedx.getMonth()+"-"+invertedx.getYear();
        var selected = (d.values);
        for (var k = 0; k < selected.length; k++) {
          datearray[k] = selected[k].date
          datearray[k] = datearray[k].getMonth()+"-"+datearray[k].getYear();
        }

        mousedate = datearray.indexOf(invertedx);
        pro = d.values[mousedate].value;

        d3.select(this)
        .classed("hover", true)
        .attr("stroke", strokecolor)
        .attr("stroke-width", "0.5px"), 
        tooltip.html( "<p>" + d.key + "<br>quant: " + pro + "<br>data: "+invertedx+"</p>" ).style("visibility", "visible");
        
      })
    
  });
  }
  createGraph("http://web.cloud.lsd.ufcg.edu.br:44142/ementas/contagem?count_by=tipo");
}