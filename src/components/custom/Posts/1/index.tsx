"use client";

import Section from "@/components/static/Section";
import React, { useRef } from "react";
import { motion, MotionStyle, useScroll, useTransform } from "framer-motion";
import { Settings } from "@/lib/types";

type Content = {
  text: string;
  settings: Settings;
};

export default function Posts_1({ content }: { content: Content }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 80%", "end 20%"],
  });

  const words = content.text.split(" ");

  return (
    <Section dataComponent="Posts_1" settings={content?.settings}>
      <div className="container h-full flex justify-center flex-col">
        {/* <p ref={headingRef} className="text-scrolltext">
          {words.map((word, index) => {
            const start = index * 0.025;
            const end = start + 0.025;
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            return (
              <React.Fragment key={index}>
                <motion.span className="inline-block" style={{ opacity } as MotionStyle}>
                  {word}
                </motion.span>
                {index < words.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </p> */}
      </div>
    </Section>
  );
}
