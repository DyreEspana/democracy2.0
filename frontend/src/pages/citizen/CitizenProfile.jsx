import InputCitizen from "../../components/signUp/InputCitizen.jsx";

const CitizenProfile = () => {


    return (
        <InputCitizen
            citizen={citizen} setCitizen={setCitizen}
            residences={residences} setResidences={setResidences}
            mails={mails} setMails={setMails}
            phones={phones} setPhones={setPhones}
            incomes={incomes} setIncomes={setIncomes}
            handleSubmit={handleSubmit} h1Title={"Edit Profile"}/>
    )
}

export default CitizenProfile;