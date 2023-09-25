import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({params}){
  const cliente = await obtenerCliente(params.id);
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No existe resultados para este id'
    })
  }

  return cliente
}

export async function action({request, params}) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
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

  //Actualizar Clientes
  await actualizarCliente(params.id, datos);

  return redirect('/'); 
}

const EditarClientes = () => {

  const navigate = useNavigate()
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Puedes modificar la informacion de un cliente</p>

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
            cliente = {cliente}
            key={cliente.id}
          />

          <input
          className=' mt-5 w-full p-3 font-bold text-lg bg-blue-700 text-white uppercase rounded-md' 
            type="submit" 
            value="Guardar Cambios" 

            />
        </Form>
      </div>
    </>
  )
}

export default EditarClientes