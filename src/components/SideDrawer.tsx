import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SideDrawer(props) {
  const [attempt, setAttempt] = useState(0);
  const [penality, setPenality] = useState(0);

  const sendCode = () => {
    setAttempt(attempt + 1);

    const tes1 = `#include <stdio.h>
    int main() {    
    
        int number1, number2, sum;
        
        printf("Enter two integers: ");
        scanf("%d %d", &number1, &number2);
    
        // calculating sum
        sum = number1 + number2;      
        
        printf("%d + %d = %d", number1, number2, sum);
        return 0;
    }
    `;
    const tes2 = `#include <stdio.h>
    int main() {    
    
        int number1, number2, sum;
        
        printf("Enter two integers: ");
        scanf("%d %d", &number1, &number2);
    
        // calculating sum
        sum = number1 + number2;      
        
        printf("%d + %d = %d", number1, number2, sum);
        return 0;
    }
    `;

    axios
      .get(
        `https://api.dandelion.eu/datatxt/sim/v1/?text1=${tes1}&text2=${tes2}&token=d0fb2bd69bb14042b827cb9e75d75bb4`
      )
      .then((response) => {
        const success = response;

        console.log(success);
      })
      .catch((error) => {
        console.log(error);
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

  function contactEnter(event: any) {
    setCursorVariant("contact");
  }

  function contactLeave(event: any) {
    setCursorVariant("default");
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
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
      <motion.div
        variants={variants}
        className="circle"
        animate={Variant}
        transition={spring}
        style={{
          // mixBlendMode: isHovering ? "difference" : "normal",
          width: "30px",
          height: "30px",
        }}
      >
        {/* {hammer && <img src={"hammer.png"} alt="shirt" />} */}
      </motion.div>

      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["Compile", "Starred"].map((text) => (
            <ListItem key={text}>
              <Avatar src="mjolnir.svg" />
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <Stack
          border={2}
          height="68vh"
          direction={"column"}
          paddingY="25px"
          gap="50px"
          alignItems={"center"}
        >
          <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
            No of attempts:
          </Typography>

          <Typography sx={[{ fontSize: "38px" }, { fontWeight: "900" }]}>
            {attempt}
          </Typography>

          <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
            Penalty:
          </Typography>

          <Typography sx={[{ fontSize: "38px" }, { fontWeight: "900" }]}>
            0
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
