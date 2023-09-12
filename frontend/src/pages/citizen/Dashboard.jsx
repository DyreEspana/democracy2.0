import LawList from "../../components/topic/law/LawList.jsx";
import "./Dashboard.css"

const Dashboard = ({BACKEND_PORT, handleCloseProfileMenu}) => {
    return (
        <div className={"dashboardMainDiv"}
             onClick={handleCloseProfileMenu}>
            <h1>Dashboard</h1>
            <LawList
                BACKEND_PORT={BACKEND_PORT}
            />
        </div>
    )
}

export default Dashboard;