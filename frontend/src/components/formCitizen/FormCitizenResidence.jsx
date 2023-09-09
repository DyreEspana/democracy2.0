import {useState} from "react";
import "../../pages/signUp/SignUp.css";
import InputsCitizenResidence from "./InputsCitizenResidence.jsx";

const FormCitizenResidence = ({residences, setResidences}) => {

    let [residence, setResidence] = useState({
        residenceType: "",
        ownerType: "",
        street: "",
        houseNumber: "",
        stair: "",
        stock: "",
        door: "",
        option: "",
        postalCode: "",
        city: "",
        country: ""
    })

    const [isResidenceOkToAdd, setIsResidenceOkToAdd] = useState(false);
    const [isAddPressed, setIsAddPressed] = useState(false);
    const [isEditPressed, setIsEditPressed] = useState([]);
    const [isOneEditPressed, setIsOneEditPressed] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsAddPressed(false);
        setResidences([...residences, residence]);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setResidence((prevState) => ({...prevState, [name]: value}));
    };

    const handleAdd = () => {
        setIsAddPressed(true);
        const resetResidence = {...residence};
        Object.keys(resetResidence).forEach(function (key) {
            resetResidence[key] = ""
        });
        setResidence(resetResidence);
    };

    const handleEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = true;
        setIsOneEditPressed(true);
        const getResidence = {...residences[index]};
        setResidence(getResidence);
    };

    const saveEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = false;
        setIsOneEditPressed(false);
        const saveChanges = residences.map((r, i) => {
            if (i === index) {
                return residences[i] = residence;
            } else {
                return r;
            }
        });
        setResidences(saveChanges);
    };

    const handleDelete = (event, index) => {
        event.preventDefault();
        setResidences(residences.filter(r => residences.indexOf(r) !== index));
    };

    return (<div className={"column formSection"}>
        <h2>residence</h2>
        <div className={"column formDetailsDiv"}>
            {residences.length > 0 ?
                residences.map((address, index) =>
                    <div key={index} className={"column formSectionDetail"}>
                        <div className={isEditPressed[index] ? "formDetailList formDetailListOpen" : "formDetailList"}>
                            <h3>{address.street + " " + address.houseNumber + "/" + address.stair + "/" + address.stock + "/" + address.door}
                                <br/>{address.postalCode + " " + address.city}</h3>
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
                                <InputsCitizenResidence
                                    residence={residence}
                                    handleChange={handleChange}
                                />
                                <button className={"saveUpdateCitizenDetails"}
                                        onClick={event => saveEdit(event, index)}>save
                                </button>
                            </div> : ""}
                    </div>) : ""}
            {isAddPressed ?
                <div className={"column"}>
                    <InputsCitizenResidence
                        residence={residence}
                        handleChange={handleChange}
                    />
                    <button className={"saveUpdateCitizenDetails"}
                            onClick={handleSubmit}>save
                    </button>
                </div>
                : !isOneEditPressed ?
                    <button className={"addNewCitizenDetail"}
                            type={"button"}
                            onClick={handleAdd}>add</button>
                    : ""}
        </div>
    </div>);
};

export default FormCitizenResidence;