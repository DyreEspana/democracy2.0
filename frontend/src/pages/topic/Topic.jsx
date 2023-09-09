import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/loading/Loading.jsx";
import "./Topic.css";

const Topic = ({BACKEND_PORT}) => {

    const AI_PORT = "http://localhost:9080";

    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const [topic, setTopic] = useState({
        country: localStorage.getItem("country"),
        title: "",
        goal: ""
    });
    const [citizenInputs, setCitizenInputs] = useState([]);
    const [optimizeLawInput, setOptimizeLawInput] = useState(" ");
    const [lawCreationLog, setLawCreationLog] = useState({messagesLogs: []});

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBottom();
    }, [lawCreationLog.messagesLogs.length, citizenInputs.length]);


    const handleTopicInput = event => {
        event.preventDefault();
        let {name, value} = event.target;
        if (name === "title") {
            let splitTitle = value.split(" ");
            if (splitTitle[0] !== "") {
                splitTitle[0] = splitTitle[0][0].toUpperCase() + splitTitle[0].slice(1).toLowerCase();
            }
            value = splitTitle.join(" ");
        }
        setTopic((prevState) => ({...prevState, [name]: value}));
    };

    const handleOptimizeLawInput = event => {
        event.preventDefault();

        setOptimizeLawInput(event.target.value);
    };

    const onSubmit = async event => {
        event.preventDefault();

        citizenInputs.length === 0 ?
            setCitizenInputs([...citizenInputs, topic.goal])
            : setCitizenInputs([...citizenInputs, optimizeLawInput]);
        setOptimizeLawInput("");

        try {
            const response = await fetch(AI_PORT + "/law-generator/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(optimizeLawInput === " " ?
                    topic : {optimizeLawInput, lawCreationLog}),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            setLawCreationLog(data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }

    }

    const onSave = async event => {
        event.preventDefault();
        navigate("/dashboard");

        try {
            const response = await fetch(AI_PORT + "/law-pro-contra", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lawCreationLog)
            });
            const proContra = await response.json();
            if (response.status !== 200) {
                throw proContra.error || new Error(`Request failed with status ${response.status}`);
            }
            postTopic(proContra);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const postTopic = (proContra) => {
        const laws = lawCreationLog.messagesLogs;
        const splitProContraText = proContra.split("\n");
        const indexOfEndPro = splitProContraText.indexOf("");
        let proArray = [];
        for (let i = 0; i < indexOfEndPro; i++) {
            proArray.push(splitProContraText[i]);
        }
        let pro = proArray.join("\n");
        let contraArray = [];
        for (let i = indexOfEndPro + 1; i < splitProContraText.length; i++) {
            contraArray.push(splitProContraText[i]);
        }
        let contra = contraArray.join("\n");

        fetch(BACKEND_PORT + "/topic",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...topic, law: laws[laws.length - 1].content, pro, contra})
            })
            .then(response => response.text())
            .then(resText => console.log(resText))
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    return (
        <div className={"mainDivTopic"}>
            <form className={"topicForm"}
                  onSubmit={onSubmit}>
                <h1>{topic.title === "" ? "Topic" : topic.title}</h1>
                {citizenInputs.length === 0 ?
                    <>
                        <label>
                            title
                            <input
                                type={"text"}
                                name={"title"} id={"title"}
                                required={true}
                                value={topic.title}
                                onInput={handleTopicInput}
                            />
                        </label>
                        <label>
                            goal
                            <textarea
                                name={"goal"} id={"goal"}
                                required={true}
                                rows={12}
                                onInput={handleTopicInput}
                            />
                        </label>
                    </>
                    :
                    <>
                        <div className={"lawCreationLog"}>
                            {citizenInputs.map((content, index) =>
                                <div key={index} className={"logPart"}>
                                    <label id={"citizen"} className={"msg"}>
                                        {localStorage.getItem("loggedInUsername")}:
                                        <p>{content}</p>
                                    </label>
                                    <label id={"ai"} className={"msg"}
                                           ref={index === citizenInputs.length - 1 ? messagesEndRef : null}>
                                        law version {index + 1}:
                                        {lawCreationLog.messagesLogs[index * 2 + 1] === undefined ?
                                            <Loading/> :
                                            lawCreationLog.messagesLogs[index * 2 + 1].content.split("\n")
                                                .map((paragraph, i) => (
                                                    i === 0 ? <h2 key={i}>{paragraph} </h2> :
                                                        paragraph.includes("§") ? <h3 key={i}>{paragraph} </h3> :
                                                            paragraph === "" ? <p key={i}><br/></p> :
                                                                <p key={i}>{paragraph} </p>
                                                ))
                                        }
                                    </label>
                                </div>
                            )}
                        </div>
                        <label>
                            optimize your law (optional)
                            <input
                                name={"optimize"} id={"optimize"}
                                type={"text"}
                                value={optimizeLawInput}
                                onInput={handleOptimizeLawInput}
                            />
                        </label>
                    </>
                }
                {topic.goal !== "" && optimizeLawInput !== "" ?
                    <div className={"formButtons"}>
                        <button type={"reset"}>reset</button>
                        <button type={"submit"}>
                            {citizenInputs.length === 0 ? "create" : "optimize"}
                        </button>
                    </div>
                    : ""}
                {
                    citizenInputs.length > 0 &&
                    <button className={"saveLaw"} type={"button"} onClick={onSave}>save</button>
                }
            </form>
        </div>
    )
}

export default Topic;