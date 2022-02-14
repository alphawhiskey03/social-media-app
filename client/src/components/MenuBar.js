import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import AcUnitIcon from "@mui/icons-material/AcUnit";
export default function MenuBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = React.useContext(AuthContext);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="secondary"
        style={{
          borderBottom: "none",
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
              setAnchorEl(null);
            }}
            color="text.primary"
            style={{ cursor: "pointer" }}
          >
            <AcUnitIcon />
          </Typography>
          <Typography>{user && user.username ? user.username : ""}</Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ color: "text.primary" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user ? (
              <>
                <MenuItem
                  onClick={() => {
                    logout();
                    setAnchorEl(null);
                  }}
                >
                  logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/register");
                    setAnchorEl(null);
                  }}
                >
                  Register
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    setAnchorEl(null);
                  }}
                >
                  Login
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
