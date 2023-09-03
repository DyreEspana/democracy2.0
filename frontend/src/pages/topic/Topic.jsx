import {useState} from "react";
import countryInformationDE from "../../components/formCitizen/CountryInformationDE.jsx";
import "./Topic.css";

const Topic = ({topic, setTopic, setTopicSuccessfullySubmitted}) => {

        const [isTopicOkToSubmit, setIsTopicOkToSubmit] = useState(true);

        const handleSubmitTopic = event => {
            event.preventDefault();
            setTopicSuccessfullySubmitted(false);

            if (isTopicOkToSubmit) {
                fetch("http://localhost:8080/topic",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(topic)
                    })
                    .then((response) => response.json())
                    .then((result) => {
                        setTopicSuccessfullySubmitted(true);
                        console.log("Successful submit: ", result);
                    })
                    .catch((error) => {
                        console.error("Error: ", error);
                    });
            }
        };

        const handleChange = event => {
            const {name, value} = event.target;
            setTopic((prevState) => ({...prevState, [name]: value}));
        };

        return (
            <div className={"mainTopic"}>
                <h1>Topic</h1>
                <form method={"POST"} onSubmit={handleSubmitTopic}>
                    <label>
                        In which country should the law apply?
                        <select
                            name={"country"} id={"country"}
                            required={true}
                            value={topic.country}
                            onChange={handleChange}
                        >
                            <option value={""}>--select country--</option>
                            {countryInformationDE.map((land, index) =>
                                <option key={index} value={land.name}>{land.flag} {land.name}</option>
                            )}
                        </select>
                    </label>
                    <label>
                        title
                        <input type={"text"}
                               name={"title"} id={"title"}
                               required={true}
                               onInput={handleChange}
                        />
                    </label>
                    <label>
                        describe the theme
                        <textarea
                            name={"theme"} id={"theme"}
                            required={true}
                            rows={6}
                            onInput={handleChange}
                        />
                    </label>
                    <label>
                        requirements
                        <textarea
                            name={"requirements"} id={"requirements"}
                            required={true}
                            rows={3}
                            onInput={handleChange}
                        />
                    </label>
                    <label>
                        restrictions
                        <textarea
                            name={"restrictions"} id={"restrictions"}
                            required={true}
                            rows={3}
                            onInput={handleChange}
                        />
                    </label>
                    <label>
                        existingLaw
                        <input type={"text"}
                               name={"existingLaw"} id={"existingLaw"}
                               required={true}
                               onInput={handleChange}
                        />
                    </label>
                    <div>
                        <button type="reset">reset</button>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        )
    }
;

export default Topic;