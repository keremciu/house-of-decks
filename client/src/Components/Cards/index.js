/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const style = css({
  width: "100%",
  marginTop: 40,
  display: "flex",
  justifyContent: "space-between"
});

export default ({ children }) => <div css={style}>{children}</div>;

const whiteCardStyle = css({
  fontWeight: "bold",
  background: "white",
  borderRadius: 4,
  padding: 10,
  width: "8%",
  height: 200,
  cursor: "pointer"
});

export const WhiteCard = ({ children, ...props }) => (
  <div css={whiteCardStyle} {...props}>
    {children}
  </div>
);

const blackCardStyle = css({
  fontWeight: "bold",
  background: "black",
  color: "white",
  borderRadius: 4,
  padding: 10,
  width: "8%",
  height: 200
});

export const BlackCard = ({ children }) => (
  <div css={blackCardStyle}>{children.replace(/_/g, "______")}</div>
);
