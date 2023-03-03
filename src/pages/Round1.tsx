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

export default function Round1() {
  return (
    <div>
      <Stack sx={[{ backgroundColor: "#d8d8eb" }, { height: "100vh" }]}>
        <Stack>
          <Typography variant="h3">Quallifier Round</Typography>
          <Box sx={{ backgroundColor: "black" }}></Box>
        </Stack>
      </Stack>
    </div>
  );
}
