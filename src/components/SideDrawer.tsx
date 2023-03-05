import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import useCursorStore from "../utils/store/useCursorStore";
import { useLocation } from "react-router-dom";
import useSubmissionStore, { key } from "../utils/store/useSubmissionStore";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SideDrawer(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [setCursorContent] = useCursorStore((state) => [
    state.setCursorContent,
  ]);
  const [count, setCount] = useState(0);
  //   const [key, setKey] = useState(1);
  const [
    attempts,
    currentKey,
    setAttempts,
    setKey,
    score,
    penalty,
    setScore,
    setPenalty,
    questionNo,
  ] = useSubmissionStore((state) => [
    state.attempts,
    state.currentKey,
    state.setAttempts,
    state.setKey,
    state.score,
    state.penalty,
    state.setScore,
    state.setPenalty,
    state.questionNo,
  ]);

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": key[questionNo],
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        console.log("response.data", response.data.status);

        if (response.data.status.id === 3) setScore(5);
        else {
          setPenalty(-2);
          setScore(-2);
        }

        return;
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleCompile = () => {
    const code: string = props.code;

    console.log(props.code);

    const formData = {
      language_id: 50,
      // encode source code in base64
      source_code: code.toString(),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": key[questionNo],
      },
      data: formData,
    };

    console.log();

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;

        console.log(error);
      });
  };

  const sendCode = () => {
    setAttempts(1);

    if (attempts > 1) {
      console.log("attempts over");
      alert("Attempts over. Please go to the next question.");
      return;
    } else {
      handleCompile();
    }

    const x = localStorage.getItem("username");
    console.log(x);

    axios.post("http://localhost:5000/getCode", {
      username: x,
      code: score,
    });
  };

  const [Variant, setCursorVariant] = useState("default");
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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div ref={ref}>
      {/* <motion.div
        variants={variants}
        className="circle"
        animate={Variant}
        transition={spring}
        style={{
          // mixBlendMode: isHovering ? "difference" : "normal",
          width: "30px",
          height: "30px",
        }}
      > */}
      {/* {hammer && <img src={"hammer.png"} alt="shirt" />} */}
      {/* </motion.div> */}

      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Divider />

        <Stack
          border={2}
          height="87vh"
          direction={"column"}
          paddingY="25px"
          gap="50px"
          alignItems={"center"}
        >
          <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
            No of attempts:
          </Typography>

          <Typography sx={[{ fontSize: "38px" }, { fontWeight: "900" }]}>
            {attempts}
          </Typography>

          <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
            Score:
          </Typography>

          <Typography sx={[{ fontSize: "38px" }, { fontWeight: "900" }]}>
            {score}
          </Typography>

          <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
            Penalty:
          </Typography>

          <Typography sx={[{ fontSize: "38px" }, { fontWeight: "900" }]}>
            {penalty}
          </Typography>
        </Stack>

        <Stack
          height="10vh"
          direction={"column"}
          justifyContent="end"
          alignItems={"center"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Button
              onClick={sendCode}
              sx={[
                { background: props.colorCode },
                {
                  "&:hover": {
                    backgroundColor: "#228B22",
                  },
                },
              ]}
              variant="contained"
            >
              Submit
            </Button>
          </motion.div>
        </Stack>
      </Box>
    </div>
  );

  return (
    <div ref={ref}>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={[
              { background: props.colorCode },
              { ":hover": { background: "#1a75ff" } },
            ]}
            onClick={toggleDrawer(anchor, true)}
            onMouseEnter={() =>
              setCursorContent(true, props.onHoverCursorVariant)
            }
            onMouseLeave={() => setCursorContent(false)}
          >
            <Typography
              padding={1}
              sx={[{ color: "#000000" }, { fontSize: 15 }, { fontWeight: 900 }]}
            >
              Ready to test
            </Typography>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
