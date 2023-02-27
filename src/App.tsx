import "./App.css";
import { Routes, Route } from "react-router-dom";
import Editor from "./pages/CodeEditor";
import Entry from "./components/Entry";
import Welcome from "./pages/Welcome";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Rajdhani",
    },
    palette: {
      secondary: {
        light: "#ff0000",
        main: "#ff0000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Editor" element={<Editor />} />
            <Route path="/Entry" element={<Entry />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
