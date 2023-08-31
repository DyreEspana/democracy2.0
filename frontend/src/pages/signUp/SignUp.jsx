import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignUp.css";
import InputCitizen from "../../components/signUp/InputCitizen.jsx";


const SignUp = ({isUserRegistered, setIsUserRegistered}) => {

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

    console.log({...citizen, residences, mails, phones, incomes});
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
                .then(response => response.text())
                .then(text => {
                    console.log(text);
                    setIsUserRegistered(true);
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
        } else {
            setIsCitizenOkToSubmit(false);
        }
    };

    isUserRegistered &&
    setTimeout(navigate, timeToRedirect * 1000, "/sign-in");

    useEffect(() => {
        if (isUserRegistered && countdown >= 0) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown, isUserRegistered]);

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