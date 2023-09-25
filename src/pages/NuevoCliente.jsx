import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error';
import { agregarClientes } from '../data/clientes';

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get('email')
  const errores = [];
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    errores.push('El Email no es valido')
  }
  
  //Validacion
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  //retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores
  }

  await agregarClientes(datos);

  return redirect('/'); 
}

function NuevoCliente() {
  
  const navigate = useNavigate()
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md'
          onClick={() => navigate(-1)}
        >
          volver
        </button>

      </div> 
      <div className='bg-white border shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form
          method='post'
          noValidate
        >
          <Formulario
          />

          <input
          className=' mt-5 w-full p-3 font-bold text-lg bg-blue-700 text-white uppercase rounded-md' 
            type="submit" 
            value="registrar cliente" 

            />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente