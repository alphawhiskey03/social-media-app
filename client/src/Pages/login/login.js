import {
  Paper,
  TextField,
  Container,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { gql, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import PopAlert from "../../components/popAlert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { useForm } from "../../hooks/hooks";
const useStyles = makeStyles({
  Paper: {
    backgroundColor: "#e8f4fd",
    width: 400,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    borderRadius: 15,
    marginTop: 100,
  },
  TextField: {
    marginTop: 15,
    maxWidth: 400,
  },
  Button: {
    marginTop: 15,
  },
});

const LOGIN_USER = gql`
  mutation ($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      username
      token
      email
      createdAt
    }
  }
`;

const Login = () => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(userLogin, {
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login, { data, loading, error, called }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      loginInput: values,
    },
  });
  function userLogin() {
    login();
  }
  return (
    <>
      <Container align="center" justify="center">
        <Paper className={classes.Paper} elevation={5}>
          <Typography variant="h5" align="left">
            LOGIN
          </Typography>
          <TextField
            className={classes.TextField}
            label="Username"
            name="username"
            type="text"
            color={errors && errors.username ? "error" : "info"}
            onChange={onChange}
          />
          <TextField
            className={classes.TextField}
            label="Password"
            name="password"
            type="password"
            color={errors && errors.password ? "error" : "info"}
            onChange={onChange}
          />
          <Button
            className={classes.Button}
            color="info"
            variant="contained"
            onClick={onSubmit}
          >
            submit
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
