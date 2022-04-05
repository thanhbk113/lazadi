import "react-toastify/dist/ReactToastify.css";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchProductsApi, fetchProductsApiFitler } from "../../features/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import AddProduct from "./AddProduct";
import GoodCard from "./GoodCard";
import { LoadingOutlined } from "@ant-design/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { Search } from "@mui/icons-material";
import { clientId } from "../../share/type";
import { logout } from "../../features/authSlice";
import { useGoogleLogout } from "react-google-login";
import { useState } from "react";

const Goods = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess() {
      dispatch(logout());
    },
  });
  const [nameCategory, setNameCategory] = useState("");
  const loading = useAppSelector((state) => state.productActions.loading);
  useEffect(() => {
    if (nameCategory === "") {
      dispatch(fetchProductsApi());
    }
  }, [nameCategory])

  return (
    <Stack>

      <AppBar>
        <Toolbar>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              color: "blue",
            }}
          >
            LAZADI
          </Typography>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: 60,
            m: 5,
            border: "1px solid",
            borderRadius: 4
          }}>
            <IconButton onClick={() => {
              if (nameCategory === "") {
                toast.error("Please input category and click search button")
              }
              else {
                dispatch(fetchProductsApiFitler(nameCategory))
              }
            }}>
              <Search sx={{
                ml: 1
              }}
              />
            </IconButton>
            <InputBase autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameCategory(e.target.value)} />
          </Box>
          <Box
            sx={{
              right: 0,
              display: "flex",
              flexDirection: "column",
              m: 1,
              position: "absolute",
            }}
          >
            <IconButton>
              <Avatar
                src={user.imageUrl}
                id="user-button"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </IconButton>
            <Typography variant="h6" component="h1">
              {user.familyName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-placeholder": "user-button",
        }}
      >
        <MenuItem onClick={handleClose}>{user.name}</MenuItem>
        <Button
          sx={{
            m: 3,
          }}
          endIcon={<LogoutIcon />}
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </Menu>
      <Box
        sx={{
          mt: 15,
        }}
      >
        <ToastContainer />
        {loading ? <LoadingOutlined /> : (
          <Box>
            <GoodCard />
          </Box>
        )}
      </Box>
      <Button>
        <AddProduct />
      </Button>

    </Stack>
  );
};

export default Goods;
