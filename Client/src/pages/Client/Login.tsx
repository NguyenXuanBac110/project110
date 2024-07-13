import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/axiosConfig";

type LoginFormParams = {
  username: string;
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormParams>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormParams> = async (data) => {
    try {
      const res = await axiosInstance.post("/login", data);
      const { accessToken, user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", user.id);
      alert('Đăng nhập thành công');
      if (user.id === 1) {
        navigate("/admin/product/list");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert('email hoặc mk không hợp lệ')
      console.error(error);
    }
  };

  return (
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
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
