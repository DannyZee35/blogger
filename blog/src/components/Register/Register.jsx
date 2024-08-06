import authService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input, ButtonComponent, Wrapper } from "../index";
import { Text } from "../Text";
import { theme } from "../Theme/Theme";
import { Loader } from "../Loader";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    setError("");
setLoading(true)
    try {
      const session = await authService.Register(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/all-posts");
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
        {error && <p>{error}</p>}

        <Box component="form" onSubmit={handleSubmit(signup)}>
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
                  text="Create Your Account"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                />
                <Text
                  text="Join our community and start sharing your stories today."
                  paragraph
                />
              </Box>

              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
                fullWidth
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
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
                  size="large"
                  sx={{ textTransform: "none", color: "white" }}
                  fullWidth
                  type="submit"
                  text={"Create Account"}
                  color="primary"
                />
              )}
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography paragraph>
                  Already Have An Account
                  <Link className="login" to={"/login"}>
                    {" "}
                    Login
                  </Link>
                </Typography>

                {/* <ButtonComponent text={"Login"}  onClick={()=>navigate('/login')}/> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};
