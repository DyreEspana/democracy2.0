import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";

import Dashboard from "./pages/citizen/Dashboard.jsx";
import CitizenProfile from "./pages/citizen/CitizenProfile.jsx";
import Topic from "./pages/citizen/topic/Topic.jsx";
import Survey from "./pages/citizen/survey/Survey.jsx";
import Law from "./pages/citizen/law/Law.jsx";
import Vote from "./pages/citizen/vote/Vote.jsx";
import Statistic from "./pages/citizen/statistic/Statistic.jsx";

import './App.css'

function App() {
    const [username, setUsername] = useState("");
    const [isCitizenRegistered, setIsCitizenRegistered] = useState(false);
    const [isCitizenLoggedIn, setIsCitizenLoggedIn] = useState(false);
    const [authorities, setAuthorities] = useState([]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigation
                isCitizenRegistered={isCitizenRegistered}
                isCitizenLoggedIn={isCitizenLoggedIn}
                setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                username={username}/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/sign-up",
                    element: <SignUp
                        isCitizenRegistered={isCitizenRegistered}
                        setIsCitizenRegistered={setIsCitizenRegistered}
                        setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                        setUsername={setUsername}/>
                },
                {
                    path: "/sign-in",
                    element: <SignIn
                        isCitizenLoggedIn={isCitizenLoggedIn}
                        setIsCitizenLoggedIn={setIsCitizenLoggedIn}
                        setIsCitizenRegistered={setIsCitizenRegistered}
                        setUsername={setUsername}
                        setAuthorities={setAuthorities}/>
                },
                {
                    path: "/sign-out",
                    element: <Home/>,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard/>
                },
                {
                    path: "/citizen-profile",
                    element: <CitizenProfile/>
                },
                {
                    path: "/topic",
                    element: <Topic/>
                },
                {
                    path: "/survey",
                    element: <Survey/>
                },
                {
                    path: "/law",
                    element: <Law/>
                },
                {
                    path: "/vote",
                    element: <Vote/>
                },
                {
                    path: "/statistic",
                    element: <Statistic/>
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App