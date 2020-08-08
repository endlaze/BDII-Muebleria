
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES

export const updateOrderState = (req, res) => {
    connection.on('connect', (err) => {
        console.log(err)
    })

    const request = new Request('usp_actualizarEstadoOrden', err => console.log(err));

    const consecutivo = parseInt(req.body.consecutivo)
    const idSucursal = parseInt(req.body.idSucursal)
    const nuevoEstadoOrden = parseInt(req.body.nuevoEstadoOrden)

    request.addParameter('consecutivo', TYPES.Int, consecutivo);
    request.addParameter('idSucursal', TYPES.Int, idSucursal);
    request.addParameter('nuevoEstadoOrden', TYPES.Int, nuevoEstadoOrden);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        let msg = returnStatus ? 'No se pudo actualizar el estado de la orden' : 'Se actualizó el estado de la orden correctamente'
        res.status(returnStatus ? 500 : 200).send({ status: returnStatus, msg: msg })
    });

    connection.callProcedure(request);
}
