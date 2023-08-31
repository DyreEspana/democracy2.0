import "../../pages/signUp/SignUp.css";

const InputsCitizenIncome = ({income, handleChange}) => {
    return (<>
        <label>
            income type
            <select
                name="incomeType" id="incomeType"
                required={true}
                value={income.incomeType}
                onChange={handleChange}
            >
                <option value={""}>--please select an option--</option>
                <option value={"EMPLOYEE"}>employee</option>
                <option value={"WORKER"}>worker</option>
                <option value={"SELF_EMPLOYED"}>self employed</option>
                <option value={"UNEMPLOYMENT_BENEFIT"}>unemployment benefit</option>
                <option value={"PENSION"}>pension</option>
                <option value={"SCHOLARSHIP"}>scholarship</option>
                <option value={"RENTAL"}>rental</option>
                <option value={"LEASE"}>lease</option>
                <option value={"INVESTMENT"}>investment</option>
                <option value={"ALIMONY"}>alimony</option>
            </select>
        </label>
        <div className={"row"}>
            <label>
                income per month
                <input type="number"
                       name="incomePerMonth" id="incomePerMonth"
                       required={true}
                       value={income.incomePerMonth}
                       onInput={handleChange}
                />
            </label>
            <label>
                income per year
                <input type="number"
                       name="incomePerYear" id="incomePerYear"
                       value={income.incomePerYear}
                       onInput={handleChange}
                />
            </label>
        </div>
    </>)
};

export default InputsCitizenIncome;