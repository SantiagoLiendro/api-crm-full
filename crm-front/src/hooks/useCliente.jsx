import { useContext } from "react";
import ClienteContext from "../providers/ClientesProvider";

const useCliente = () => {
    return useContext(ClienteContext)
}


export default useCliente
