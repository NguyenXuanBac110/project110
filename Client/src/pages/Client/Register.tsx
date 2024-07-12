import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormParams>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data: any) => {
    try {
      await axios.post("http://localhost:3000/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      alert("Register successfully");
      navigate("/login");  // Navigate to the login page
    } catch (error) {
      alert("Email hoặc username đã tồn tại");
      console.error(error);
    }
  };

  // Watch password for confirming it matches confirmPassword
  const password = watch("password");

  return (
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
  );
};

export default Register;
