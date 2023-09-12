import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";

import Dashboard from "./pages/citizen/Dashboard.jsx";
import CitizenProfile from "./pages/citizen/CitizenProfile.jsx";
import Topic from "./pages/topic/Topic.jsx";
import Law from "./pages/topic/law/Law.jsx";
import Vote from "./pages/topic/vote/Vote.jsx";
import Statistic from "./pages/topic/statistic/Statistic.jsx";

import './App.css'

function App() {

    const BACKEND_PORT = "http://localhost:8080";

    const [citizen, setCitizen] = useState({
        gender: "",
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: "",
        socialSecurityNumber: '',
        nationality: ""
    });
    const [residences, setResidences] = useState([]);
    const [mails, setMails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [incomes, setIncomes] = useState([]);

    const [isCitizenRegistered, setIsCitizenRegistered] = useState(false);
    const [isCitizenLoggedIn, setIsCitizenLoggedIn] = useState(false);

    const [isProfilePressed, setIsProfilePressed] = useState(false);

    //ToDo maybe i dont need this
    const [law, setLaw] = useState("");
    const [lawProContra, setLawProContra] = useState("");

    const handleCloseProfileMenu = event => {
        setIsProfilePressed(false);
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigation
                isCitizenLoggedIn={isCitizenLoggedIn}
                isCitizenRegistered={isCitizenRegistered}
                setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                setIsCitizenRegistered={setIsCitizenRegistered}
                setIsProfilePressed={setIsProfilePressed}
            />,
            children: [
                {
                    path: "/",
                    element: <Home
                        handleCloseProfileMenu={handleCloseProfileMenu}
                    />
                },
                {
                    path: "/sign-up",
                    element: <SignUp
                        BACKEND_PORT={BACKEND_PORT}
                        citizen={citizen} setCitizen={setCitizen}
                        residences={residences} setResidences={setResidences}
                        mails={mails} setMails={setMails}
                        phones={phones} setPhones={setPhones}
                        incomes={incomes} setIncomes={setIncomes}
                        isCitizenRegistered={isCitizenRegistered}
                        setIsCitizenRegistered={setIsCitizenRegistered}
                        isCitizenLoggedIn={isCitizenLoggedIn}
                        setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                    />
                },
                {
                    path: "/sign-in",
                    element: <SignIn
                        BACKEND_PORT={BACKEND_PORT}
                        setIsCitizenRegistered={setIsCitizenRegistered}
                        setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                    />
                },
                {
                    path: "/sign-out",
                    element: <Home
                    />,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard
                        BACKEND_PORT={BACKEND_PORT}
                        handleCloseProfileMenu={handleCloseProfileMenu}
                    />
                },
                {
                    path: "/citizen-profile",
                    element: <CitizenProfile
                        BACKEND_PORT={BACKEND_PORT}
                        handleCloseProfileMenu={handleCloseProfileMenu}
                        citizen={citizen} setCitizen={setCitizen}
                        residences={residences} setResidences={setResidences}
                        mails={mails} setMails={setMails}
                        phones={phones} setPhones={setPhones}
                        incomes={incomes} setIncomes={setIncomes}
                        isCitizenLoggedIn={isCitizenLoggedIn}
                        isProfilePressed={isProfilePressed}
                    />
                },
                {
                    path: "/topic",
                    element: <Topic
                        BACKEND_PORT={BACKEND_PORT}
                        handleCloseProfileMenu={handleCloseProfileMenu}
                    />
                },
                {
                    path: "/law",
                    element: <Law
                        handleCloseProfileMenu={handleCloseProfileMenu}
                        law={law}
                        setLaw={setLaw}
                        lawProContra={lawProContra}
                        setLawProContra={setLawProContra}
                    />
                },
                {
                    path: "/vote",
                    element: <Vote
                        handleCloseProfileMenu={handleCloseProfileMenu}
                    />
                },
                {
                    path: "/statistic",
                    element: <Statistic
                        handleCloseProfileMenu={handleCloseProfileMenu}
                    />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App