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
import { Close, Search } from "@mui/icons-material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchProductsApi, fetchProductsApiFitler } from "../../features/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import AddProduct from "./AddProduct";
import GoodCard from "./GoodCard";
import { LoadingOutlined } from "@ant-design/icons";
import LogoutIcon from "@mui/icons-material/Logout";
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
  const [openS, setopenS] = useState(false);
  return (
    <Stack>

      <AppBar sx={{
        height: {
          xs: 100,
          sm: "auto"
        }
      }}>
        <Toolbar>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              color: "blue",
              display: {
                xs: "none",
                sm: 'block'
              }
            }}
          >
            LAZADI
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: "blue",
              display: {
                xs: "block",
                sm: 'none'
              }
            }}
          >
            LD
          </Typography>
          <Box sx={{
            alignItems: "center",
            position: "absolute",
            right: 60,
            m: 5,
            border: "1px solid",
            borderRadius: 4,
            display: {
              xs: "none",
              md: 'block'
            }
          }}>
            <IconButton onClick={() => {
              if (nameCategory === "") {
                toast.error("Vui lòng nhập tên mặt hàng và nhấn nút tìm")
              }
              else {
                dispatch(fetchProductsApiFitler(nameCategory))
              }
            }}>
              <Search sx={{
                ml: 1,
              }}
              />
            </IconButton>
            <InputBase placeholder="Searching..." autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameCategory(e.target.value)} />
          </Box>
          <Box sx={{
            alignItems: "center",
            position: "absolute",
            right: 60,
            mr: openS ? 0 : 3,
            borderRadius: 4,
            display: {
              xs: "flex",
              md: 'none'
            },
          }}>
            <IconButton onClick={() => {
              if (!openS) {
                setopenS(true)
              }
              else {

                if (nameCategory === "" && openS === true) {
                  toast.error("Vui lòng nhập tên mặt hàng và nhấn nút tìm")
                }
                else {
                  dispatch(fetchProductsApiFitler(nameCategory))
                  setopenS(false)
                }
              }
            }}>
              <Search sx={{
                ml: 1,
              }}
              />
            </IconButton>
            <InputBase sx={{
              display: openS ? 'flex' : "none",
              width: "100px"
            }}
              placeholder="Searching..." autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameCategory(e.target.value)} />
            <IconButton onClick={() => setopenS(false)} sx={{ display: openS ? 'flex' : "none", }}>
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              right: 0,
              display: openS ? "none" : "flex",
              flexDirection: "column",
              m: 1,
              position: "absolute",
              mt: 3

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

    </Stack >
  );
};

export default Goods;
