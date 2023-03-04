import React, { useEffect } from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import heroGuys from "../components/heroguys";
import evilGuys from "../components/evilguys";
import useCursorStore from "../utils/store/useCursorStore";

export default function Welcome() {
  const navigate = useNavigate();
  const [Variant, setCursorVariant] = useState("default");
  const [type, setType] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [isHovering, setHover] = useState(false);
  const [isRedOpen, setIsRedOpen] = useState(false);
  const [isBlueOpen, setIsBlueOpen] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [display, setDisplay] = useState(true);
  const [setHoveringState, setCursorContent] = useCursorStore((state) => [
    state.setHoveringState,
    state.setCursorContent,
  ]);

  useEffect(() => {
    setHoveringState(false);
  }, []);

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

  const navigationHero = (color) => {
    const result1 = getRandomItem(heroGuys);
    const result2 = getRandomItem(heroGuys);
    // console.log("name:"+result1);
    // console.log("name:"+result2);

    navigate("/editor", {
      state: {
        Type: "Hero",
        color: color,
        grad: "linear-gradient(to left,rgb(33, 114, 221),rgb(255, 255, 255, 0))",
        prop1: result1,
        prop2: result2,
      },
    });
  };

  const navigationVillian = (color) => {
    const result1 = getRandomItem(evilGuys);
    const result2 = getRandomItem(evilGuys);
    navigate("/editor", {
      state: {
        Type: "Villian",
        color: color,
        grad: "linear-gradient(to left, rgb(230, 26, 26),rgb(255, 255, 255, 0))",
        prop1: result1,
        prop2: result2,
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
      <div>
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
        </motion.div> */}

        <Stack
          height={"100vh"}
          gap="100px"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            onMouseEnter={() => setHoveringState(true, "#fff")}
            onMouseLeave={() => setHoveringState(false)}
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
            gap="64px"
          >
            <motion.div
              //   layout
              //   onMouseEnter={villianArenaEntry}
              //   onMouseLeave={villianArenaLeave}
              onMouseEnter={() => setCursorContent(true, "hero")}
              onMouseLeave={() => setCursorContent(false)}
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
              <img
                src="heroes.jpg"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  objectFit: "contain",
                }}
              />
            </motion.div>

            <motion.div
              //   layout
              //   onMouseEnter={heroArenaEntry}
              //   onMouseLeave={heroArenaLeave}
              onMouseEnter={() => setCursorContent(true, "villain")}
              onMouseLeave={() => setCursorContent(false)}
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
              <img
                src="villians.jpg"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </Stack>
        </Stack>
      </div>
    </AnimatedPage>
  );
}
