import React, { useState } from "react";
import { AppBar, Box, Button, Container, Stack, TextField, Toolbar, Typography, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormParams>();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      await axios.post("http://localhost:3000/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setSnackbarMessage("Đăng ký thành công");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adjust the timeout duration if needed
    } catch (error) {
      setSnackbarMessage("Email hoặc username đã tồn tại");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const password = watch("password");

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            <img src="https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Typography>
          <Box>
            <Button color="inherit" style={{ color: 'black' }}>Home</Button>
            <Button color="inherit" style={{ color: 'black' }}>Bags</Button>
            <Button color="inherit" style={{ color: 'black' }}>Sneakers</Button>
            <Button color="inherit" style={{ color: 'black' }}>Belt</Button>
            <Button color="inherit" style={{ color: 'black' }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" textAlign={"center"} mb={2}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <TextField
              label="Username"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors?.username?.message}
              helperText={errors?.username?.message}
            />
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <TextField
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: value =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              error={!!errors?.confirmPassword?.message}
              helperText={errors?.confirmPassword?.message}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
