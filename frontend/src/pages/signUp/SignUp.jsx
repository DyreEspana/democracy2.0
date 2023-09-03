import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Buffer} from "buffer";
import InputCitizen from "../../components/formCitizen/InputCitizen.jsx";
import "./SignUp.css";

const SignUp = ({
                    BACKEND_PORT,
                    citizen, setCitizen,
                    residences, setResidences,
                    mails, setMails,
                    phones, setPhones,
                    incomes, setIncomes,
                    isCitizenRegistered, setIsCitizenRegistered,
                    isCitizenLoggedIn, setIsCitizenLoggedIn,
                }) => {

    const BACKEND_SIGN_UP = BACKEND_PORT + "/auth/sign-up";
    const navigate = useNavigate();
    const timeToRedirect = 6;

    const [isCitizenOkToSubmit, setIsCitizenOkToSubmit] = useState(true);
    const [countdown, setCountdown] = useState(timeToRedirect);

    const handleSubmit = event => {
        event.preventDefault();

        if (isCitizenOkToSubmit) {
            fetch(BACKEND_SIGN_UP,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...citizen, residences, mails, phones, incomes})
                })
                .then(response => response.json())
                .then(resCitizen => {
                    localStorage.clear();
                    localStorage.setItem("loggedInUsername", resCitizen.username);
                    let resMails = resCitizen.mails.map(mail => mail.mail);
                    localStorage.setItem("loggedInMails", resMails.join());
                    let resPhones = resCitizen.phones.map(phone => phone.phoneNumber);
                    localStorage.setItem("loggedInPhones", resPhones.join());
                    setIsCitizenRegistered(true);
                    setIsCitizenLoggedIn(true);
                    getToken().then(r => console.log("got token " + r));
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
        }
    };

    const getToken = () => {
        const headers = new Headers();
        const auth = Buffer.from(citizen.username + ":" + citizen.password).toString("base64");
        headers.set("Authorization", "Basic " + auth);
        return fetch(BACKEND_SIGN_UP, {method: "GET", headers: headers})
            .then(response => response.text())
            .then(jwt => {
                if (!jwt) {
                    console.error("no token");
                    return;
                }
                localStorage.setItem("jwt", jwt);
            })
            .catch(error => console.log("ERROR: " + error));
    }

    isCitizenRegistered &&
    setTimeout(navigate, timeToRedirect * 1000, "/dashboard");

    useEffect(() => {
        if (isCitizenRegistered && countdown >= 0) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown, isCitizenRegistered]);

    return (
        <InputCitizen
            BACKEND_PORT={BACKEND_PORT}
            citizen={citizen} setCitizen={setCitizen}
            residences={residences} setResidences={setResidences}
            mails={mails} setMails={setMails}
            phones={phones} setPhones={setPhones}
            incomes={incomes} setIncomes={setIncomes}
            handleSubmit={handleSubmit} h1Title={"Register"}
            isCitizenLoggedIn={isCitizenLoggedIn}
        />
    );
};

export default SignUp;