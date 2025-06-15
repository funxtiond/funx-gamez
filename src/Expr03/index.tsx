import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./index.css";

// interface MainType {
//   name: string
//   age: number
// }

// type NestedType = MainType & {
//   isDeveloper: boolean
// }

// type Prettify<T> = {
//   [K in keyof T]: T[K]
// } & []

// type PrettifiedType = Prettify<NestedType>

const items = Array.from({ length: 5 }, (_, i) => ({
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

export default function Expr03() {
  const controls = useAnimation();
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef(null);

  // Start animation
  useEffect(() => {
    if (!paused) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [paused, controls]);

  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  useEffect(() => {
    console.log("use Effect ??");
  }, []);

  useLayoutEffect(() => {
    console.log("use Layout Effect ??");
  }, []);

  return (
    <div
      className="scroll-container"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <motion.div className="scroll-track" animate={controls} ref={scrollRef}>
        {/* Duplicate content for infinite effect */}
        {[...items, ...items].map((item, i) => (
          <div className="scroll-item" key={i}>
            <div className="item-content">
              <div className="title">{item.title}</div>
              <div className="description">{item.description}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
