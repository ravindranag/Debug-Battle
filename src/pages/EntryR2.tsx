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
import useCursorStore from "../utils/store/useCursorStore";
import { useEffect } from "react";
import { useFormik } from "formik";
import useRoundTwoStore from "../utils/store/useRoundTwo";

export default function EntryR1() {
  const [branch, setBranch] = React.useState("");
  const [branch2, setBranch2] = React.useState("");
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState(false);
  const [reg, setReg] = React.useState("");
  const [setHoveringState, setCursorContent] = useCursorStore((state) => [
    state.setHoveringState,
    state.setCursorContent,
  ]);
  const [id, setId] = useRoundTwoStore((state) => [state.id, state.setId]);

  useEffect(() => {
    setHoveringState(false);
    setCursorContent(false);
  }, []);
  const [name2, setName2] = React.useState("");
  const [type2, setType2] = React.useState(false);
  const [reg2, setReg2] = React.useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      regdno: "",
      branch: "",
      username2: "",
      regdno2: "",
      branch2: "",
      type: "",
      code: "",
      villainTeamId: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = axios.post("http://localhost:5000/auth", values);
        const id = (await response).data;
        setId(id);
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  const branches = ["CSE", "EE", "ETC", "MME"];

  const sendData = () => {
    axios.post("http://localhost:5000/auth", {
      username: name,
      regdno: reg,
      branch: branch,
      username2: name2,
      regdno2: reg2,
      branch2: branch2,
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

  const ref = React.useRef(null);

  return (
    <AnimatedPage>
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
        </motion.div> */}

        <Box sx={{ border: "10" }}>
          <Stack justifyContent={"center"} alignItems="center" height={"100vh"}>
            <Typography
              onMouseEnter={() => setHoveringState(true, "#fff")}
              onMouseLeave={() => setHoveringState(false)}
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
                  onChange={formik.handleChange}
                  id="username"
                  value={formik.values.username}
                  label="Player 1"
                  sx={{ width: "300px" }}
                />
                <TextField
                  required
                  id="regdno"
                  label="Registration no. of Player1"
                  value={formik.values.regdno}
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                />
                <FormControl fullWidth>
                  <InputLabel id="Branch-Select">Branch</InputLabel>
                  <Select
                    required
                    labelId="Branch"
                    id="branch"
                    value={formik.values.branch}
                    label="Branch of Player 1"
                    onChange={(e) => {
                      formik.setFieldValue("branch", e.target.value);
                    }}
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
                  onChange={formik.handleChange}
                  id="username2"
                  value={formik.values.username2}
                  label="Player 2"
                  sx={{ width: "300px" }}
                />
                <TextField
                  required
                  id="regdno2"
                  label="Registration no of Player 2"
                  value={formik.values.regdno2}
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                />

                <FormControl fullWidth>
                  <InputLabel id="Branch-Select">Branch</InputLabel>
                  <Select
                    required
                    labelId="Branch"
                    id="branch2"
                    value={formik.values.branch2}
                    label="Branch of Player 2"
                    onChange={(e) => {
                      formik.setFieldValue("branch2", e.target.value);
                    }}
                  >
                    {branches.map((items) => (
                      <MenuItem value={items}>{items}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  //   required
                  id="villainTeamId"
                  label="villainTeamId"
                  value={formik.values.villainTeamId}
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                />
              </Stack>
              <Button
                onClick={() => formik.handleSubmit()}
                variant="contained"
                onMouseEnter={() => setCursorContent(true, "groot")}
                onMouseLeave={() => setCursorContent(false)}
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
