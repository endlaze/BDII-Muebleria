import React, {useEffect, useState} from 'react'
import Furniture from './ShowProduct'
import Product from './Product'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios'
import ShowProduct from './ShowProduct';

const useStyles = makeStyles({
  productContainer: {
    marginTop: '50px'
  },
  product: {
    margin: 'auto',
    marginTop: '20px'
  }
})

const ProductList = () => {
  const classes = useStyles();
  const [furnitures, setFurnitures] = useState([])
  const [combos, setCombos] = useState([])
  const [combosStock, setCombosStock] = useState([])
  const [furnitureStock, setFurnitureStock] = useState([])
  const [promotions, setPromotions] = useState([])
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    axios.get('/product/furniture/').then((fornitures) => {
      setFurnitureStock(fornitures.data)
    })
    axios.get('/product/promotion/').then((promotions) => {
      setPromotions(promotions.data)
    })
    axios.get('/product/furniture_combo/').then((combos) => {
      setCombosStock(combos.data)
    })
  }, [])


  useEffect(() => {
    if(furnitureStock.length !== 0) {
      applyDiscounts(setFurnitures, furnitureStock)
    }
    if(combosStock.length !== 0) {
      applyDiscounts(setCombos, combosStock)
    }
  }, [combosStock, promotions, furnitureStock])


  const applyDiscounts = (setter, stockList) => {
    setter(stockList.map((furniture) => { 
      let furn = applyDiscount(furniture) 
      return furn
    }))
  }

  const applyDiscount = (product) => {
    let discount = 0
    let selling = parseInt(product.price)
    let promotion = promotions.find((promotion) => parseInt(promotion.product) === parseInt(product.id) &&
    new Date(promotion.final_date + "T00:00:00") >= new Date())

    if (promotion !== undefined) {
      discount = parseFloat(promotion.discount)
      selling = selling * (1 - discount)
    } 

    return {...product, discount: discount, selling_price: selling}

  }

  const showModal = (products) => {
    setProducts(products)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return(
    <>
      <Container className={classes.productContainer}>
        <Typography variant="h2" gutterBottom> Nuestros productos</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {furnitures.map((product, index) =>
            <Product showModal={showModal} products={[product]} key={index} {...product} product={product} selling_price={product.selling_price}></Product>
          )}
        </Box>
        <Typography variant="h2" gutterBottom> Combos </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {combos.map((product, index) =>
          <>
            <Product showModal={showModal} products={product.combo_products} key={index} {...product} product={product} selling_price={product.selling_price}></Product>
            
          </>
          )}
        </Box>
        <ShowProduct closeModal={closeModal} show={modal} products={products}/>
      </Container>
    </>
    
  );
}

export default ProductList;