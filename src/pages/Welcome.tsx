import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";

export default function Welcome() {
  const navigate = useNavigate();
  const [Variant, setCursorVariant] = useState("default");
  const [type, setType] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [isHovering, setHover] = useState(false);
  const [isRedOpen, setIsRedOpen] = useState(false);
  const [isBlueOpen, setIsBlueOpen] = useState(false);
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
    heroguy: {
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

    setCursorVariant("default");
  }

  function heroArenaEntry(event: any) {
    setImgSrc("redskull.png");
    setCursorText("Time to destroy☠️");
    setCursorVariant("heroguy");
    setType(!type);
  }

  function heroArenaLeave(event: any) {
    setImgSrc("");
    setCursorVariant("default");
    setType(!type);
  }

  function villianArenaEntry(event: any) {
    setImgSrc("shield.png");
    setCursorText("Ready to save the day🥊");
    setCursorVariant("heroguy");
    setType(!type);
  }

  function villianArenaLeave(event: any) {
    setImgSrc("");
    setCursorVariant("default");
    setType(!type);
  }

  const navigationHero = (color) => {
    navigate("/editor", {
      state: {
        Type: "Hero",
        color: color,
        grad: "linear-gradient(to left,rgb(33, 114, 221),rgb(255, 255, 255, 0))",
      },
    });
  };

  const navigationVillian = (color) => {
    navigate("/editor", {
      state: {
        Type: "Villian",
        color: color,
        grad: "linear-gradient(to left, rgb(230, 26, 26),rgb(255, 255, 255, 0))",
      },
    });
  };

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
          {type && <img src={imgSrc} alt="shirt" />}
          {type && (
            <span
              style={{
                width: "770px",
                paddingTop: "20px",
                paddingLeft: "20px",
                color: "#fff",
                fontWeight: "500",
              }}
              className="entryText"
            >
              {cursorText}
            </span>
          )}
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

          {/* <div onMouseEnter={arenaEntry} onMouseLeave={arenaLeave}>
            <Button onClick={() => navigate("/editor")} variant="contained">
              Enter
            </Button>
          </div> */}

          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems={"center"}
            gap="210px"
            marginRight={"50px"}
          >
            <motion.div
              layout
              onMouseEnter={villianArenaEntry}
              onMouseLeave={villianArenaLeave}
              whileHover={{
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
              data-isRedOpen={isRedOpen}
              onClick={() => {
                setIsRedOpen(!isRedOpen);
                navigationHero("#1e91d6");
              }}
              className="villian"
            >
              <img src="heroes.jpg" alt="" />
            </motion.div>

            <motion.div
              layout
              onMouseEnter={heroArenaEntry}
              onMouseLeave={heroArenaLeave}
              whileHover={{
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
              onClick={() => {
                setIsBlueOpen(!isBlueOpen);
                navigationVillian("#FF0000");
              }}
              data-isBlueOpen={isBlueOpen}
              className="hero"
            >
              <img width={"900px"} src="villians.jpg" alt="" />
            </motion.div>
          </Stack>
        </Stack>
      </div>
    </AnimatedPage>
  );
}
