import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import { useStore } from '../Store'
import { Paper, Dialog, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
const useStyles = makeStyles({
  product: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  priceBefore: {
    textDecoration: "line-through",
    margin: '0 20px 0 0'
  },
  flex: {
    display: 'flex'
  },
  material: {

  },
  table: {
    minWidth: 650
},
});

const ShowProduct = ({ products, show, closeModal }, props) => {
  const [store, dispatch] = useStore();
  const classes = useStyles();

  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Cantidad' },
    { title: 'Tipo de mueble' },
    { title: 'Materiales' },
])

  return (
    <>
      <Dialog onClose={() => closeModal()} open={show}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {itemsTCols.map((itemCol, index) =>
                <TableCell key={index}>{itemCol.title}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(item =>
              <TableRow key={item.id}>
                <TableCell>
                  <Typography>{item.quantity || 1}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.furn_type.description}</Typography>
                </TableCell>
                <TableCell>
                  {item.materials.map((material)=>
                    <Typography>{material.description}</Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Dialog>
    </>
  );
}

export default ShowProduct;