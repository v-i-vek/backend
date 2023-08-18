import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


// let dataPort;
function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const url = "https://tn3i1ninuf.execute-api.ap-south-1.amazonaws.com/dev/signin";
    const navigate = useNavigate(); // Initialize useNavigate  
    
    const Login = async () => {
        if (email === "" || password === "") {
            alert("Please fill in both email and password.");
            return;
        }

        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
            console.log("responce:", response)
           
            if (response.status === 200) {
                const data = await response.json();
                const userExpersionTime = new Date(Date.now()+ 12 * 60 * 60 * 1000)
                localStorage.setItem('data', JSON.stringify(data));
                localStorage.setItem('userExpersionTime', userExpersionTime.toISOString());

                // dataPort = data
                console.log("Data:", data);
                alert("Signin successful")
                navigate("/dash");
                window.location.reload(true);
            }
            else {
                console.error("Error signing in:", response.statusText);
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Error catch");
        }
    };

    return (<div className="signin-container">
        <form className="signin-form">
            <h2 className="signin-form">Sign In</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) =>
                setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) =>
                setPassword(e.target.value)} required />
            <button type="button" onClick={Login}>
                Sign In
            </button>
        </form>
    </div>
    )
}
export default SignInForm ;
