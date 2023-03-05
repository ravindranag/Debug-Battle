import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
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
import AnimatedPage2 from "../components/AnimatedPage2";
import Countdown from "react-countdown";
import quizQuestions from "../components/quizQuestions";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExitModal from "../components/ExitModal";
import ParticleBackground from "../particle";
import useCursorStore from "../utils/store/useCursorStore";
import axios from "axios";
import useRoundTwoStore from "../utils/store/useRoundTwo";
// import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles"

export default function CodeEditor() {
  const [open, setOpen] = React.useState(false);
  const [setCursorContent, setHoveringState] = useCursorStore((state) => [
    state.setCursorContent,
    state.setHoveringState,
  ]);
  const [id] = useRoundTwoStore((state) => [state.id]);

  useEffect(() => {
    setCursorContent(false);
    setHoveringState(false);
    console.log("villain id", id);
    axios
      .get(`http://localhost:5000/code/${id}`)
      .then((res) => res.data)
      .then((code) => {
        setMessage(code);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { state } = useLocation();
  const { Type, color, grad, prop1, prop2 } = state;

  const props = [prop1, prop2];

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const ref = React.useRef(null);

  const [message, setMessage] = useState(quizQuestions[0]);
  const handleChange = (value) => {
    setMessage(value);

    console.log(message);
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  const Completionist = () => <span className="end">Times up!!!</span>;

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

  const cardRef = React.useRef(null);
  const [cardData, setCardData] = useState(1);
  const [quesNo, setNo] = useState(0);
  const [complete, setComplete] = useState(0);
  const [done, setDone] = useState(true);
  const [modal, setModal] = useState(true);
  const [content, setContent] = useState(quizQuestions[0]);

  const next = () => {
    setNo((i) => i + 1);
    setContent(quizQuestions[quesNo]);

    if (quesNo == 11) setModal(!modal);
  };

  const prev = () => {
    setNo((i) => i - 1);
    setContent(quizQuestions[quesNo]);
  };

  return (
    <AnimatedPage2>
      {!modal && <ExitModal></ExitModal>}

      {modal && (
        <div className="editor-main-body" id="editor-main-body" ref={ref}>
          {/* <Particles id="tsparticles" url="http://foo.bar/particles.json"  /> */}
          {/* <div className="particle">
      <ParticleBackground></ParticleBackground>
      </div> */}
          {/* <motion.div
          variants={variants}
          className="circle"
          animate={Variant}
          transition={spring}
          style={{
            mixBlendMode: isHovering ? "difference" : "normal",
            width: "30px",
            height: "30px",
            backgroundColor: "#000",
          }}
        >
          {hammer && <img src={"hammer.png"} alt="shirt" />}
          <span className="cursorText">{cursorText}</span>
        </motion.div> */}
          <Stack justifyContent={"center"}>
            <Stack className="Question header" width="100%" height="70px">
              <Box sx={[{ height: "90px" }]} className="hv-box">
                <Stack
                  direction="row"
                  sx={[
                    // {
                    //   width: "100vw",
                    // },
                    { height: "90px" },
                  ]}
                  className="hv-box"
                >
                  <Stack
                    direction="row"
                    width={"100%"}
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
                        {props.map((items) => (
                          <motion.div
                            // whileHover={{
                            //   scale: 1.1,
                            // }}
                            whileHover={{ scale: 0.9 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 10,
                            }}
                            whileTap="tap"
                          >
                            <Grid padding={"6px"} item>
                              <ClickAwayListener
                                onClickAway={handleTooltipClose}
                              >
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
                                      {
                                        <Avatar
                                          className="type-icon"
                                          alt=""
                                          src={items}
                                          sx={{ width: 56, height: 56 }}
                                        />
                                      }
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
                      <Countdown
                        date={Date.now() + 60000}
                        renderer={({ minutes, seconds, completed }: any) => {
                          if (completed) {
                            return <Completionist />;
                          } else {
                            return (
                              <span className="timer">
                                {minutes}:{seconds}
                              </span>
                            );
                          }
                        }}
                        zeroPadTime={2}
                        // controlled={true}
                      />
                      {/* 
                  <Circle></Circle> */}
                    </Stack>

                    <Stack
                      sx={{ width: 1 / 2 }}
                      justifyContent={"center"}
                      alignItems="end"
                    >
                      <div className="project">
                        <Typography
                          fontSize={35}
                          fontWeight={700}
                          paddingX={20}
                        >
                          {Type} team
                        </Typography>
                      </div>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Stack className="code-editor-body" gap={5} marginTop="75px">
              <Stack width={"100vw"} direction={"row"} justifyContent="center">
                {/* <Box onClick={prev}>
                  <ArrowBackIosNewIcon
                    onMouseEnter={projectEnter}
                    onMouseLeave={projectLeave}
                    sx={[
                      { marginRight: "150px" },
                      { scale: "2.5" },
                      { marginTop: "230px" },
                      { backgroundColor: "#fff" },
                      { borderRadius: "100%" },
                      { padding: "5px" },
                    ]}
                  ></ArrowBackIosNewIcon>
                </Box> */}

                <Stack className="code-editor" width={1000} height={500}>
                  <Editor
                    theme="vs-dark"
                    language="c"
                    className="message"
                    value={content}
                    onChange={handleChange}
                  />
                </Stack>

                {/* <Box onClick={next}>
                  <ArrowForwardIosIcon
                    onMouseEnter={projectEnter}
                    onMouseLeave={projectLeave}
                    sx={[
                      { marginLeft: "150px" },
                      { scale: "2.5" },
                      { marginTop: "230px" },
                      { backgroundColor: "#fff" },
                      { borderRadius: "100%" },
                      { padding: "5px" },
                    ]}
                  ></ArrowForwardIosIcon>
                </Box> */}
              </Stack>

              <div className="contact">
                {/* <SideDrawer
                  colorCode={color}
                  code={message}
                  onHoverCursorVariant="hammer"
                ></SideDrawer> */}
                <Button variant="contained">Submit</Button>
              </div>
            </Stack>
          </Stack>
        </div>
      )}
    </AnimatedPage2>
  );
}
