
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES

export const newProduct = (req, res) => {
    connection.on('connect', (err) => {
        console.log(err)
    })

    const request = new Request('usp_insertarProducto', err => console.log(err));

    request.addParameter('producto', TYPES.NVarChar, JSON.stringify(req.body));
    request.addParameter('foto', TYPES.NVarChar, req.body.foto);
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        let msg = returnStatus ? 'No se pudo insertar el producto' : 'Producto insertado correctamente'
        res.status(returnStatus ? 500 : 200).send({ status: returnStatus, msg: msg })
    });

    connection.callProcedure(request);
}

export const allProducts = (req, res) => {
    const request = new Request('usp_obtenerProductos', err => console.log(err));


    let response = '';

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {

        res.status(200).send(JSON.parse(response))
    });

    request.on("row", columns => {
        columns.forEach((column) => {
            response += column.value;
        })
    });


    connection.callProcedure(request);
} 
