import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

export default function CustumerLogin() {
    const usernameInput = useRef();
    const passwordInput = useRef();
     const is_adminInput = useRef();

    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();
    const url = "http://localhost:8080/aroma";

    async function login() {
        // Whenever you are getting a useRefs value, make sure it's inside some function call. Otherwise it will
        // error due to the refInput.current = undefined, meaning there is no .value available
        const customer = {username: usernameInput.current.value,
            password: passwordInput.current.value,
          //  is_admin: is_adminInput.current.value,
        };

if (customer.password === "hello") {
            alert("You need to reset password");
        } else {
            try {
                const response = await axios.post(`${url}/auth`, customer);
                console.log(response.data);
                console.log("Hey this is the user prior ", user);
                setUser({ ...user, username: customer.username});
                
                console.log("This is after we set the user ", user);
                // the below code, manipulates the DOM
                // window.location.replace("http://localhost:3000/dashboard");
                // const responses = await axios.get(`${url}/customers`, customer);
                // console.log(responses.data);
                // console.log("Hey this is the user prior ", user);
                // setUser({ ...user, is_admin: customer.is_adminInput });
                // here we checking if the person who loged in is a customer or an admin
                               
                if(usernameInput.current.value === "asebirka" || usernameInput.current.value === "aminase" ){
                // if(customer.is_adminInpute === true){

                    // the below code, manipulates the DOM
                    //window.location.replace("http://localhost:3000/menu-welcome-admin")
                  navigate("/admindashboard");
                } else{
                    navigate("/customerdashboard");
                   
                }
                
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
        }
    }

    return (
        <>
            <h4>Welcome back, please log in below.</h4>
            <input placeholder="Enter Username" ref={usernameInput}></input>
            <input type="password" placeholder="Enter password" ref={passwordInput}></input>
            {/* <input placeholder="Admin Status (true/false)" ref={usernameInput}></input> */}
           
            <button onClick={login}>Login</button>
        </>
    );
}
