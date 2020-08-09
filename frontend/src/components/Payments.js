import React, { useContext, useState, useEffect } from 'react'
import { Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'

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

const Payments = () => {
  const classes = useStyles();

  return (
    <>
        <div>
          <div>
            <Typography variant="subtitle1">
              Forma de pago
            </Typography>
            <FormControl className={classes.input}>
              <InputLabel>Metodo de pago</InputLabel>
              <Select>
                <MenuItem value={1}>Efectivo</MenuItem>
                <MenuItem value={2}>Tarjeta</MenuItem>
                <MenuItem value={3}>Deposito</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
    </>
  );
}

export default Payments;