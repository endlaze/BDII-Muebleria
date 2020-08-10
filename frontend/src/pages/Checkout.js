import React, { useContext, useState, useEffect } from 'react'
import { Checkbox, Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'
import Cart from '../components/Cart';
import AddressPicker from '../components/AddressPicker';
import Payments from '../components/Payments'
import browserStore from 'store'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}));

const Checkout = () => {
  const classes = useStyles();
  const [store, dispatch] = useStore();
  const [address, setAddress] = useState('')
  const email = useInput('')
  const name = useInput('')
  const [total, setTotal] = useState(0)
  const [deliver, setDeliver] = useState(false)

  const {login_type} = browserStore.get('user')
  let history = useHistory();

  const placeOrder = () => {
    const { cedulaCliente, login_type, idSucursal, cedulaEmpleado } = browserStore.get('user')
    if (login_type === 'client') {
      axios.post('/order/online/', {
        entrega: false,
        productos: store.cart.map((prod) => ({codigoProducto: prod.codigoProducto, cantidad: prod.quantity, precioCobrado: prod.precio})),
        cedulaCliente: cedulaCliente
      }).then((res)=> {
        dispatch({type: 'clear-cart'})
        history.replace('/orders');
      })

    } else {
      axios.post('/order/onsite/', {
        productos: store.cart.map((prod) => ({codigoProducto: prod.codigoProducto, cantidad: prod.quantity, precioCobrado: prod.precio})),
        cedulaEmpleado: cedulaEmpleado,
        idSucursal: idSucursal,
        client_id: name.value,
        client_email: email.value,
      }).then((res)=> {
        dispatch({type: 'clear-cart'})
        history.replace('/orders');
      })
    }
    
  }



  return (
    <>
      <Container>
        <Box className={classes.paper}>
          <Typography variant="h2">
            Carrito
        </Typography>
        </Box>
        {store.cart.length > 0 ?
          <div>
            <Cart total={total} setTotal={setTotal}/>
            {login_type === 'client' ? 
              <>
                <div className={classes.input}>
                  <Typography variant="subtitle1">
                    Seleccione una direccion
                  </Typography>
                  <AddressPicker address={address} setter={setAddress}/>
                </div>
                <div className={classes.input}>
                  <Typography variant="subtitle1">
                    Datos de tarjeta de credito
                  </Typography>
                  <TextField label="Número de tarjeta" variant="outlined" className={classes.input} />
                  <TextField label="Fecha de vencimiento" variant="outlined" className={classes.input} />
                  <TextField label="CVV" variant="outlined" className={classes.input} />
                  <Checkbox
                    checked={deliver}
                    onChange={setDeliver(!deliver)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </div>
              </>
              :
              <>
                <div className={classes.input}>
                  <Typography variant="subtitle1">
                    Forma de pago
                  </Typography>
                  <TextField {...name} label="Nombre de cliente" variant="outlined" className={classes.input} />
                  <TextField {...email} label="Email del cliente" variant="outlined" className={classes.input} />
                </div>
                
                <div className={classes.input}>
                  <Payments/>
                </div>
                
              </>
            }
            
            <div>
              <Button variant="contained" color="primary" onClick={()=> placeOrder()}>
                Pagar
              </Button>
            </div>
          </div>
          :
          <Box className={classes.paper}>
            <Typography variant="h4">
              Su carrito esta vacio
          </Typography>
          </Box>
        }
      </Container>
    </>
  );
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value: value,
    onChange: handleChange
  }
}

export default Checkout;