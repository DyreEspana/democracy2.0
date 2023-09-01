import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Buffer} from "buffer";
import "./SignIn.css";

const SignIn = ({isCitizenLoggedIn, setIsCitizenLoggedIn, setIsCitizenRegistered, setUsername, setAuthorities}) => {

    const BACKEND_SIGN_IN = "http://localhost:8080/auth/sign-in"
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [countdown, setCountdown] = useState(timeToRedirect);
    const [resMessage, setResMessage] = useState("");

    const proofSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson.username = formJson.username.toLowerCase();

        if (formJson.username !== "" && formJson.password !== "") {
            const headers = new Headers();
            const auth = Buffer.from(formJson.username + ":" + formJson.password).toString("base64");
            headers.set("Authorization", "Basic " + auth);
            return fetch(BACKEND_SIGN_IN, {method: "GET", headers: headers})
                .then(response => response.text())
                .then(jwt => {
                    if (!jwt) {
                        setResMessage("Wrong username or password");
                        return;
                    }
                    localStorage.setItem("jwt", jwt);
                    setToken(jwt);
                    handleSignIn().then(r => console.log("Successful login"));
                })
                .catch(error => console.log("ERROR: " + error));
        }
    };

    const handleSignIn = () => {
        const jwt = localStorage.getItem("jwt");
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${jwt}`);
        return fetch(BACKEND_SIGN_IN + "/authorized", {method: "GET", headers: headers})
            .then(response => response.text())
            .then(text => {
                setResMessage("Successful login");
                setUsername(text);
                setIsCitizenLoggedIn(true);
                setIsCitizenRegistered(true);
                navigate("/dashboard")
            })
            .catch(error => console.log("ERROR: " + error));
    };

    return (
        <div className={"mainSignIn"}>
            <div className="formSignIn">
                <h1>Login in your Account</h1>
                <form onSubmit={proofSignIn}>
                    <label>
                        Enter your username
                        <input type="text"
                               required={true}
                               name="username" id="username"
                        />
                    </label>
                    <label>
                        Enter your password
                        <input type="password"
                               required={true}
                            // value={passwordInput}
                               name="password" id="password"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {resMessage === "" ? "" :
                    resMessage === "Wrong username or password" ?
                        <p className="errorMessage">{resMessage}</p> :
                        resMessage === "Successful login" &&
                        <p className="successMessage">Successful Login.<br/>
                            You will be automatically redirected in {countdown} seconds.</p>}
            </div>
        </div>
    );
};

export default SignIn;