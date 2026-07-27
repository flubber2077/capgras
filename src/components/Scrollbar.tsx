'use client';
import { useScroll } from 'motion/react';
import * as motion from 'motion/react-client';

export default function Scrollbar() {
  const { scrollYProgress } = useScroll();
  const scrollbarStyle = {
    scaleX: scrollYProgress,
    height: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    originX: 0,
    position: 'fixed',
    backgroundColor: '#447',
  } as const;
  return <motion.div style={scrollbarStyle} />;
}
