/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { useContext } from "react";

const style = css({
  position: "fixed",
  left: 16,
  bottom: 16,
});

export default ({ items }) => {
  return <div css={style}></div>;
};
