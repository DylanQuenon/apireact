# Faire le routeur:

- faire le components de la nav avec les link
- Dans app faire les routes pour charger les bons fichiers au fur et à mesure (app.js + components navbar) 
- Importer les fichiers

# Faire la homePage dans un dossier page (installer thème boostwatch)

# Faire la customersPage 

/!\ attention à remplacer les a par les Link de react

- Axios va servir à récupérer les datas de l'api
- Pour récupérer avec axios, dans le useEffect (déclenche l'appel de l'api) tandis que useState stocke les données

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

# Faire la customerspagewithpagination

- faire un component pagination
- voir fichier pour explication
- la page customerwithpagination (voir fichier pour les modifs)

