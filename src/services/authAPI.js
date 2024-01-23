import Axios from "axios";
import { jwtDecode } from "jwt-decode";

function authenticate(credentials){

    return Axios
            .post("http://apicourse.myepse.be/api/login_check", credentials)
            .then(response=>response.data.token)
            .then(token=>{
                //mettre le token dans le localstorage
                window.localStorage.setItem("authtoken", token)
                //ajouter à axios pour chaque req le bearer token
                Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
                return true
            })

}

function logout(){
    window.localStorage.removeItem("authtoken")
    delete Axios.defaults.headers["Authorization"]
}


function setup(){
    const token=window.localStorage.getItem("authtoken")
    if(token)
    {
        const jwtData=jwtDecode(token)
        if(jwtData.exp*1000< new Date().getTime())
        {
            Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    
}

export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup
}