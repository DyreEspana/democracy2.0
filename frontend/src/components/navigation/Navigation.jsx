import {Link, Outlet} from "react-router-dom";
import "./Navigation.css";
import {useState} from "react";
import CitizenMenuModal from "./CitizenMenuModal.jsx";

const Navigation = ({isCitizenRegistered, isCitizenLoggedIn, setIsCitizenLoggedIn, setIsProfilePressed}) => {

    const [isFeatureOpen, setIsFeatureOpen] = useState(true);
    const [isCitizenMenuOpen, setIsCitizenMenuOpen] = useState(false);

    const handleToggleNav = () => {
        setIsFeatureOpen(prevState => !prevState);
    };

    const handleToggleMenu = () => {
        setIsCitizenMenuOpen(prevState => !prevState);
    };

    return (
        <>
            <nav className={"citizenNav"}>
                <ul>
                    <li className={"home"}>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="M160-120v-375l-72 55-48-64 120-92v-124h80v63l240-183 440 336-48 63-72-54v375H160Zm80-80h200v-160h80v160h200v-356L480-739 240-556v356Zm-80-560q0-50 35-85t85-35q17 0 28.5-11.5T320-920h80q0 50-35 85t-85 35q-17 0-28.5 11.5T240-760h-80Zm80 560h480-480Z"/>
                            </svg>
                            Home</Link>
                    </li>
                    {!isCitizenLoggedIn && !isCitizenRegistered &&
                        <li>
                            <Link to="/sign-up">Registration</Link>
                        </li>
                    }
                    {!isCitizenLoggedIn &&
                        <li>
                            <Link to="/sign-in">Login</Link>
                        </li>
                    }
                    {isCitizenLoggedIn &&
                        <li className="account"
                            onClick={handleToggleMenu}>{localStorage.getItem("loggedInUsername")}
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                <path
                                    d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/>
                            </svg>
                        </li>
                    }
                </ul>
            </nav>

            {isCitizenMenuOpen ?
                <CitizenMenuModal
                    isCitizenMenuOpen={isCitizenMenuOpen}
                    setIsCitizenMenuOpen={setIsCitizenMenuOpen}
                    setIsProfilePressed={setIsProfilePressed}
                    setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                />
                : ""}

            {isCitizenLoggedIn ?
                <nav className={"featureNav"}>
                    <ul>
                        <li id={"dashboard"}>
                            <Link className={"linkIcon"} to={"/topic"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path
                                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/dashboard">Dash</Link>
                                : ""}
                        </li>
                        <li>
                            <Link className={"linkIcon"} to={"/topic"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path
                                        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h300v60H180v600h600v-300h60v300q0 24-18 42t-42 18H180Zm480-420v-120H540v-60h120v-120h60v120h120v60H720v120h-60Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/topic">Topic</Link>
                                : ""}
                        </li>
                        <li>
                            <Link className={"linkIcon"} to={"/survey"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path
                                        d="M250-279h220v-60H250v60Zm120-171h220v-60H370v60Zm120-171h220v-60H490v60ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/survey">
                                    Survey</Link>
                                : ""}
                        </li>
                        <li>
                            <Link className={"linkIcon"} to={"/law"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path
                                        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-660v600h600v-600H676v279l-98-59-98 59v-279H180Zm0 600v-600 600Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/law">Law</Link>
                                : ""}
                        </li>
                        <li>
                            <Link className={"linkIcon"} to={"/vote"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path
                                        d="M180-120q-24.75 0-42.375-17.625T120-180v-600q0-24.75 17.625-42.375T180-840h600q14 0 25.5 6t18.5 14l-44 44v-4H180v600h600v-343l60-60v403q0 24.75-17.625 42.375T780-120H180Zm281-168L239-510l42-42 180 180 382-382 42 42-424 424Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/vote">Vote</Link>
                                : ""}
                        </li>
                        <li>
                            <Link className={"linkIcon"} to={"/statistic"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path
                                        d="M284-277h60v-205h-60v205Zm332 0h60v-420h-60v420Zm-166 0h60v-118h-60v118Zm0-205h60v-60h-60v60ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/>
                                </svg>
                            </Link>
                            {isFeatureOpen ?
                                <Link to="/statistic">Statistic</Link>
                                : ""}
                        </li>
                        <li id={"toggleFeatureNav"}
                            onClick={handleToggleNav}>
                            <svg className={isFeatureOpen ? "open" : "close"}
                                 xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960"
                                 width="48">
                                <path
                                    d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/>
                            </svg>
                        </li>
                    </ul>

                </nav>
                : ""}
            <Outlet/>
        </>
    );
};

export default Navigation;