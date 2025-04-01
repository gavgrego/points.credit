'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  createLabels,
  createLinks,
  createNodes,
  transformData,
  initializeSankey,
} from '@/utils';
import { PARTNER_COLORS } from '@/constants';
import { transferPartners } from '@/data/transferPartners';

const Chart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !transferPartners) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 0, right: 200, bottom: 0, left: 200 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { nodes, links } = transformData(transferPartners);
    const sankeyLayout = initializeSankey(width, height - margin.top, margin);
    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyLayout({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    });

    const partnerColorScale = d3
      .scaleOrdinal<string>()
      .domain(nodes.map((n) => n.id))
      .range(PARTNER_COLORS);

    createLinks(svg, sankeyLinks, transferPartners);

    createNodes(svg, sankeyNodes, partnerColorScale);

    createLabels(svg, sankeyNodes, margin, width);

    svg.attr('viewBox', `0 -40 ${width} ${height + 80}`);
  }, []);

  return (
    <div className="w-full h-[900px] relative">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      />
    </div>
  );
};

export default Chart;
