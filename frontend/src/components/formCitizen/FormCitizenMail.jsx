import {useState} from "react";
import "../../pages/signUp/SignUp.css";
import InputsCitizenMail from "./InputsCitizenMail.jsx";

const FormCitizenMail = ({BACKEND_PORT, mails, setMails}) => {

    const [eMail, setEMail] = useState({
        isMain: "",
        permissionToContact: "",
        mail: ""
    });

    const [isMailOkToAdd, setIsMailOkToAdd] = useState(false);
    const [isAddPressed, setIsAddPressed] = useState(false);
    const [isEditPressed, setIsEditPressed] = useState([]);
    const [isOneEditPressed, setIsOneEditPressed] = useState(false);

    const [existsByMail, setExistsByMail] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsAddPressed(false);
        setMails([...mails, eMail]);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setEMail((prevState) => ({...prevState, [name]: value}));
    };

    const handleAdd = () => {
        setIsAddPressed(true);
        const resetEMail = {...eMail}
        Object.keys(resetEMail).forEach(function (key) {
            resetEMail[key] = ""
        });
        setEMail(resetEMail);
    };

    const handleEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = true;
        setIsOneEditPressed(true);
        const getMail = {...mails[index]};
        setEMail(getMail);
    };

    const saveEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = false;
        setIsOneEditPressed(false);
        const saveChanges = mails.map((m, i) => {
            if (i === index) {
                return mails[i] = eMail;
            } else {
                return m;
            }
        });
        setMails(saveChanges);
    };

    const handleDelete = (event, index) => {
        event.preventDefault();
        setMails(mails.filter(m => mails.indexOf(m) !== index));
    };

    return (<div className={"column formSection"}>
        <h2>e-mail</h2>
        <div className="column formDetailsDiv">
            {mails.length > 0 ?
                mails.map((e_mail, index) =>
                    <div key={index} className={"column formSectionDetail"}>
                        <div className={isEditPressed[index] ? "formDetailList formDetailListOpen" : "formDetailList"}>
                            <h3>{e_mail.mail}</h3>
                            <button className={"deleteCitizenDetails"}
                                    type={"button"}
                                    onClick={event => handleDelete(event, index)}>delete
                            </button>
                            <button className={"updateCitizenDetails"}
                                    type={"button"}
                                    onClick={event => handleEdit(event, index)}>edit
                            </button>
                        </div>
                        {isEditPressed[index] ?
                            <div className={"column"}>
                                <InputsCitizenMail
                                    BACKEND_PORT={BACKEND_PORT}
                                    eMail={eMail}
                                    handleChange={handleChange}
                                    existsByMail={existsByMail}
                                    setExistsByMail={setExistsByMail}
                                />
                                {!existsByMail ?
                                    <button className={"saveUpdateCitizenDetails"}
                                            onClick={event => saveEdit(event, index)}>save
                                    </button>
                                    : ""}
                            </div> : ""}
                    </div>) : ""}
            {isAddPressed ?
                <div className={"column"}>
                    <InputsCitizenMail
                        BACKEND_PORT={BACKEND_PORT}
                        eMail={eMail}
                        handleChange={handleChange}
                        existsByMail={existsByMail}
                        setExistsByMail={setExistsByMail}
                    />
                    {!existsByMail ?
                        <button className={"saveUpdateCitizenDetails"}
                                onClick={handleSubmit}>save
                        </button>
                        : ""}
                </div>
                : !isOneEditPressed ?
                    <button className={"addNewCitizenDetail"}
                            type={"button"}
                            onClick={handleAdd}>add</button>
                    : ""}
        </div>
    </div>);
};

export default FormCitizenMail;