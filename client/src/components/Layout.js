import { Container, Box } from "@mui/material";
import MenuBar from "./MenuBar";

const Layout = ({ children }) => {
  return (
    <>
      <MenuBar />
      <Container>
        <Box style={{ marginTop: 20 }}>{children}</Box>
      </Container>
    </>
  );
};
export default Layout;
