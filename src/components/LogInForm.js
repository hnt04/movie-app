import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, InputAdornment, Stack, Typography, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormProvider, FTextField, FCheckbox } from "./form/index.js";
import { useAuth } from "../auth/AuthContext";

export default function Form() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";
  function onDismiss() {
    navigate(-1);
  }
  const defaultValues = {
    email: "movie@cs.vn",
    password: "123456",
    remember: true,
  };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    auth.signIn(data.email, () => {
    navigate(from, { replace: true });
    });
  };
  return (
    <Modal
      open={true}
      onBackdropClick={() => onDismiss()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2em",
      }}
      className="modal-login"
    >
      <Box>
        <Paper
          elevation={8}
          style={{
            borderRadius: "20px",
          }}
        >
          <div style={{ padding: "3rem" }}>
            <Typography
              color="secondary"
              variant="h3"
              textAlign="center"
              mb={3}
              className="title-login"
            >
              Log in
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} xs={3}>
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <FTextField name="email" label="Email" />
                <FTextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="secondary"
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <FCheckbox name="remember" label="Remember me" />
              </Stack>
              <Stack>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  loading={isSubmitting}
                  className="button-login"
                >
                  Log In
                </LoadingButton>
              </Stack>
            </FormProvider>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
}