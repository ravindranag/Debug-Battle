import { zeroPad } from "react-countdown";
import useCursorStore from "../utils/store/useCursorStore";
import { motion } from "framer-motion";
import { useLayoutEffect } from "react";

const Cursor = (): JSX.Element => {
  const [x, y, setCursorPosition, cursorVisible, hideCursor, showCursor] =
    useCursorStore((state) => [
      state.x,
      state.y,
      state.setCursorPosition,
      state.cursorVisible,
      state.hideCursor,
      state.showCursor,
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
      x: x - 10,
      y: y - 10,
      width: 20,
      height: 20,
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
        backgroundColor: "#f00",
        borderRadius: "100px",
        pointerEvents: "none",
      }}
    ></motion.div>
  );
};
export default Cursor;
