import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";

import { motion } from "framer-motion";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SideDrawer() {
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
        paddingY="35px"
        gap="100px"
        alignItems={"center"}
      >
        <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
          No of attempts:
        </Typography>

        <Typography sx={[{ fontSize: "26px" }, { fontWeight: "700" }]}>
          Penalty:
        </Typography>
      </Stack>

      <Stack
        border={2}
        height="10vh"
        direction={"column"}
        justifyContent="end"
        alignItems={"center"}
      >
        <motion.div whileTap={{ scale: 0.8 }}>
          <Button
            startIcon={<Avatar src={"mjolnir.svg"} />}
            sx={[{ background: "#fff" }, { color: "#000" }]}
            variant="contained"
          >
            hello
          </Button>
        </motion.div>
      </Stack>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={[
              { background: "#0096FF" },
              { ":hover": { background: "#1a75ff" } },
            ]}
            onClick={toggleDrawer(anchor, true)}
          >
            <Typography
              padding={1}
              sx={[{ color: "#000000" }, { fontSize: 15 }]}
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
