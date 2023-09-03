import {useEffect} from "react";
import countryInformationDE from "./CountryInformationDE.jsx";
import "../../pages/signUp/SignUp.css";

const InputsCitizenPhone = ({BACKEND_PORT, phone, handleChange, existsByPhone, setExistsByPhone}) => {

    const fetchPhone = (phone) => {
        let loggedInPhones = "";
        if (localStorage.getItem("loggedInPhones") !== null) {
            loggedInPhones = localStorage.getItem("loggedInPhones");
        }
        if (phone.length !== 0 && !loggedInPhones.includes(phone)) {
            fetch(BACKEND_PORT + "/check/phone",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: phone
                })
                .then(response => response.text())
                .then(text => {
                    setExistsByPhone(text === "true")
                })
                .catch(error => console.log("Error: ", error))
        }
    }

    useEffect(() => {
        fetchPhone(phone.phoneNumber);
    }, [phone.phoneNumber])

    return (<>
        <label>
            phone type
            <select
                name={"phoneType"} id={"phoneType"}
                required={true}
                value={phone.phoneType}
                onChange={handleChange}
            >
                <option value={""}>-- select --</option>
                <option value={"MOBILE"}>mobile</option>
                <option value={"PHONE"}>phone</option>
            </select>
        </label>
        <div className={"row"}>
            <label>
                main phone number?
                <select
                    name={"isMain"} id={"isMain"}
                    required={true}
                    value={phone.isMain}
                    onChange={handleChange}
                >
                    <option value={""}>-- select --</option>
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                </select>
            </label>
            <label>
                permission to contact?
                <select
                    name={"permissionToContact"} id={"permissionToContact"}
                    required={true}
                    value={phone.permissionToContact}
                    onChange={handleChange}
                >
                    <option value={""}>-- select --</option>
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                </select>
            </label>
        </div>
        <div className={"row"}>
            <label>
                area code
                <select
                    name={"phoneNumber"} id={"areaCode"}
                    required={true}
                    onChange={handleChange}
                >
                    <option value={""}>-- select --</option>
                    {countryInformationDE.map((country, index) =>
                        <option key={index}
                                value={country.areaCode}>{country.flag} {country.areaCode}</option>
                    )}
                </select>
            </label>
            <label>
                {!existsByPhone ? "phone number" :
                    <span className={"incorrectInput"}>phone number is taken!</span>}
                <input type="text"
                       name="phoneNumber" id="phoneNumber"
                       required={true}
                       value={phone.phoneNumber}
                       onChange={handleChange}
                />
            </label>
        </div>
    </>)
}

export default InputsCitizenPhone;