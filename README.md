# git commit 1dfaba6
## Faire le routeur:

- faire le components de la nav avec les link
- Dans app faire les routes pour charger les bons fichiers au fur et à mesure (app.js + components navbar)
- Importer les fichiers

# git commit 19e92f1
## Faire la homePage dans un dossier page (installer thème boostwatch)

# git commit 325a7d4
## Faire la customersPage

/!\ attention à remplacer les a par les Link de react,

- Axios va servir à récupérer les datas de l'api,
- pour récupérer avec axios, dans le useEffect (déclenche l'appel de l'api) tandis que useState stocke les données,

    ```js
    const [customers, setCustomers] = useState([])
    
    useEffect(()=>{
      Axios.get('http://apicourse.myepse.be/api/customers') //récupère l'url
        .then(response => response.data['hydra:member']) //récupère les membres
        .then(data => setCustomers(data)) // on va modifier le hook avec ce qu'on récupère
        .catch(error => console.error(error.response)) // si il y'a une erreur déclencher message dans la console
    
    },[])
    
    // stocke dans customers les données qu'on récupère puis faire map de customers et y placer les données
    ```

# git commit bf6d5da
## Faire la customerspagewithpagination

- faire un component pagination,
- voir fichier pour explication,
- la page customerwithpagination (voir fichier pour les modifs).
- dans la customerspage, mettre la pagination et map le paginatedCustomers et faire un getData pour récupérer les infos


# git commit cc84f74
## Faire un service avec customersapi

   ```js 
    import Axios from 'axios'

    function findAll(){
        return Axios.get("http://apicourse.myepse.be/api/customers")
                    .then(response => response.data['hydra:member'])
    }

    function deleteCustomer(id){
        return Axios.delete(`http://apicourse.myepse.be/api/customers/${id}`)
    }

    export default {
        findAll : findAll,
        delete: deleteCustomer
    }
   ```

   -  ajouter une fonction avec une promesse qui appelle la fonction

# git commit 
## Le filtre search
- ajouter un hook avec search et set search
-faire la fonction handleSearch()

 ```js 
     const handleSearch = event => {
        const value = event.currentTarget.value //récupérer la valeur de l'élément qui a déclencher l'évènement grâce au handle change
        setSearch(value)
        setCurrentPage(1)
    } 
 ```

- Faire le filteredCustomers pour afficher que ceux qui correspondent

 ```js 
     const filteredCustomers = customers.filter(c => 
            c.firstName.toLowerCase().includes(search.toLowerCase()) || // on met en miniscule soit le prenom le nom le mail ou la company et on demande si ca inclut la recherche en minuscule
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase) || 
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
        )


 ```

- changer customers avec filtered customers à l'évènement pour laisser que les résultats correspondants
- pas oublier l'input


# INVOICES

-met a jour la nav et le routeur
- le composant avec findall delete

