var data, opts, helpers, arcs, groups;

data = [
  {
    name: 'blue',
    color: '#0885c2',
    x: 0,
    y: 10,
    partialSide: 'right'
  },
  {
    name: 'black',
    color: '#000',
    x: 60,
    y: 10,
    partialSide: 'right'
  },
  {
    name: 'red',
    color: '#ed334e',
    x: 120,
    y: 10,
    partialSide: 'right'
  },
  {
    name: 'yellow',
    color: '#fbb132',
    x: 30,
    y: 30,
    partialSide: 'left'
  },
  {
    name: 'green',
    color: '#1c8b3c',
    x: 90,
    y: 30,
    partialSide: 'left'
  }
];

helpers = {
  getColor     : function(d){ return d.color; },
  getLabel     : function(d){ return d.name; },
  getX         : function(d){ return d.x; },
  getY         : function(d){ return d.y; },
  getTransform : function(d){
    return ['translate(', helpers.getX(d), ',', helpers.getY(d), ')'].join('');
  },
  partialArc   : function(d){
    return (d.partialSide === 'right') ? arcs.partialRight() : arcs.partialLeft();
  },
  makeArc      : function(start, end) {
    return d3.svg.arc()
      .innerRadius(22)
      .outerRadius(28)
      .startAngle(start)
      .endAngle(end);
  }
};

arcs = {
  partialRight : helpers.makeArc(Math.PI * 0.25, Math.PI * 1.25),
  partialLeft  : helpers.makeArc(Math.PI * 1.25, Math.PI * 1.75),
  circle       : helpers.makeArc(0, Math.PI * 2)
};

groups = d3.select('#canvas')
  .append('svg')
    .attr('width', 180)
    .attr('height', 90)
  .append('g')
    .attr('transform', 'translate(30,20)')
  .selectAll('arc')
  .data(data)
  .enter();

groups.append('path')
  .attr('fill', helpers.getColor)
  .attr('transform', helpers.getTransform)
  .attr('d', arcs.circle);

groups.append('path')
  .attr('fill', helpers.getColor)
  .attr('transform', helpers.getTransform)
  .attr('d', helpers.partialArc);
