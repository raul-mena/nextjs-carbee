"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuthContext } from "../context/auth.context";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types";
import { login } from "@/api/services/Login";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputGroup from "../components/InputGroup";

// init loging form validations
const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
});

export default function Login() {
  const { successLogin } = useAuthContext();
  const router = useRouter();

  const submitAction = async ({email, password}: any) => {
    try {
      const result: ApiResponse = await login(email, password);
      if (result.success) {
        successLogin(result.data as string);
        router.push('/dashboard')
      }
    } catch (error) {
      
    }
  };

  return (
    <Container component="main" className="login-box" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" className="black-color">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={submitAction}
          validationSchema={loginSchema}
        >
          <Form>
            <InputGroup name="email" type="text" label="User Name:" />
            <InputGroup name="password" type="password" label="Password:" />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
}