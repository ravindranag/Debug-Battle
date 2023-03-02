import React from "react";
import { useState } from "react";
import { Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import useMouse from "@react-hook/mouse-position";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { Box } from "@mui/material";
import axios from "axios";
import { Divider } from "@mui/material";

export default function EntryR1() {
  const [branch, setBranch] = React.useState("");
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState(false);
  const [reg, setReg] = React.useState("");

  const branches = ["CSE", "EE", "ETC", "MME"];

  const handleChange = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
  };

  const nameChange = (event) => {
    setName(event.target.value as string);
  };

  const regChange = (event) => {
    setReg(event.target.value as string);
  };

  const sendData = () => {
    axios.post("http://localhost:5000/auth", {
      username: name,
      regdno: reg,
      branch: branch,
    });
  };
  const moveIn = () => {
    sendData();
    navigate("/Select", {
      state: {
        name: name,
      },
    });
  };

  const navigate = useNavigate();
  const [Variant, setCursorVariant] = useState("default");
  const [isHovering, setHover] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
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

  function textEnter(event: any) {
    setHover(!isHovering);
    setImgSrc("");
    setCursorVariant("heroTitle");
  }

  function buttonLeave(event: any) {
    setImgSrc("");
    setType(!type);
    setCursorVariant("default");
  }

  function buttonEnter(event: any) {
    setType(!type);
    setImgSrc("groot.png");
    setCursorVariant("heroTitle");
  }

  function textLeave(event: any) {
    setHover(!isHovering);
    setCursorVariant("default");
  }

  const spring = {
    type: "spring",
    stiffness: 400,
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
            mixBlendMode: isHovering ? "difference" : "multiply",
            width: "30px",
            height: "30px",
          }}
        >
          {type && (
            <span
              style={{
                paddingTop: "70px",
                paddingInlineStart: "150px",
                width: "500px",
                position: "fixed",
                fontWeight: "500",
              }}
            >
              are you ready?
            </span>
          )}
          {type && (
            <img style={{ paddingLeft: "140px" }} src={imgSrc} alt="shirt" />
          )}
        </motion.div>

        <Box sx={{ border: "10" }}>
          <Stack justifyContent={"center"} alignItems="center" height={"100vh"}>
            <Typography
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              fontFamily={"Orbitron"}
              fontSize={"50px"}
              marginBottom="70px"
            >
              Debug Battle
            </Typography>

            <>
              <Stack direction={"column"} gap="20px">
                <TextField
                  required
                  onChange={nameChange}
                  id="Name"
                  label="Player 1"
                  sx={{ width: "300px" }}
                />
                <TextField
                  required
                  id="Registration"
                  label="Registration no. of Player1"
                  value={reg}
                  onChange={regChange}
                  sx={{ width: "300px" }}
                />
                <FormControl fullWidth>
                  <InputLabel id="Branch-Select">Branch</InputLabel>
                  <Select
                    required
                    labelId="Branch"
                    id="select"
                    value={branch}
                    label="Branch of Player 1"
                    onChange={handleChange}
                  >
                    {branches.map((items) => (
                      <MenuItem value={items}>{items}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Divider sx={{ background: "#d1b3ff" }} />
                {/* for player 2 */}

                <TextField
                  required
                  onChange={nameChange}
                  id="Name"
                  label="Player 2"
                  sx={{ width: "300px" }}
                />
                <TextField
                  required
                  id="Registration"
                  label="Registration no of Player 2"
                  value={reg}
                  onChange={regChange}
                  sx={{ width: "300px" }}
                />
                <FormControl fullWidth>
                  <InputLabel id="Branch-Select">Branch</InputLabel>
                  <Select
                    required
                    labelId="Branch"
                    id="select"
                    value={branch}
                    label="Branch of Player 2"
                    onChange={handleChange}
                  >
                    {branches.map((items) => (
                      <MenuItem value={items}>{items}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Button
                onClick={moveIn}
                variant="contained"
                onMouseEnter={buttonEnter}
                onMouseLeave={buttonLeave}
                sx={{ marginTop: "30px" }}
              >
                Enter
              </Button>
            </>
          </Stack>
        </Box>
      </div>
    </AnimatedPage>
  );
}
