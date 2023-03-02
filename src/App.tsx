import "./App.css";
import { Routes, Route } from "react-router-dom";
import Editor from "./pages/CodeEditor";
import Entry from "./pages/Entry";
import Welcome from "./pages/Welcome";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import EntryR1 from "./pages/EntryR1";

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
            <Route path="/" element={<Entry />} />
            <Route path="/Select" element={<Welcome />} />
            <Route path="/Editor" element={<Editor />} />
            <Route path="/Entry" element={<Entry />} />
            <Route path="/EntryR1" element={<EntryR1 />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
