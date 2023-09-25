import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();


    return(
        <div className="space-y-8">
            <h1 className="text-blue-700 text-6xl text-center font-extrabold mt-20">
                CRM - Clientes
            </h1>
            <p className="text-center text-red-600 text-2xl font-bold">
            Hubo un error
            </p>
            <p className="text-center">
                {error.statusText || error.message}
            </p>
        </div>
    )
}