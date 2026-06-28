import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

export function ScrollReveal({ children, delay = 0, className, ...props }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo scale
        delay 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
