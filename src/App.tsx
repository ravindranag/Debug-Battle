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
import Instruction from "./pages/Instruction";
import Round1 from "./pages/Round1";
import ExitModal from "./components/ExitModal";

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
