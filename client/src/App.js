import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/register/register";
import Home from "./Pages/home/home";
import Login from "./Pages/login/login";
import Layout from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/auth";

const theme = createTheme({
  typography: {
    fontFamily: `'Roboto', sans-serif`,
  },
  mode: "dark",
  palette: {
    primary: {
      main: "#bbdefb",
    },
    secondary: {
      main: "#e8f4fd",
    },
    text: {
      primary: "#093170",
    },
  },
});
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"register"} element={<Register />} />
                <Route exact path={"/login"} element={<Login />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
