import {useEffect} from "react";
import "../../pages/signUp/SignUp.css";

const InputsCitizenMail = ({eMail, handleChange, BACKEND_SIGN_UP, existsByMail, setExistsByMail}) => {

    const fetchMail = (mail) => {
        if (mail.length !== 0) {
            fetch(BACKEND_SIGN_UP + "/mail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: mail
                })
                .then(response => response.text())
                .then(text => {
                    setExistsByMail(text === "true")
                })
                .catch(error => console.log("Error: ", error))
        }
    }

    useEffect(() => {
        fetchMail(eMail.mail);
    }, [eMail.mail])

    return (<>
            <div className={"row"}>
                <label>
                    main e-mail?
                    <select
                        name="isMain" id="isMain"
                        required={true}
                        value={eMail.isMain}
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
                        name="permissionToContact" id="permissionToContact"
                        required={true}
                        value={eMail.permissionToContact}
                        onChange={handleChange}
                    >
                        <option value={""}>-- select --</option>
                        <option value={true}>yes</option>
                        <option value={false}>no</option>
                    </select>
                </label>
            </div>
            <label>
                {!existsByMail ? "e-mail" :
                    <span className={"inputTaken"}>e-mail is taken!</span>}
                <input type="email"
                       name="mail" id="mail"
                       pattern='/\S+@\S+\.\S+/'
                       required={true}
                       value={eMail.mail}
                       onChange={handleChange}
                />
            </label>
        </>
    )
}

export default InputsCitizenMail;