import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  pressed: { scale: 0.75 },
  checked: {
    fill: "var(--color-gray)",
  },
  unchecked: {
    fill: "var(--color-lightgray)",
  },
};

export default ({ isChecked, setIsChecked }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
      initial={false}
      animate={isChecked ? "checked" : "unchecked"}
      whileHover="hover"
      whileTap="pressed"
      width="48"
      height="48"
      viewBox="0 0 342 326"
      onClick={setIsChecked}
    >
      {isChecked ? (
        <motion.path
          d="M289.838 12.612l-20.509 22.76A48.791 48.791 0 00247 30H79c-27.062 0-49 21.938-49 49v168c0 27.062 21.938 49 49 49h168c27.062 0 49-21.938 49-49V114.946l30-33.31V247c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79C0 35.37 35.37 0 79 0h168c15.79 0 30.497 4.632 42.838 12.612z"
          fill="var(--color-gray)"
          variants={boxVariants}
        />
      ) : (
        <motion.path
          d="M0 79C0 35.37 35.37 0 79 0h168c43.63 0 79 35.37 79 79v168c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79zm30 0v168c0 27.062 21.938 49 49 49h168c27.062 0 49-21.938 49-49V79c0-27.062-21.938-49-49-49H79c-27.062 0-49 21.938-49 49z"
          fill="var(--color-gray)"
          variants={boxVariants}
        />
      )}
      <motion.path
        d="M71.46 122.469l93.687 83.643 156.313-174.2"
        fill="transparent"
        strokeWidth="40"
        stroke="var(--color-black)"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        custom={isChecked}
      />
    </motion.svg>
  );
};
