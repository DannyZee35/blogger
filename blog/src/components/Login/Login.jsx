import authService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input, ButtonComponent, Wrapper } from "../index";
import { theme } from "../Theme/Theme";
import { Text } from "../Text";
import { Loader } from "../Loader";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");

    try {
      setLoading(true);
      const session = await authService.Login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <>
      <Wrapper>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Box component="form" onSubmit={handleSubmit(login)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                width: 400,
                p: 10,
                border: `1px solid ${theme.palette.primary.main}`,
                mt: 10,
                borderRadius: 5,
              }}
            >
              <Box>
                <Text
                  text="Sign In"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                />
                <Text
                  text="Access your account to read and write your favorite blogs."
                  paragraph
                />
              </Box>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Your Email..."
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                fullWidth
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
                fullWidth
              />
              {loading ? (
                <Loader />
              ) : (
                <ButtonComponent
                  fullWidth
                  size="large"
                  sx={{ textTransform: "none", color: "white" }}
                  type="submit"
                  text={"Sign In"}
                />
              )}
              <Typography paragraph>
                Dont Have An Account ?
                <Link className="login" to={"/signup"}>
                  {" "}
                  Signup
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};
