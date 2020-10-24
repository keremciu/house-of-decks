import { useContext } from "react";
import { SoundContext } from "Sounds/Context";
import { StyledButton, StyledInnerSpan } from "./Button.styled";

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
      <StyledButton
        {...props}
        type={type}
        style={props.style}
        title={props.title}
        disabled={props.disabled}
        whileHover={{
          boxShadow:
            "rgb(255,255,255) -10px -15px 30px 0px, #D1D9E6 10px 15px 20px 0px",
          scale: 1.1,
        }}
        whileTap={{
          y: "-3",
          scale: 0.9,
          color: "#3f4a62",
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
          onClick && onClick(e);
        }}
      >
        <StyledInnerSpan>{children}</StyledInnerSpan>
      </StyledButton>
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
