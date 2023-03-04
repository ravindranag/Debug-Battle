import { Box, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import useMouse from "@react-hook/mouse-position";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import rules from "../components/rules";
import { Paper } from "@mui/material";

export default function Instruction(name) {
  const navigate = useNavigate();
  const [Variant, setCursorVariant] = useState("default");
  const [isHovering, setHover] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [icon, setIcon] = useState(false);
  const [cursorText, setCursorText] = useState("");

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
      backgroundColor: "#000",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.5,
      },
    },
    title: {
      opacity: 1,
      // backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "#47d147",
      height: 80,
      width: 80,
      fontSize: "18px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32,
    },
  };

  function textLeave(event: any) {
    setImgSrc("");
    setCursorVariant("default");
    setIcon(!icon);
    setHover(!isHovering);
  }

  function textEnter(event: any) {
    setImgSrc("groot.png");
    setCursorVariant("title");
    setHover(!isHovering);
    setIcon(!icon);
  }

  const spring = {
    type: "spring",
    stiffness: 400,
    damping: 28,
  };

  const moveIn = () => {
    navigate("/round1", {
      state: {
        name: name,
      },
    });
  };

  return (
    <div className="instruction" ref={ref}>
      <motion.div
        variants={variants}
        className="circle"
        animate={Variant}
        transition={spring}
        style={{
          mixBlendMode: isHovering ? "difference" : "multiply",
          width: "30px",
          height: "30px",
        }}
      ></motion.div>
      <Stack>
        <Typography
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          variant="h4"
          sx={[{ fontWeight: "bold" }, { color: "white" }]}
        >
          General Instructions
        </Typography>
        <Box
          className="glass-material"
          height="85vh"
          margin={"5px"}
          marginX={"100px"}
        >
          {rules.map((item) => (
            <Paper
              elevation={3}
              sx={[
                { backgroundColor: "#47d147" },
                { margin: "10px" },
                { paddingBlock: "15px" },
              ]}
            >
              <Typography
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {item}
              </Typography>
            </Paper>
          ))}
          <Button
            onClick={moveIn}
            sx={[{ backgroundColor: "#009900" }, { color: "#FFF" }]}
          >
            next
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
