import { Form, redirect, useNavigate } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

export async function action({params}){

    await eliminarCliente(params.id);
    return redirect('/')
}

function Cliente({cliente}) {

    const { nombre, empresa, email, telefono, id} = cliente
    const navigate = useNavigate();

    return (
        <tr className="border-b">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p className="text-2xl text-gray-800">{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600">
                    <span className="text-gray-800 uppercase font-bold">Email:{' '}</span>
                    {email}
                </p>
                <p className="text-gray-600">
                    <span className="text-gray-800 uppercase font-bold">Telefono:{' '}</span>
                    {telefono}
                </p>
            </td>
            <td className="p-6 flex gap-6">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 uppercase font-bold text-xs"
                    onClick={() => navigate(`/cliente/${id}/editar`)}
                >
                Editar
                </button>

                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('Deseas eliminar este Cliente?')){
                            e.preventDefault();

                        }
                    }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-800 uppercase font-bold text-xs"
                    >
                    Eliminar
                    </button>
                </Form>
            </td>
        </tr>
    )
}

export default Cliente