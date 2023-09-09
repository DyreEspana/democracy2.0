import {useEffect} from "react";
import "../../pages/signUp/SignUp.css";

const InputsCitizenMail = ({BACKEND_PORT, eMail, handleChange, existsByMail, setExistsByMail}) => {

    const fetchMail = (mail) => {
        let loggedInMails = "";
        if (localStorage.getItem("loggedInMails") !== null) {
            loggedInMails = localStorage.getItem("loggedInMails");
        }
        if (mail.length !== 0 && !loggedInMails.includes(mail)) {
            fetch(BACKEND_PORT + "/check/mail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: mail
                })
                .then(response => response.text())
                .then(text => setExistsByMail(text === "true"))
                .catch(error => console.error("Error: ", error))
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
                    <span className={"incorrectInput"}>e-mail is taken!</span>}
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