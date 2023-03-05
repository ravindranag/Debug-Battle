import "./App.css";
import { Routes, Route, createMemoryRouter } from "react-router-dom";
import Editor from "./pages/CodeEditor";
import Entry from "./pages/Entry";
import Welcome from "./pages/Welcome";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import EntryR1 from "./pages/EntryR2";
import Instruction from "./pages/Instruction";
import Round1 from "./pages/Round1";
import ExitModal from "./components/ExitModal";
import Cursor from "./components/Cursor";
import { createMemoryHistory } from "history";
import { useEffect } from "react";

function App() {
  const history = createMemoryHistory();
  const theme = createTheme({
    typography: {
      fontFamily: "Rajdhani",
    },
    palette: {
      primary: {
        main: "#009900",
        dark: "#009900",
      },
      secondary: {
        light: "#ff0000",
        main: "#ff0000",
      },
    },
  });

  useEffect(() => {
    const unlisten = history.listen(({ action, location }) => {
      console.log("route changed");
    });

    return unlisten;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Cursor />
      <CssBaseline enableColorScheme />
      <div className="App">
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route path="/info" element={<Instruction />} />
            <Route path="/Select" element={<Welcome />} />
            <Route path="/Editor" element={<Editor />} />
            <Route path="/Entry" element={<Entry />} />
            <Route path="/EntryR1" element={<EntryR1 />} />
            <Route path="/round1" element={<Round1 />} />
            <Route path="/thank" element={<ExitModal />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
