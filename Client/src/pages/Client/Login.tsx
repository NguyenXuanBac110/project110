import React, { useState } from "react";
import { Button, Container, Stack, TextField, Typography, Link, AppBar, Toolbar, Box, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/axiosConfig";

type LoginFormParams = {
  email: string;
  password: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormParams>();

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const onSubmit: SubmitHandler<LoginFormParams> = async (data) => {
    try {
      const res = await axiosInstance.post("/login", data);
      const { accessToken, user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", user.id);
      setSnackbarMessage('Đăng nhập thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        if (user.id === 1) {
          navigate("/admin/product/list");
        } else {
          navigate("/");
        }
      }, 2000); // Adjust the timeout duration if needed
    } catch (error) {
      setSnackbarMessage('Email hoặc mật khẩu không hợp lệ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
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
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" color="inherit">
                Register here
              </Link>
            </Typography>
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

export default Login;
