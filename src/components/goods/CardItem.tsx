import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { ProductList } from "../../share/type";

interface Props {
  listItem: ProductList[];
  handleBuyCart: (
    id: number,
    category: string,
    imgUrl: string,
    price: number
  ) => void;
  handleRemoveCard: (id: number) => void;
}

const CardItem: React.FC<Props> = ({
  listItem,
  handleBuyCart,
  handleRemoveCard,
}) => {
  return (
    <List>
      {listItem.map((product) => (
        <ListItem>
          <Card
            sx={{
              mb: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" component="body">
                {product.category}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt={product.category}
              src={product.imgUrl}
            />
            <CardContent>
              <Typography>Price:{product.price} $</Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  handleRemoveCard(product.id);
                }}
              >
                <Remove />
              </Button>
              <Typography>{product.amount}</Typography>
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
                <Add />
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default CardItem;
