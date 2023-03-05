import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { useState, useRef } from "react";
import useMouse from "@react-hook/mouse-position";
import useCursorStore from "../utils/store/useCursorStore";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExitModal() {
  const [Variant, setCursorVariant] = useState("default");
  const [isHovering, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [setHoveringState, setCursorContent] = useCursorStore((state) => [
    state.setHoveringState,
    state.setCursorContent,
  ]);

  useEffect(() => {
    setHoveringState(false);
    setCursorContent(false);
  }, []);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  let mouseXPosition: number = 0;
  let mouseYPosition: number = 0;

  if (mouse.x !== null) mouseXPosition = mouse.clientX as number;

  if (mouse.y !== null) mouseYPosition = mouse.clientY as number;

  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "#1e91d6",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.5,
      },
    },
    project: {
      opacity: 1,
      // backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "#FFF",
      color: "#000",
      height: 80,
      width: 80,
      fontSize: "18px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32,
    },
    contact: {
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0)",
      color: "#000",
      height: 74,
      width: 74,
      fontSize: "32px",
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
    },
  };

  const [message, setMessage] = useState("");
  const handleChange = (value) => {
    setMessage(value);

    console.log(message);
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  function projectEnter(event: any) {
    setHover(!isHovering);
    setCursorVariant("project");
  }

  function projectLeave(event: any) {
    setHover(!isHovering);
    setCursorVariant("default");
  }

  return (
    <div ref={ref}>
      {/* <motion.div
        variants={variants}
        className="circle"
        animate={Variant}
        transition={spring}
        style={{
          mixBlendMode: isHovering ? "difference" : "multiply",
          width: "30px",
          height: "30px",
        }}
      ></motion.div> */}
      <Stack
        className="glass"
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Typography
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
          fontSize={"50px"}
        >
          Thank you for time! Hope you join the league.
        </Typography>
      </Stack>
    </div>
  );
}
