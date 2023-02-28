import React, { useState } from "react";
import { Stack } from "@mui/material";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import SideDrawer from "../components/SideDrawer";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import useMouse from "@react-hook/mouse-position";
import { useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AnimatedPage from "../components/AnimatedPage";
import Countdown from "react-countdown";

import ParticleBackground from "../particle";
// import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles"

export default function CodeEditor() {
  const [cursorText, setCursorText] = useState("");
  const [Variant, setCursorVariant] = useState("default");
  const [hammer, setHammer] = useState(false);
  const [isHovering, setHover] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

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
    setCursorText("");
    setCursorVariant("default");
  }

  function contactEnter(event: any) {
    setCursorVariant("contact");
    setHammer(!hammer);
  }

  function contactLeave(event: any) {
    setCursorText("");
    setCursorVariant("default");
    setHammer(!hammer);
  }

  const players = [
    {
      name: "hulk",
      icon: "download.png",
    },
    {
      name: "Spiderman",
      icon: "spidey.png",
    },
  ];

  const Completionist = () => <span className="end">You are good to go!</span>;

  type Props = {
    minutes: number;
    seconds: number;
    completed: boolean;
  };
  const renderer: React.FunctionComponent<Props> = ({
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="timer">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  //   const particlesInit = useCallback(async (engine: Engine) => {
  //     console.log(engine);

  //     // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
  //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //     // starting from v2 you can add only the features you need reducing the bundle size
  //     await loadFull(engine);
  // }, []);

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //     await console.log(container);
  // }, []);

  const { state } = useLocation();
  const { Type, color, grad } = state;

  //  console.log(Type)
  // console.log(color)
  // console.log(grad)
  return (
    <AnimatedPage>
      <div className="editor-main-body" id="editor-main-body" ref={ref}>
        {/* <Particles id="tsparticles" url="http://foo.bar/particles.json"  /> */}
        {/* <div className="particle">
      <ParticleBackground></ParticleBackground>
      </div> */}
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
          {hammer && <img src={"hammer.png"} alt="shirt" />}
          <span className="cursorText">{cursorText}</span>
        </motion.div>
        <Stack justifyContent={"center"} alignItems="center">
          <Stack className="Question header" width="100vw" height="70px">
            <Box
              sx={[
                {
                  width: "100vw",
                },
                { height: "90px" },
              ]}
              className="hv-box"
            >
              <Stack
                direction="row"
                sx={[
                  { height: "90px" },
                  {
                    backgroundImage: grad,
                  },
                  // ,{
                  //   color:color
                  // }
                ]}
              >
                <Stack
                  sx={{ width: 1 / 2 }}
                  justifyContent={"center"}
                  alignItems="start"
                >
                  <Grid container>
                    {players.map((items) => (
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                      >
                        <Grid padding={"6px"} item>
                          <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Player"
                              >
                                <Box onClick={handleTooltipOpen}>
                                  <Avatar
                                    className="type-icon"
                                    alt="hjk"
                                    src="download.png"
                                    sx={{ width: 56, height: 56 }}
                                  />
                                </Box>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </Grid>
                      </motion.div>
                    ))}
                  </Grid>
                </Stack>
                <Stack
                  sx={{ width: 1 / 2 }}
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <Countdown date={Date.now() + 60000} renderer={renderer} />
                  {/* 
                  <Circle></Circle> */}
                </Stack>

                <Stack
                  sx={{ width: 1 / 2 }}
                  justifyContent={"center"}
                  alignItems="end"
                >
                  <div
                    className="project"
                    onMouseEnter={projectEnter}
                    onMouseLeave={projectLeave}
                  >
                    <Typography fontSize={35} fontWeight={700} paddingX={20}>
                      {Type} team
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          <Stack className="code-editor-body" gap={5} marginTop="75px">
            <Stack className="code-editor" width={1000} height={500}>
              <Editor
                theme="vs-dark"
                language="c"
                className="message"
                value="console.log('Hello, World!');"
                onChange={handleChange}
              />
            </Stack>
            <div
              className="contact"
              onMouseEnter={contactEnter}
              onMouseLeave={contactLeave}
            >
              <SideDrawer colorCode={color} code={message}></SideDrawer>
            </div>
          </Stack>
        </Stack>
      </div>
    </AnimatedPage>
  );
}
