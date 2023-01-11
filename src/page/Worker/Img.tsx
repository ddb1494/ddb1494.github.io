import chroma from 'chroma-js';
import { Box, Typography } from '@mui/material';
import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Item1 = () => {
  useEffect(() => {
    const paths = Array.from(document.querySelectorAll('path'));
    const group = document.querySelector<SVGGElement>('#group');
    const circle = document.querySelector('#circle');
    const colours = [
      chroma.scale([
        '#FF7900',
        '#F94E5D',
        '#CA4B8C',
        '#835698',
        '#445582',
        '#2F4858',
      ]),
      chroma.scale([
        '#845EC2',
        '#D65DB1',
        '#FF6F91',
        '#FF9671',
        '#FFC75F',
        '#F9F871',
      ]),
      chroma.scale(['#F24B8E', '#F6ACC2', '#FFE3F1', '#59BAB7']),
      chroma.scale([
        '#1FAAFE',
        '#00C6FF',
        '#00DCE4',
        '#10ECB8',
        '#A0F68B',
        '#F9F871',
      ]),
    ];
    let currentGradient = 1;
    const tl = gsap.timeline({
      onReverseComplete: () => {
        tl.timeScale(1);
        tl.play(0);
      },
      onComplete: () => {
        // tl.delay(1);
        // tl.timeScale(1.5);
        // tl.reverse(0);
      },
    });

    let delay = 0;
    function generatePoints() {
      tl.clear();
      console.log(group);

      group!.innerHTML = '';
      let delay = 0;
      paths.forEach((path) => {
        const length = path.getTotalLength();
        for (let i = 0; i < length; i += 1) {
          const pointLength = Math.random() * length;
          const point = path.getPointAtLength(pointLength);
          const circle = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle',
          );
          circle.setAttribute('cx', String(point.x));
          circle.setAttribute('cy', String(point.y));
          circle.setAttribute('r', String(Math.random() * 3 + 1));
          group!.appendChild(circle);
          const coloursX = point.x / 476.5 + (Math.random() - 0.5) * 0.2;
          tl.to(
            circle,
            {
              autoRound: false,
              fill: colours[currentGradient % colours.length](coloursX).hex(),
              cx: point.x + (Math.random() - 0.5) * 60,
              cy: point.y + (Math.random() - 0.5) * 60,
              duration: 'random(0.5, 2)',
              delay: (delay + pointLength) * 0.002,
              ease: 'power2.out',
            },
            0,
          );
        }
        delay += length;
      });
      tl.reversed(false).play(0);
      currentGradient++;
    }
    generatePoints();
  }, []);
  return (
    <Box gridArea="a">
      <Typography variant="h3">Img</Typography>
      <svg viewBox="0 0 476.5 103.1" height={200}>
        <path
          d="M47.2,90.8V19.4h23.9l5.8,1.8l6.3,3.2l4.6,7.1v6.1l-1,6.8l-4.3,6l-5.3,3.3l-8.6,2H47.5h20.4
l20.7,35"
        />
        <path
          d="M111.5,44.5l7.5-4.3l6.3-1.8l6.5-0.7l5,1.8l4.3,3.9l2.8,5.8l0.3,7.8v23.9v9.6l-0.3-9.6l-4.6,3.2
l-5,3.6l-5.7,2.5l-6.5,1.1l-5.3-1.8l-4.3-2.9l-3.2-4.6v-6.8l2.5-5.3l5.7-4.6l5.7-2.2l6.8-2.2l6.5-1l4-0.3h3.2"
        />
        <path d="M171.5,91.2V38.3v12.8l5-5l4.6-4.2l3.6-2.2l5.3-1.5l3.5-0.3l5.4,1.5l3.2,2l2.5,3.6l2.2,5v41" />
        <path
          d="M270.1,11.9v78.5V79.7l-5,5.1l-6.8,4.6l-6.8,1.8l-5.7-1.1l-5.8-2.5l-5.7-6.1l-3.6-8.2l-0.7-10
l2.5-11.8l6.1-9l8.5-4.3l6.8-0.7l7.1,2.5l4.6,2.8l4.6,4.3"
        />
        <path
          d="M317.2,90.8h0.3l7.1-1.8l6.8-4.6l4.2-7.2l1.8-7.8l0.3-7.5l-1-6.8l-2.5-6l-3.6-4.6l-5-4.3
l-5.3-1.8l-5-0.3l-5.8,1l-5.3,3.3l-4.6,5.3l-2.5,5l-2.1,7.5v5.8l0.7,6.7l1.7,6.1l4.3,5.7l5,3.9l5.4,2.1L317.2,90.8"
        />
        <path
          d="M362.2,91.2V38.7v11.8l5-4.3l4.6-3.9l4.3-2.8l5.3-1.5l4.6,0.7l3.2,1.5l3.6,3.5l2.5,6.1l0.7,7.5
v33.9V51.6l1.5-2.9l7.5-6.7l5.7-2.9l4.6-1.4l5,1.4l3.3,1.8l3.9,4.6l1.8,9.3v36.1"
        />

        <g id="group"></g>
        <circle id="circle" rx={0} ry={0} r={5} fill="#0007" />
      </svg>
    </Box>
  );
};

const Item2 = () => {
  return (
    <Box gridArea="a">
      <svg width="1392" height="1392" viewBox="0 0 1392 1392" fill="none">
        <circle
          cx="696"
          cy="696"
          r="696"
          fill="url(#paint0_radial_195_8957)"
          fill-opacity="0.2"
        />
        <defs>
          <radialGradient
            id="paint0_radial_195_8957"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(696 696) rotate(90) scale(696)"
          >
            <stop stop-color="#ED4009" />
            <stop offset="1" stop-color="#ED4009" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
};

const Page = () => {
  return (
    <Box display="grid" gridTemplateAreas="'a'">
      <Item1 />
      <Item2 />
    </Box>
  );
};

export default Page;
