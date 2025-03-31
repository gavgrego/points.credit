'use client';

import * as d3 from 'd3';
import type { Node } from '@/types';

export const createTooltip = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: number,
  y: number,
  sourceNode: Node,
  ratio: string,
  targetNode: Node
) => {
  // Remove any existing tooltip
  removeTooltip(svg);

  const tooltip = svg.append('g').attr('class', 'tooltip');

  // Create a background rectangle
  tooltip
    .append('rect')
    .attr('x', x - 100)
    .attr('y', y - 30)
    .attr('width', 200)
    .attr('height', 60)
    .attr('rx', 5)
    .attr('ry', 5)
    .style('fill', 'rgba(10, 10, 10, 0.9)')
    .style('stroke', '#333')
    .style('stroke-width', 1);

  // Add source -> target text
  const text = tooltip
    .append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('font-size', '12px');

  const sourceName =
    sourceNode.category === 'Banks' ? sourceNode.id : targetNode.id;
  const targetName =
    sourceNode.category === 'Banks' ? targetNode.id : sourceNode.id;

  text
    .append('tspan')
    .attr('x', x)
    .attr('dy', '-10')
    .style('font-weight', 'bold')
    .text(`${sourceName} → ${targetName}`);

  // Add ratio text, which could contain HTML for bonus formatting
  const ratioText = text
    .append('tspan')
    .attr('x', x)
    .attr('dy', '20')
    .style('font-size', '14px')
    .html(`Transfer Ratio: ${ratio}`);

  // If the ratio contains HTML, it won't render correctly with D3's html() method
  // So we need to create a foreign object for HTML content
  if (ratio.includes('<tspan')) {
    ratioText.text('');
    const foreignObject = tooltip
      .append('foreignObject')
      .attr('x', x - 90)
      .attr('y', y)
      .attr('width', 180)
      .attr('height', 30);

    const div = foreignObject
      .append('xhtml:div')
      .style('color', 'white')
      .style('font-size', '14px')
      .style('text-align', 'center');

    div.html(`Transfer Ratio: ${ratio}`);
  }
};

export const removeTooltip = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  svg.select('.tooltip').remove();
};
