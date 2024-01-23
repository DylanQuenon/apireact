import {useState,useEffect} from "react";
import Pagination from "../components/Pagination";
import invoicesAPI from "../services/invoicesAPI";
import moment from "moment";

const STATUS_LABELS={
    PAID:"Payée",
    SENT: "Envoyée",
    CANCELLED:"Annulée"
}

const STATUS_CLASSES={
    PAID:"success",
    SENT: "primary",
    CANCELLED:"danger"
}
const InvoicesPage = (props) => {

    const [invoices,setInvoices]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[search,setSearch]=useState("")
    const itemsPerPage=10
    // récup les invoices

    const fetchInvoice=async()=>{
        try{
            const data= await invoicesAPI.findAll()
            console.log(data)
            setInvoices(data)

        }catch(error)
        {
            console.error(error.response)
        }
    }

    useEffect(()=>{
        fetchInvoice()
    },[])

    const handleSearch=event=>{
        const value=event.currentTarget.value
        setSearch(value)
        setCurrentPage(1)
    }
    const filteredInvoices=invoices.filter(i=>
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())

    )

    const paginatedInvoices=Pagination.getData(filteredInvoices,currentPage,itemsPerPage)

    const formatDate=(str)=>moment(str).format('DD/MM/YYYY')

    const handleDelete= async(id)=>{
        const originalInvoices=[...invoices]
        setInvoices(invoices.filter(invoice=>invoice.id!==id))

        try{
            await invoicesAPI.delete(id)
        }catch(error)
        {
            setInvoices(originalInvoices)
        }
    }

    const handlePageChange=(props)=>{
        setCurrentPage(props)
    }
    return ( 
        <>
            <h1>Liste des factures</h1>
            {/**Filtre */}
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher" onChange={handleSearch} value={search} />
                <table className="table table-hover">
                    <thead>
                        <th className="text-center">Numéro</th>
                        <th className="text-center">Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th className="text-center"></th>

                    </thead>
                    <tbody>
                        {
                        paginatedInvoices.map(invoice=>(
                            <tr key={invoice.id}>
                                <td className="text-center">{invoice.id}</td>
                                <td className="text-center">{invoice.customer.firstName} {invoice.customer.lastName}</td>
                                <td className="text-center">{formatDate(invoice.sentAt)}</td>
                                <td className="text-center">
                                    <span className={`badge bg-${STATUS_CLASSES[invoice.status]}`}>
                                        {STATUS_LABELS[invoice.status]}
                                    </span>
                                </td>
                            
                                <td className="text-center">{invoice.amount.toLocaleString()}€</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-success mx-3">Editer</button>
                                    <button onClick={()=>handleDelete(invoice.id)} className="btn btn-sm btn-danger ">Supprimer</button>
                                </td>

                            </tr>
                        ))
}
                    </tbody>
                </table>

                {
                    itemsPerPage < filteredInvoices.length &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredInvoices.length}
                        onPageChanged={handlePageChange}
                    />
                }
            </div>
        </>
     );
}
 
export default InvoicesPage;