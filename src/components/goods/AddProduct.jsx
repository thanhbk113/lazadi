import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Fab,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";

import { Box } from "@mui/system";
import { addProductsApi } from "../../features/actionProductSlice";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/hooks";

const useStyles = makeStyles({
  fab: {
    position: "fixed",
    bottom: 10,
    right: 10,
  },
  model: {
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

const AddProduct = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (category === "" || imgUrl === "" || description === "" || price === "") {
      toast.error("Please fill all input");
    } else {
      dispatch(addProductsApi({ category, description, imgUrl, price }));
      toast.success("Submit Success");
      setOpen(false);
      setCategory("");
      setDescription("");
      setImgUrl("");
      setPrice("");
    }
  };
  return (
    <Stack>

      <Tooltip title="Add" placement="left">
        <Fab color="primary" className={classes.fab} onClick={handleOpen}>
          <Add />
        </Fab>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.model}>
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
          />
          <TextField
            label="ImgUrl"
            variant="outlined"
            className={classes.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImgUrl(e.target.value)
            }
            autoComplete="off"
          />
          <TextField
            label="Desciption"
            variant="outlined"
            className={classes.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            autoComplete="off"
          />
          <TextField
            label="Price"
            variant="outlined"
            className={classes.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            autoComplete="off"
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
    </Stack>
  );
};

export default AddProduct;
