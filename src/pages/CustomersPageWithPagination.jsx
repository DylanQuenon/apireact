import { useState, useEffect } from "react";
import Axios from 'axios'
import Pagination from "../components/Pagination";


const CustomersPageWithPagination = (props) => {
    const [ customers, setCustomers] = useState([])

    // pour la pagination 
    const [currentPage, setCurrentPage] = useState(1) // attribue la currentpage qui sera de 1
    const [totalItems, setTotalItems] = useState(0) //récupère le nombre total de pages
    // définir le nombre d'items par page 
    const itemsPerPage= 10

    const handlePageChange = (page) => {
        setCustomers([]) //au changement de page on vient réinitialiser le tableau
        setCurrentPage(page) //en lui attribuant la bonne page
    }

    useEffect(()=>{
        Axios.get(`http://apicourse.myepse.be/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response => {
            setCustomers(response.data['hydra:member'])
            setTotalItems(response.data['hydra:totalItems']) //on récupère total items dans l'api
        })
    },[currentPage])

    const handleDelete=(id)=>{
        //pessimiste
        const originalCustomers=[...customers] //copie du tableau
        
        
        //optimiste
        setCustomers(customers.filter(customer=>customer.id !== id))
        Axios.delete(`http://apicourse.myepse.be/api/customers/${id}`)
        .then(response=>console.log('ok'))
        .catch(error=>{
            setCustomers(originalCustomers)
        })
    }

    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th className="text-center">Montant total</th>
                        <th className="text-center">Montant Restant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* ET logique (&&) expr1 && expr2 renvoie expr1 si cette expression peut être convertie en false, sinon renvoie expr2 */}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center">Chargement ...</td>

                        </tr>
                    )}

                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td class="text-center">
                                <span className="badge">
                                    {customer.invoices.length}
                                </span>
                            </td>
                            <td className="text-center">
                                {customer.totalAmount.toLocaleString()}€
                            </td>
                            <td className="text-center">
                                {customer.unpaidAmount.toLocaleString()}€
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(customer.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            {/* on appelle le composant pagination et on lui passe les props nécessaires voir plus haut*/}
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
      );
}
 
export default CustomersPageWithPagination;