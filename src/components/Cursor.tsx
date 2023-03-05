import { zeroPad } from "react-countdown";
import useCursorStore from "../utils/store/useCursorStore";
import { motion } from "framer-motion";
import { useLayoutEffect } from "react";
import { Stack, Typography } from "@mui/material";

const Cursor = (): JSX.Element => {
  const [
    backgroundColor,
    x,
    y,
    setCursorPosition,
    cursorVisible,
    hideCursor,
    showCursor,
    isHovering,
    cursorContent,
    setCursorContent,
  ] = useCursorStore((state) => [
    state.backgroundColor,
    state.x,
    state.y,
    state.setCursorPosition,
    state.cursorVisible,
    state.hideCursor,
    state.showCursor,
    state.isHovering,
    state.cursorContent,
    state.setCursorContent,
  ]);
  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // console.log(e)
      let newX = e.pageX + window.scrollX;
      let newY = e.pageY - window.scrollY;
      setCursorPosition(newX, newY);
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", (e) => hideCursor());
    document.body.addEventListener("mouseenter", (e) => showCursor());
  }, []);

  const variants = {
    default: {
      x: x - (isHovering ? 40 : 10),
      y: y - (isHovering ? 40 : 10),
      width: isHovering ? 80 : 20,
      height: isHovering ? 80 : 20,
      backgroundColor: backgroundColor,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate="default"
      style={{
        visibility: cursorVisible ? "visible" : "hidden",
        position: "fixed",
        zIndex: 99999,
        borderRadius: "100px",
        border: "1px solid",
        pointerEvents: "none",
        mixBlendMode: isHovering ? "difference" : "normal",
      }}
    >
      {cursorContent && (
        <Stack
          direction="row"
          position="absolute"
          width="300px"
          gap="20px"
          alignItems="center"
        >
          <img
            src={cursorContent.img}
            style={{
              width: "50px",
              objectFit: "contain",
            }}
          />
          <Typography color="#fff" fontWeight={550}>
            {cursorContent.text}
          </Typography>
        </Stack>
      )}
    </motion.div>
  );
};
export default Cursor;
