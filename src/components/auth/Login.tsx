import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { GoogleOutlined } from "@ant-design/icons";
import { clientId } from "../../share/type";
import { login } from "../../features/authSlice";
import { useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess(res: any) {
      dispatch(login(res.profileObj));
    },
    isSignedIn: true,
    cookiePolicy: "single_host_origin",
  });
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/goods");
    }
  }, [user]);
  return (
    <Stack sx={{ backgroundColor: "aliceblue", height: "100vh" }}>
      <Typography
        variant="h1"
        component="h2"
        sx={{
          margin: "20px auto 20px auto",
          color: "blue",
        }}
      >
        LAZADI
      </Typography>
      <Box
        sx={{
          width: 300,
          height: 400,
          margin: "20px auto 20px auto",
          backgroundColor: "greenyellow",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          endIcon={<GoogleOutlined />}
          onClick={() => signIn()}
        >
          Login with Google
        </Button>
      </Box>
    </Stack>
  );
};

export default Login;
