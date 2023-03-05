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
import useSubmissionStore from "../utils/store/useSubmissionStore";

export default function Round1(props) {
  const [content, setContent] = useState(quizQuestions[0]);
  const [Variant, setCursorVariant] = useState("default");
  const [hammer, setHammer] = useState(false);
  const [isHovering, setHover] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const [setHoveringState, setCursorContent] = useCursorStore((state) => [
    state.setHoveringState,
    state.setCursorContent,
  ]);
  const [attempts, questionNo, setQuestionNumber, resetAttempts] =
    useSubmissionStore((state) => [
      state.attempts,
      state.questionNo,
      state.setQuestionNumber,
      state.resetAttempts,
    ]);

  useEffect(() => {
    setHoveringState(false);
    setCursorContent(false);
  }, []);

  const { state } = useLocation();
  const name = state.name;

  const moveIn = () => {
    navigate("/thank");
  };

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const [message, setMessage] = useState(quizQuestions[0]);
  const handleChange = (value) => {
    setMessage(value);

    console.log(message);
  };

  const next = () => {
    setQuestionNumber(1);
    resetAttempts();

    if (questionNo == 5) setIsCompleted((v) => true);
  };

  return (
    <AnimatedPage2>
      {isCompleted && <ExitModal />}

      {!isCompleted && (
        <div ref={ref} className="round-1">
          {/* <motion.div
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
          </motion.div> */}
          <Stack sx={[{ backgroundColor: "#d8d8eb" }, { height: "100vh" }]}>
            <Stack>
              <Typography
                onMouseEnter={() => setHoveringState(true, "#fff")}
                onMouseLeave={() => setHoveringState(false)}
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
                    {/* <Box onClick={prev}>
                      <ArrowBackIosNewIcon
                        onMouseEnter={() => setHoveringState(true, "#fff")}
                        onMouseLeave={() => setHoveringState(false)}
                        sx={[
                          { marginRight: "40px" },
                          { scale: "2.5" },
                          { marginTop: "230px" },
                          { backgroundColor: "#fff" },
                          { borderRadius: "100%" },
                          { padding: "5px" },
                        ]}
                      ></ArrowBackIosNewIcon>
                    </Box> */}

                    <Stack className="code-editor" width={800} height={450}>
                      <Editor
                        theme="vs-dark"
                        language="c"
                        className="message"
                        value={quizQuestions[questionNo]}
                        onChange={handleChange}
                      />
                    </Stack>

                    <Box onClick={next}>
                      <ArrowForwardIosIcon
                        onMouseEnter={() => setHoveringState(true, "#fff")}
                        onMouseLeave={() => setHoveringState(false)}
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
              <div className="contact">
                <SideDrawer
                  colorCode={"#8533ff"}
                  code={message}
                  userName={name}
                  onHoverCursorVariant="spider"
                ></SideDrawer>
              </div>
            </Stack>
          </Stack>
        </div>
      )}
    </AnimatedPage2>
  );
}
