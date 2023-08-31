import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Buffer} from "buffer";
import InputCitizen from "../../components/signUp/InputCitizen.jsx";
import "./SignUp.css";

const SignUp = ({isCitizenRegistered, setIsCitizenRegistered, setIsCitizenLoggedIn, setUsername}) => {

    const BACKEND_SIGN_UP = "http://localhost:8080/auth/sign-up"
    const navigate = useNavigate();
    const timeToRedirect = 6;

    const [citizen, setCitizen] = useState({
        socialSecurityNumber: '',
        valid: false,
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        password: '',
        gender: '',
        birthday: '',
        nationality: ''
    });
    const [residences, setResidences] = useState([]);
    const [mails, setMails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [incomes, setIncomes] = useState([]);

    const [isCitizenOkToSubmit, setIsCitizenOkToSubmit] = useState(true);
    const [countdown, setCountdown] = useState(timeToRedirect);

    const handleSubmit = event => {
        event.preventDefault();

        if (isCitizenOkToSubmit) {
            fetch(BACKEND_SIGN_UP,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...citizen, residences, mails, phones, incomes})
                })
                .then(response => response.json())
                .then(citizen => {
                    setUsername(citizen.username)
                    setIsCitizenRegistered(true);
                    setIsCitizenLoggedIn(true);
                    getToken();
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
            citizen={citizen} setCitizen={setCitizen}
            residences={residences} setResidences={setResidences}
            mails={mails} setMails={setMails}
            phones={phones} setPhones={setPhones}
            incomes={incomes} setIncomes={setIncomes}
            handleSubmit={handleSubmit} h1Title={"Register"}
            BACKEND_SIGN_UP={BACKEND_SIGN_UP}/>
    );
};

export default SignUp;