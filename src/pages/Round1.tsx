import { Box, Stack } from "@mui/material";
import React from "react";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import Editor from "@monaco-editor/react";
import { useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AnimatedPage2 from "../components/AnimatedPage2";
import Countdown from "react-countdown";
import quizQuestions from "../components/quizQuestions";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SideDrawer from "../components/SideDrawer";
import ExitModal from "../components/ExitModal";
import { useNavigate } from "react-router-dom";
import useCursorStore from "../utils/store/useCursorStore";
import { useEffect } from "react";

export default function Round1(props) {
  const [content, setContent] = useState(quizQuestions[0]);
  const [Variant, setCursorVariant] = useState("default");
  const [hammer, setHammer] = useState(false);
  const [isHovering, setHover] = useState(false);
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const [setHoveringState, setCursorContent] = useCursorStore((state) => [
    state.setHoveringState,
    state.setCursorContent,
  ]);

  useEffect(() => {
    setHoveringState(false);
    setCursorContent(false);
  }, []);

  const moveIn = () => {
    navigate("/thank");
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

  function projectEnter(event: any) {
    setHover(!isHovering);
    setCursorVariant("project");
  }

  function projectLeave(event: any) {
    setHover(!isHovering);
    setCursorVariant("default");
  }

  function buttonEnter(event: any) {
    setCursorVariant("contact");
    setHammer(!hammer);
  }

  function buttonLeave(event: any) {
    setCursorVariant("default");
    setHammer(!hammer);
  }

  const cardRef = React.useRef(null);
  const [cardData, setCardData] = useState(1);
  const [quesNo, setNo] = useState(0);
  const [complete, setComplete] = useState(0);
  const [done, setDone] = useState(true);

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
        <div ref={ref} className="round-1">
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
            {hammer && <img src={"spider.png"} alt="shirt" />}
          </motion.div>
          <Stack sx={[{ backgroundColor: "#d8d8eb" }, { height: "100vh" }]}>
            <Stack>
              <Typography
                onMouseEnter={projectEnter}
                onMouseLeave={projectLeave}
                sx={{ marginTop: "20px" }}
                variant="h3"
              >
                Qualifier Round
              </Typography>
              <Box sx={{ backgroundColor: "#d8d8eb" }}>
                <Stack
                  className="code-editor-body-r1"
                  gap={5}
                  marginTop="75px"
                  sx={{ backgroundColor: "#d8d8eb" }}
                >
                  <Stack
                    width={"100vw"}
                    direction={"row"}
                    justifyContent="center"
                    margin={"0 auto"}
                  >
                    <Box onClick={prev}>
                      <ArrowBackIosNewIcon
                        onMouseEnter={projectEnter}
                        onMouseLeave={projectLeave}
                        sx={[
                          { marginRight: "40px" },
                          { scale: "2.5" },
                          { marginTop: "230px" },
                          { backgroundColor: "#fff" },
                          { borderRadius: "100%" },
                          { padding: "5px" },
                        ]}
                      ></ArrowBackIosNewIcon>
                    </Box>

                    <Stack className="code-editor" width={800} height={450}>
                      <Editor
                        theme="vs-dark"
                        language="c"
                        className="message"
                        value={content}
                        onChange={handleChange}
                      />
                    </Stack>

                    <Box onClick={next}>
                      <ArrowForwardIosIcon
                        onMouseEnter={projectEnter}
                        onMouseLeave={projectLeave}
                        sx={[
                          { marginLeft: "40px" },
                          { scale: "2.5" },
                          { marginTop: "230px" },
                          { backgroundColor: "#fff" },
                          { borderRadius: "100%" },
                          { padding: "5px" },
                        ]}
                      ></ArrowForwardIosIcon>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack alignItems={"center"} marginTop="30px">
              <div
                className="contact"
                onMouseEnter={buttonEnter}
                onMouseLeave={buttonLeave}
              >
                <SideDrawer
                  colorCode={"#8533ff"}
                  code={message}
                  userName={props.name}
                ></SideDrawer>
              </div>
            </Stack>
          </Stack>
        </div>
      )}
    </AnimatedPage2>
  );
}
