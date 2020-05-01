/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { useContext } from "react";
import { SoundContext } from "Sounds/Context";

const style = (props) =>
  css({
    boxSizing: "border-box",
    appearance: "none",
    display: "block",
    width: 240,
    fontSize: 20,
    fontWeight: 700,
    padding: 0,
    margin: 0,
    marginTop: 20,
    border: "none",
    cursor: "pointer",
    outline: "none",
    borderRadius: 100,
    boxShadow:
      "rgb(255,255,255) -20px -20px 40px 0px, #cbcaca 20px 20px 40px 0px",
    background: "linear-gradient(145deg, #ffffff, #d7d6d6)",
    "@media (hover: hover)": {
      "&:hover > span": {
        boxShadow: "rgb(255,255,255) inset 2px 2px 0px 0px",
      },
    },
    "&:active": {
      "& > span": {
        background: "rgb(236, 232, 227)",
        boxShadow:
          "inset 4px 6px 4px rgba(191, 171, 136, 0.48),inset 14px 14px 36px rgba(191, 171, 136, 0.48)",
      },
    },
    ...(props.disabled
      ? {
          pointerEvents: "none",
          opacity: "0.4",
        }
      : {}),
    ...(props.small
      ? {
          height: 60,
          width: 60,
          background: "#efeeee",
          color: "var(--color-gray)",
          fontWeight: 500,
          boxShadow:
            "rgb(245,245,245) -10px -10px 20px 0px, rgb(224, 224, 224) 10px 10px 20px 0px",
          "@media (hover: hover)": {
            "&:hover": {
              color: "black",
            },
            "&:hover > span ": {
              boxShadow: "none",
            },
          },
        }
      : {
          height: 100,
        }),
    ...(props.secondary
      ? {
          height: 72,
          background: "#efeeee",
          color: "var(--color-gray)",
          fontSize: 16,
          boxShadow:
            "rgb(245,245,245) -10px -10px 20px 0px, rgb(224, 224, 224) 10px 10px 20px 0px",
          "@media (hover: hover)": {
            "&:hover": {
              color: "black",
            },
            "&:hover > span ": {
              boxShadow: "none",
            },
          },
        }
      : {}),
  });

const innerStyle = css({
  borderRadius: 100,
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export default ({
  children,
  wrapperStyle = {},
  onClick,
  invertSounds,
  type = "button",
  ...props
}) => {
  const { playButton, soundEnabled } = useContext(SoundContext);
  return (
    <div style={{ padding: 20, ...wrapperStyle }}>
      <motion.button
        type={type}
        css={style(props)}
        style={props.style}
        title={props.title}
        disabled={props.disabled}
        whileHover={{
          boxShadow:
            "rgb(255,255,255) -10px -15px 30px 0px, #cbcaca 10px 15px 20px 0px",
          scale: 1.1,
        }}
        whileTap={{
          y: "-3",
          scale: 0.9,
          boxShadow:
            "rgb(239, 238, 238) -10px -15px 30px 0px, rgb(239, 238, 238) 10px 15px 20px 0px",
        }}
        onClick={(e) => {
          if (invertSounds) {
            if (!soundEnabled) {
              playButton({
                forceSoundEnabled: true,
              });
            }
          } else {
            playButton();
          }
          onClick(e);
        }}
      >
        <span css={innerStyle}>{children}</span>
      </motion.button>
    </div>
  );
};

export const BackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24.1592797,21.6093389 C24.8632401,22.3132992 24.8632401,23.454418 24.1592797,24.1583784 C23.8068489,24.5108092 23.3462551,24.686574 22.88476,24.686574 C22.4232649,24.686574 21.9626711,24.5108092 21.6102403,24.1583784 L12.6867993,15.2358388 L3.76425975,24.1583784 C3.41273025,24.5108092 2.95123513,24.686574 2.48974,24.686574 C2.02824487,24.686574 1.56674975,24.5108092 1.21522026,24.1583784 C0.511259915,23.454418 0.511259915,22.3132992 1.21522026,21.6093389 L10.1377598,12.6867993 L1.21522026,3.76425975 C0.511259915,3.06029941 0.511259915,1.9191806 1.21522026,1.21522026 C1.91827924,0.511259915 3.06120076,0.511259915 3.76425975,1.21522026 L12.6867993,10.1377598 L21.6102403,1.21522026 C22.3142006,0.511259915 23.4553194,0.511259915 24.1592797,1.21522026 C24.8632401,1.9191806 24.8632401,3.06029941 24.1592797,3.76425975 L15.2358388,12.6867993 L24.1592797,21.6093389 Z" />
  </svg>
);
