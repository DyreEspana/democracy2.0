import "../../pages/signUp/SignUp.css";
import RegistrationCitizenResidence from ".//RegistrationCitizenResidence.jsx";
import RegistrationCitizenMail from ".//RegistrationCitizenMail.jsx";
import RegistrationCitizenPhone from ".//RegistrationCitizenPhone.jsx";
import RegistrationCitizenIncome from ".//RegistrationCitizenIncome.jsx";
import countryInformationDE from ".//CountryInformationDE.jsx";
import {useEffect, useState} from "react";


const InputCitizen = ({
                          citizen, setCitizen,
                          residences, setResidences,
                          mails, setMails,
                          phones, setPhones,
                          incomes, setIncomes,
                          handleSubmit, h1Title,
                          BACKEND_SIGN_UP
                      }) => {

    const [existsByUsername, setExistsByUsername] = useState(false);

    const fetchUsername = (username) => {
        if (username.length !== 0) {
            fetch(BACKEND_SIGN_UP + "/username",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: username
                })
                .then(response => response.text())
                .then(text => {
                    setExistsByUsername(text === "true")
                })
                .catch(error => console.log("Error: ", error))
        }
    }

    const handleChange = event => {
        let {name, value} = event.target;
        if (name === "username") {
            value = value.toLowerCase();
        }
        setCitizen((prevState) => ({...prevState, [name]: value}));
    };

    useEffect(() => {
        fetchUsername(citizen.username);
    }, [citizen.username])

    return (
        <div className="signUpMainDiv">
            <form method={"POST"} onSubmit={handleSubmit}>
                <h1>{h1Title}</h1>
                <div className={"column formSection"}>
                    <label className={"genderLabel"}>
                        gender
                        <select
                            name={"gender"} id={"gender"}
                            required={true}
                            value={citizen.gender}
                            onInput={handleChange}
                        >
                            <option value={""}>--select your gender--</option>
                            <option value={"MALE"}>man</option>
                            <option value={"FEMALE"}>woman</option>
                            <option value={"DIVERS"}>divers</option>
                        </select>
                    </label>
                    <div className={"row"}>
                        <label>
                            {!existsByUsername ? "username" :
                                <span className={"inputTaken"}>username is taken!</span>}
                            <input type="text"
                                   name="username" id="username"
                                   required={true}
                                   value={citizen.username}
                                   onInput={handleChange}
                            />
                        </label>
                        <label>
                            password
                            <input type="password"
                                   name="password" id="password"
                                   required={true}
                                   value={citizen.password}
                                   onInput={handleChange}
                            />
                        </label>
                    </div>
                    <div className={"row"}>
                        <label>
                            first name
                            <input type="text"
                                   name="firstName" id="firstName"
                                   required={true}
                                   onInput={handleChange}
                            />
                        </label>
                        <label>
                            middle name
                            <input type="text"
                                   name="middleName" id="middleName"
                                   onInput={handleChange}
                            />
                        </label>
                        <label>
                            last name
                            <input type="text"
                                   name="lastName" id="lastName"
                                   required={true}
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
                                   onInput={handleChange}
                            />
                        </label>
                        <label>
                            social security number
                            <input type="number"
                                   name="socialSecurityNumber" id="socialSecurityNumber"
                                   required={true}
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
                            <option value={""}>--select your nationality--</option>
                            {countryInformationDE.map((country, index) =>
                                <option key={index} value={country.name}>{country.flag} {country.name}</option>
                            )}
                        </select>
                    </label>
                </div>
                <RegistrationCitizenResidence
                    residences={residences}
                    setResidences={setResidences}/>
                <RegistrationCitizenMail
                    mails={mails}
                    setMails={setMails}
                    BACKEND_SIGN_UP={BACKEND_SIGN_UP}/>
                <RegistrationCitizenPhone
                    phones={phones}
                    setPhones={setPhones}
                    BACKEND_SIGN_UP={BACKEND_SIGN_UP}/>
                <RegistrationCitizenIncome
                    incomes={incomes}
                    setIncomes={setIncomes}/>
                <div className={"submitDivButtons row"}>
                    <button type="reset">reset</button>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    );
};

export default InputCitizen;