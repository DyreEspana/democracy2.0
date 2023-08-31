import {Link} from "react-router-dom";
import "../navigation/Navigation.css"

const CitizenMenuModal = ({isCitizenMenuOpen, setIsCitizenMenuOpen, setIsCitizenLoggedIn}) => {

    const closeModal = () => {
        setIsCitizenMenuOpen(false);
    };

    const handleLogout = () => {
        setIsCitizenMenuOpen(false);
        setIsCitizenLoggedIn(false);
        localStorage.clear();
    }

    return (<>
            {isCitizenMenuOpen ?
                <div className="mainDivCitizenMenu">
                    <ul>
                        <li className={"citizenProfile"}>
                            <Link className={"linkIcon"} to={"/citizen-profile"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path
                                        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                </svg>
                                Profile</Link>
                        </li>
                        <li className={"signOut"}>
                            <Link className={"linkIcon"} to="/sign-out" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path
                                        d="M806-440H360q-17 0-28.5-11.5T320-480q0-17 11.5-28.5T360-520h446l-34-34q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T829-611l103 103q12 12 12 28t-12 28L829-349q-12 12-28.5 11.5T772-350q-11-12-11.5-28t11.5-28l34-34ZM600-640v-120H200v560h400v-120q0-17 11.5-28.5T640-360q17 0 28.5 11.5T680-320v120q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v120q0 17-11.5 28.5T640-600q-17 0-28.5-11.5T600-640Z"/>
                                </svg>
                                Logout</Link>
                        </li>
                    </ul>
                    <button type={"button"} onClick={closeModal}>Close</button>
                </div>
                : ""}
        </>
    )
};

export default CitizenMenuModal;