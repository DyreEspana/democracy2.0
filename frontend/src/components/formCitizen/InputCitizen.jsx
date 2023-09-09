import {useEffect, useState} from "react";
import FormCitizenResidence from "./FormCitizenResidence.jsx";
import FormCitizenMail from "./FormCitizenMail.jsx";
import FormCitizenPhone from "./FormCitizenPhone.jsx";
import FormCitizenIncome from "./FormCitizenIncome.jsx";
import countryInformationDE from ".//CountryInformationDE.jsx";
import "../../pages/signUp/SignUp.css";


const InputCitizen = ({
                          BACKEND_PORT,
                          citizen, setCitizen,
                          residences, setResidences,
                          mails, setMails,
                          phones, setPhones,
                          incomes, setIncomes,
                          handleSubmit, h1Title,
                      }) => {

    const [existsByUsername, setExistsByUsername] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);

    const fetchUsername = (inputUsername) => {
        let loggedInUsername = "";
        if (localStorage.getItem("loggedInUsername") !== null) {
            loggedInUsername = localStorage.getItem("loggedInUsername");
        }
        if (inputUsername.length !== 0 && loggedInUsername !== inputUsername) {
            fetch(BACKEND_PORT + "/check/username",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: inputUsername
                })
                .then(response => response.text())
                .then(boolean => setExistsByUsername(boolean === "true"))
                .catch(error => console.error("Error: ", error))
        }
    };

    useEffect(() => {
        fetchUsername(citizen.username);
    }, [citizen.username]);

    const handleChange = event => {
        let {name, value} = event.target;
        if (name === "username") {
            value = value.toLowerCase();
        }
        setCitizen((prevState) => ({...prevState, [name]: value}));
    };

    const handleOldPassword = event => {
        event.preventDefault();
        setOldPassword(event.target.value);
    };

    const checkOldPassword = () => {
        if (oldPassword !== "") {
            fetch(BACKEND_PORT + "/check/change/old-password",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                        "Content-Type": "application/json"
                    },
                    body: oldPassword
                })
                .then(response => response.text())
                .then(boolean => setPasswordMatch(boolean === "true"))
                .catch(error => console.error("Error: ", error))
        }
    };

    useEffect(() => {
        checkOldPassword();
    }, [oldPassword])

    return (
        <div className="signUpMainDiv">
            <h1>{h1Title}</h1>
            <form method={localStorage.getItem("isCitizenLoggedIn") === "true" ? "PUT" : "POST"}
                  onSubmit={handleSubmit}>
                <div className={"column formSection"}>
                    <label className={"genderLabel"}>
                        gender
                        <select
                            name={"gender"} id={"gender"}
                            required={true}
                            value={citizen.gender}
                            onInput={handleChange}
                        >
                            <option value={""}>-- select --</option>
                            <option value={"MALE"}>man</option>
                            <option value={"FEMALE"}>woman</option>
                            <option value={"DIVERS"}>divers</option>
                        </select>
                    </label>
                    <div className={"row"}>
                        <label>
                            {!existsByUsername ? "username" :
                                <span className={"incorrectInput"}>username is taken!</span>}
                            <input type="text"
                                   name="username" id="username"
                                   required={true}
                                   value={citizen.username}
                                   onInput={handleChange}
                            />
                        </label>
                        <div className={localStorage.getItem("isCitizenLoggedIn") === "true" ? "row" : ""}>
                            {localStorage.getItem("isCitizenLoggedIn") === "true" ?
                                <label>
                                    {oldPassword === "" ? "old password" : passwordMatch ?
                                        <span className={"correctInput"}>correct password</span>
                                        : <span className={"incorrectInput"}>wrong password</span>}
                                    <input type="password"
                                           name="oldPassword" id="oldPassword"
                                           required={true}
                                           onInput={handleOldPassword}
                                    />
                                </label>
                                : ""}
                            <label>
                                {localStorage.getItem("isCitizenLoggedIn") === "true" ? "new password" : "password"}
                                <input type="password"
                                       name="password" id="password"
                                       required={true}
                                       onInput={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={"row"}>
                        <label className={"name"}>
                            first name
                            <input type="text"
                                   name="firstName" id="firstName"
                                   required={true}
                                   value={citizen.firstName}
                                   onInput={handleChange}
                            />
                        </label>
                        <label className={"name"}>
                            middle name
                            <input type="text"
                                   name="middleName" id="middleName"
                                   value={citizen.middleName}
                                   onInput={handleChange}
                            />
                        </label>
                        <label className={"name"}>
                            last name
                            <input type="text"
                                   name="lastName" id="lastName"
                                   required={true}
                                   value={citizen.lastName}
                                   onInput={handleChange}
                            />
                        </label>
                    </div>
                    <div className={"row"}>
                        <label>
                            birthday
                            <input type="date"
                                   name="birthday" id="birthday"
                                   required={true}
                                   value={citizen.birthday}
                                   onInput={handleChange}
                            />
                        </label>
                        <label>
                            social security number
                            <input type="number"
                                   name="socialSecurityNumber" id="socialSecurityNumber"
                                   required={true}
                                   value={citizen.socialSecurityNumber}
                                   onInput={handleChange}
                            />
                        </label>
                    </div>
                    <label>
                        nationality
                        <select
                            name={"nationality"} id={"nationality"}
                            required={true}
                            value={citizen.nationality}
                            onChange={handleChange}
                        >
                            <option value={""}>-- select --</option>
                            {countryInformationDE.map((country, index) =>
                                <option key={index} value={country.name}>{country.flag} {country.name}</option>
                            )}
                        </select>
                    </label>
                </div>
                <FormCitizenResidence
                    residences={residences}
                    setResidences={setResidences}
                />
                <FormCitizenMail
                    BACKEND_PORT={BACKEND_PORT}
                    mails={mails}
                    setMails={setMails}
                />
                <FormCitizenPhone
                    BACKEND_PORT={BACKEND_PORT}
                    phones={phones}
                    setPhones={setPhones}
                />
                <FormCitizenIncome
                    incomes={incomes}
                    setIncomes={setIncomes}
                />
                <div className={"submitDivButtons row"}>
                    <button type="reset">reset</button>
                    {!existsByUsername ?
                        <button type="submit">submit</button>
                        : ""}
                </div>
            </form>
        </div>
    )
        ;
};

export default InputCitizen;