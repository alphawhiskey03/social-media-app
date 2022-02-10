import { Paper, TextField, Container, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import PopAlert from "../../components/popAlert";

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

const REGISTER_USER = gql`
  mutation ($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      username
      token
      email
      createdAt
    }
  }
`;
const Register = () => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { data, loading, error, called }] = useMutation(
    REGISTER_USER,
    {
      update(_, { data: { register: userData } }) {
        context.login(userData);
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions);
      },
      variables: {
        registerInput: values,
      },
    }
  );
  const onSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    addUser();
    console.log(error);
  };

  return (
    <>
      <Container align="center" justify="center">
        <Paper className={classes.Paper} elevation={5}>
          <Typography variant="h5" align="left">
            REGISTER
          </Typography>
          <TextField
            className={classes.TextField}
            label="Username"
            name="username"
            color={errors && errors.username ? "error" : "info"}
            type="text"
            onChange={onChange}
          />
          <TextField
            className={classes.TextField}
            label="Password"
            name="password"
            color={errors && errors.password ? "error" : "info"}
            type="password"
            onChange={onChange}
          />
          <TextField
            className={classes.TextField}
            label="Confirm Password"
            name="confirmPassword"
            color={errors && errors.confirmPassword ? "error" : "info"}
            type="password"
            onChange={onChange}
          />
          <TextField
            className={classes.TextField}
            label="Email"
            name="email"
            color={errors && errors.email ? "error" : "info"}
            type="email"
            color="info"
            onChange={onChange}
          />
          <Button
            className={classes.Button}
            color="info"
            variant="contained"
            onClick={onSubmit}
          >
            {loading ? "loading..." : "submit"}
          </Button>
        </Paper>
        <PopAlert errors={errors} />
      </Container>
    </>
  );
};

export default Register;
