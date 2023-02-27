import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";

export default function Welcome() {
  const navigate = useNavigate();
  const [cursorText, setCursorText] = useState("");
  const [Variant, setCursorVariant] = useState("default");
  const [shield, setShield] = useState(false);
  const [isHovering, setHover] = useState(false);

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
    heroTitle: {
      opacity: 1,
      // backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "#fff",
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
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
    },
  };

  function titleEnter(event: any) {
    setHover(!isHovering);
    setCursorVariant("heroTitle");
  }

  function titleLeave(event: any) {
    setHover(!isHovering);
    setCursorText("");
    setCursorVariant("default");
  }

  function arenaEntry(event: any) {
    setCursorText("");
    setCursorVariant("contact");
    setShield(!shield);
  }

  function arenaLeave(event: any) {
    setCursorText("");
    setCursorVariant("default");
    setShield(!shield);
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  return (
    <AnimatedPage>
      <div ref={ref}>
        <motion.div
          variants={variants}
          className="circle"
          animate={Variant}
          transition={spring}
          style={{
            mixBlendMode: isHovering ? "difference" : "normal",
            width: "30px",
            height: "30px",
          }}
        >
          {shield && <img src={"shield.png"} alt="shirt" />}
          {shield && <span className="entryText">Enter the arena!</span>}
        </motion.div>

        <Stack
          height={"100vh"}
          gap="100px"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            onMouseEnter={titleEnter}
            onMouseLeave={titleLeave}
            fontFamily={"Rajdhani"}
            variant="h2"
          >
            Welcome to the Arena
          </Typography>

          <div onMouseEnter={arenaEntry} onMouseLeave={arenaLeave}>
            <Button onClick={() => navigate("/editor")} variant="contained">
              Enter
            </Button>
          </div>
        </Stack>
      </div>
    </AnimatedPage>
  );
}
