import {useState} from "react";
import "../../pages/signUp/SignUp.css";
import InputsCitizenIncome from "./InputsCitizenIncome.jsx";

const FormCitizenIncome = ({incomes, setIncomes}) => {

    const [income, setIncome] = useState({
        incomeType: "",
        incomePerMonth: "",
        incomePerYear: ""
    });

    const [isIncomeOkToAdd, setIsIncomeOkToAdd] = useState(false);
    const [isAddPressed, setIsAddPressed] = useState(false);
    const [isEditPressed, setIsEditPressed] = useState([]);
    const [isOneEditPressed, setIsOneEditPressed] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsAddPressed(false);
        setIncomes([...incomes, income]);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setIncome((prevState) => ({...prevState, [name]: value}));
    };

    const handleAdd = () => {
        setIsAddPressed(true);
        const resetIncome = {...income}
        Object.keys(resetIncome).forEach(function (key) {
            resetIncome[key] = ""
        });
        setIncome(resetIncome);
    };

    const handleEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = true;
        setIsOneEditPressed(true);
        const getIncome = {...incomes[index]};
        setIncome(getIncome);
    };

    const saveEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = false;
        setIsOneEditPressed(false);
        const saveChanges = incomes.map((r, i) => {
            if (i === index) {
                return incomes[i] = income;
            } else {
                return r;
            }
        });
        setIncomes(saveChanges);
    };

    const handleDelete = (event, index) => {
        event.preventDefault();
        setIncomes(incomes.filter(r => incomes.indexOf(r) !== index));
    };

    return (<div className={"column formSection"}>
        <h2>income</h2>
        <div className="column formDetailsDiv">
            {incomes.length > 0 ?
                incomes.map((salary, index) =>
                    <div key={index}
                         className={"column formSectionDetail"}>
                        <div className={isEditPressed[index] ? "formDetailList formDetailListOpen" : "formDetailList"}>
                            <h3>{salary.incomeType.toLocaleLowerCase().replace("_", " ")}</h3>
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
                                <InputsCitizenIncome
                                    income={income}
                                    handleChange={handleChange}
                                />
                                <button className={"saveUpdateCitizenDetails"}
                                        onClick={event => saveEdit(event, index)}>save
                                </button>
                            </div> : ""}
                    </div>) : ""}
            {isAddPressed ?
                <div className={"column"}>
                    <InputsCitizenIncome
                        income={income}
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

export default FormCitizenIncome;