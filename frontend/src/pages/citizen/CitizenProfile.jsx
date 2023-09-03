import InputCitizen from "../../components/formCitizen/InputCitizen.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CitizenProfile = ({
                            BACKEND_PORT,
                            citizen, setCitizen,
                            residences, setResidences,
                            mails, setMails,
                            phones, setPhones,
                            incomes, setIncomes,
                            isCitizenLoggedIn,
                            isProfilePressed,
                        }) => {

    const navigate = useNavigate();

    const [isCitizenOkToSubmit, setIsCitizenOkToSubmit] = useState(true);

    const fetchCitizen = () => {
        fetch(BACKEND_PORT + "/citizen/edit",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(fetchedCitizen => {
                fetchedCitizen.password = "";
                setCitizen(fetchedCitizen);
                setResidences(fetchedCitizen.residences);
                setMails(fetchedCitizen.mails);
                setPhones(fetchedCitizen.phones);
                setIncomes(fetchedCitizen.incomes);
            })
            .catch(error => console.error("Error: ", error));
    }

    useEffect(() => {
        fetchCitizen();
    }, [isProfilePressed]);

    const handleSubmit = event => {
        event.preventDefault();

        if (isCitizenOkToSubmit) {
            fetch(BACKEND_PORT + "/citizen/edit",
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...citizen, residences, mails, phones, incomes})
                })
                .then(response => response.json())
                .then(citizen => {
                    console.log("successful edit: " + citizen);
                    navigate("/dashboard")
                })
                .catch(error => console.error("Error: ", error));
        }
    };

    return (
        <InputCitizen
            BACKEND_PORT={BACKEND_PORT}
            citizen={citizen} setCitizen={setCitizen}
            residences={residences} setResidences={setResidences}
            mails={mails} setMails={setMails}
            phones={phones} setPhones={setPhones}
            incomes={incomes} setIncomes={setIncomes}
            handleSubmit={handleSubmit} h1Title={"Edit Profile"}
            isCitizenLoggedIn={isCitizenLoggedIn}
        />
    )
}

export default CitizenProfile;