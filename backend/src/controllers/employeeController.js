
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES

export const createEmployee = (req, res) => {
    connection.on('connect', (err) => {
        console.log(err)
    })

    const request = new Request('usp_insertarEmpleado', err => console.log(err));

    const idSucursal = parseInt(req.body.idSucursal)
    const cedulaEmpleado = parseInt(req.body.cedulaEmpleado)
    const nombre = parseInt(req.body.nombre)
    const apellido1 = parseInt(req.body.apellido1)
    const apellido2 = parseInt(req.body.apellido2)
    const fechaContratacion = parseInt(req.body.fechaContratacion)
    const contrasena = parseInt(req.body.contrasena)
    const idTipoEmpleado = parseInt(req.body.idTipoEmpleado)

    let json = req.body
  

    if (json.foto !== undefined) {
      let foto;
      foto = new Buffer(json.foto, 'base64');
      delete json.foto
      request.addParameter('foto', TYPES.VarBinary, foto);

    }
      

    request.addParameter('json', TYPES.VarChar, JSON.stringify(json));
    request.addOutputParameter('response', TYPES.VarChar);
    let response;

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      console.log(returnStatus)
        res.status(200).send({ response: response })
    });

    request.on('returnValue', (parameterName, value, metadata) => {
      if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}
