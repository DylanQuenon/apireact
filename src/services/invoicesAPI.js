import Axios from "axios";

function findAll(){
    return Axios.get("http://apicourse.myepse.be/api/invoices")
                .then(response => response.data['hydra:member']);
}

function deleteInvoice(id)
{
    return Axios.delete(`http://apicourse.myepse.be/api/invoices/${id}`);
}

export default {
    findAll: findAll,
    delete: deleteInvoice
}