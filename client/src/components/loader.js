import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "81vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loader;
