import * as React from "react";

import {
  Badge,
  Box,
  Button,
  CardActions,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Close,
  Delete,
  Edit,
  ExpandMore,
  Paid,
  PriceCheck,
  ShoppingCart,
} from "@mui/icons-material";
import {
  buyProductsApi,
  deleteProductsApi,
  editProductsApi,
} from "../../features/actionProductSlice";
import {
  fetchProductsApi,
  fetchSortProductsApi,
} from "../../features/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardItem from "./CardItem";
import CardMedia from "@mui/material/CardMedia";
import { ProductList } from "../../share/type";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useEffect } from "react";

const useStyles = makeStyles({
  fab: {
    position: "fixed",
    bottom: 10,
    right: 10,
  },
  modal: {
    width: 500,
    height: 400,
    backgroundColor: "white",
    position: "absolute",
    margin: "auto",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  input: {
    width: "90%",
    marginTop: 5,
    marginLeft: 25,
    marginBottom: 5,
  },
  closeButton: {
    justifyContent: "flex-end",
    display: "flex",
  },
});
const GoodCard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [id, setId] = React.useState(0);
  useEffect(() => {
    dispatch(fetchProductsApi());
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [nameCustomer, setNameCustomer] = React.useState("");
  const [phoneCustomer, setPhoneCustomer] = React.useState("");
  const [addressCustomer, setAddressCustomer] = React.useState("");

  const handleOpen = (
    id: number,
    category: string,
    description: string,
    imgUrl: string,
    price: number
  ) => {
    setId(id);
    setCategory(category);
    setDescription(description);
    setImgUrl(imgUrl);
    setPrice(price);
    setOpen(true);
  };
  const handleSubmit = () => {
    dispatch(editProductsApi({ id, category, description, imgUrl, price }));
    toast.success("Edit Success");
    setOpen(false);
    setCategory("");
    setDescription("");
    setImgUrl("");
    setPrice(0);
  };
  const handleCloseSp = () => setOpenSp(false);
  const [openSp, setOpenSp] = React.useState(false);
  const [listProducts, setListProducts] = React.useState<ProductList[]>([]);
  const handleBuyCart = (
    id: number,
    category: string,
    imgUrl: string,
    price: number
  ) => {
    setListProducts((prev) => {
      const isAdded = prev.find((item) => item.id === id);
      if (isAdded) {
        return prev.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...listProducts,
          id,
          category,
          imgUrl,
          price,
          amount: 1,
        },
      ];
    });
  };

  const getTotalItem = (items: ProductList[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  const getTotalMoney = (items: ProductList[]) => {
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.price,
      0
    );
  };

  const handleRemoveCard = (id: number) => {
    setListProducts((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ProductList[])
    );
  };

  const handleBuyProducts = (items: ProductList[]) => {
    if (nameCustomer === "" || addressCustomer === "" || phoneCustomer === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
    } else {
      dispatch(
        buyProductsApi({
          customerName: nameCustomer,
          addressCustomer: addressCustomer,
          phoneNumber: phoneCustomer,
          productBuy: items,
          totalMoney: getTotalMoney(items),
          totalProducts: getTotalItem(items),
        })
      );

      toast.success("Mua hàng thành công đơn hàng sẽ sớm được giao đến bạn");
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [sort, setSort] = React.useState("Phù hợp nhất");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" component="h2">
            Sắp xếp theo:
          </Typography>
          <Button
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            endIcon={<ExpandMore />}
          >
            {sort}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                setSort("Phù hợp nhất");
              }}
            >
              Phù hợp nhất
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                setSort("Giá từ thấp đến cao");
                dispatch(fetchSortProductsApi("desc"));
              }}
            >
              Giá từ thấp đến cao
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                setSort("Giá từ cao đến thấp");
                dispatch(fetchSortProductsApi("asc"));
              }}
            >
              Giá từ cao đến thấp
            </MenuItem>
          </Menu>
        </Box>
        <Box
          sx={{
            position: "fixed",
            right: 0,
          }}
        >
          <Button
            onClick={() => {
              setOpenSp(true);
            }}
          >
            <Badge badgeContent={getTotalItem(listProducts)} color="error">
              <ShoppingCart />
            </Badge>
          </Button>
        </Box>
      </Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: 500,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        onClose={handleCloseSp}
        open={openSp}
      >
        <Typography variant="h4" component="body">
          Your cart
        </Typography>
        {listProducts.length === 0 ? (
          <Typography mt={2} variant="h4" component="div">
            No item in cart
          </Typography>
        ) : (
          <>
            <Typography variant="h4" component="body">
              Total money:{getTotalMoney(listProducts)} $
            </Typography>
            <CardItem
              listItem={listProducts}
              handleBuyCart={handleBuyCart}
              handleRemoveCard={handleRemoveCard}
            />
            <TextField
              label="nameCustomer"
              className={classes.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNameCustomer(e.target.value)
              }
            />
            <TextField
              label="phoneCustomer"
              className={classes.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneCustomer(e.target.value)
              }
            />
            <TextField
              label="addressCustomer"
              className={classes.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddressCustomer(e.target.value)
              }
            />
            <Button
              onClick={() => handleBuyProducts(listProducts)}
              endIcon={<PriceCheck />}
            >
              Buy
            </Button>
          </>
        )}
      </Drawer>
      {products?.map((product) => (
        <Card key={product.id} sx={{ mb: 5, height: "auto" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.category}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="500px"
            image={product.imgUrl}
            alt={product.title}
          />
          <CardContent>
            <Typography>{product.description}</Typography>
            <Typography variant="h5" component="div">
              {product.price} $
            </Typography>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  handleBuyCart(
                    product.id,
                    product.category,
                    product.imgUrl,
                    product.price
                  );
                }}
              >
                <Paid />
              </Button>
              <Button
                onClick={() => {
                  handleOpen(
                    product.id,
                    product.category,
                    product.description,
                    product.imgUrl,
                    product.price
                  );
                }}
              >
                <Edit />
              </Button>
              <Button
                onClick={() => {
                  if (window.confirm("Are you sure about that?")) {
                    dispatch(deleteProductsApi(product.id));
                    toast.success("Delete success");
                  }
                }}
              >
                <Delete />
              </Button>
            </CardActions>
          </CardContent>
          <Modal open={open} onClose={handleClose}>
            <Box className={classes.modal}>
              <Box className={classes.closeButton}>
                <Tooltip title="Close modal" placement="right">
                  <IconButton onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                label="Category"
                variant="outlined"
                className={classes.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
                autoComplete="off"
                defaultValue={category}
              />
              <TextField
                label="ImgUrl"
                variant="outlined"
                className={classes.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImgUrl(e.target.value)
                }
                autoComplete="off"
                defaultValue={imgUrl}
              />
              <TextField
                label="Desciption"
                variant="outlined"
                className={classes.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
                autoComplete="off"
                defaultValue={description}
              />
              <TextField
                id="price-number"
                label="Price"
                variant="outlined"
                className={classes.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(parseFloat(e.target.value))
                }
                autoComplete="off"
                defaultValue={price}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Button onClick={handleSubmit}>Submit</Button>
              </Box>
            </Box>
          </Modal>
        </Card>
      ))}
    </>
  );
};

export default GoodCard;
