import countryInformationDE from "./CountryInformationDE.jsx";
import "../../pages/signUp/SignUp.css";
import {useEffect, useState} from "react";

const InputsCitizenPhone = ({phone, handlePhoneNumber, handleAreaCode, handleChange, BACKEND_SIGN_UP}) => {

    const [existsByPhone, setExistsByPhone] = useState(false);

    console.log("phone.phoneNumber: " + phone.phoneNumber)
    console.log(phone)

    const fetchPhone = (phone) => {
        if (phone.length !== 0) {
            fetch(BACKEND_SIGN_UP + "/phone",
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
                name="phoneType" id="phoneType"
                required={true}
                value={phone.phoneType}
                onChange={handleChange}
            >
                <option value={""}>--select your phone type--</option>
                <option value={"MOBILE"}>mobile</option>
                <option value={"PHONE"}>phone</option>
            </select>
        </label>
        <div className={"row"}>
            <label>
                main phone number?
                <select
                    name="isMain" id="isMain"
                    required={true}
                    value={phone.isMain}
                    onChange={handleChange}
                >
                    <option value={""}>--main phone number?--</option>
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                </select>
            </label>
            <label>
                permission to contact?
                <select
                    name="permissionToContact" id="permissionToContact"
                    required={true}
                    value={phone.permissionToContact}
                    onChange={handleChange}
                >
                    <option value={""}>--permission to contact?--</option>
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
                    onChange={handleAreaCode}
                >
                    <option value={""}>--select your area code--</option>
                    {countryInformationDE.map((country, index) =>
                        <option key={index}
                                value={country.areaCode}>{country.flag} {country.name} {country.areaCode}</option>
                    )}
                </select>
            </label>
            <label>
                {!existsByPhone ? "phone phoneNumber" :
                    <span className={"inputTaken"}>phone number is taken!</span>}
                <input type="text"
                       name="phoneNumber" id="phoneNumber"
                       required={true}
                       value={phone.phoneNumber}
                       onChange={handlePhoneNumber}
                />
            </label>
        </div>
    </>)
}

export default InputsCitizenPhone;