import {useEffect, useState} from 'react';
import Field from '../components/forms/Field';
import { Link, useNavigate, useParams } from 'react-router-dom';
import customersAPI from '../services/customersAPI';
import { toast } from "react-toastify";

const CustomerPage = (props) => {

    var {id = "new"} = useParams()
    const navigate = useNavigate()

    const [editing, setEditing] = useState(false) // pour savoir si on édite ou non

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

      // récup le customer en question en fonction de l'id si on est en mode édition
      const fetchCustomer = async id => {
        try{
            const {firstName, lastName, email, company, user} = await customersAPI.find(id)
            console.log(user.id)
            setCustomer({firstName, lastName, email, company, user:"/api/users/"+user.id})
        }catch(error){
            // notif
            toast.error("Le client n'a pas pu être chargé")
            navigate("/customers", {replace: true})
        }
    }

    useEffect(()=>{
        if(id !== "new")
        {
            setEditing(true)
            fetchCustomer(id)
        }
    },[id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        //console.log(customer)
        try{
            // vérifier si on édite ou non
            if(editing){
                await customersAPI.update(id, customer)
                toast.success("Le client a bien été modifié")
            }else{
                await customersAPI.create(customer)
                toast.success("Le client a bien été enregistré")
                navigate("/customers", {replace: true})
            }
        }catch({response}){
            // console.log(response)
            const {violations} = response.data
            //console.log(violations)
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Une erreur est survenue")
        }

    }

    const handleChange = (event) => {
        // const value = event.currentTarget.value 
        // const name = event.currentTarget.name 
        const {name, value} = event.currentTarget
        setCustomer({...customer, [name]:value})
    }

    return ( 
        <>
            {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
            <form onSubmit={handleSubmit}>
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder='Nom de famille du client'
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder='Prénom du client'
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field 
                    name="email"
                    type="email"
                    label="Adresse E-mail"
                    placeholder='Adresse E-mail du client'
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field 
                    name="company"
                    label="Entreprise"
                    placeholder='Entreprise du client'
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="my-3">
                    {editing ? <button type="submit" className='btn btn-warning me-1'>Modifier</button> : <button type="submit" className='btn btn-success me-1'>Créer</button>}
                    
                    <Link to="/customers" className='btn btn-secondary'>Retour aux clients</Link>
                </div>

            </form>
        </>
     );
}

export default CustomerPage;