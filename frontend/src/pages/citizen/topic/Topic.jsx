import {useState} from "react";
import "./Topic.css";
import countryInformationDE from "../../../components/signUp/CountryInformationDE.jsx";

const Topic = () => {

        const [topic, setTopic] = useState({
            country: "",
            title: "",
            theme: "",
            requirements: "",
            restrictions: "",
            existingLaw: ""
        });

        console.log(topic);

        const [isTopicOkToSubmit, setIsTopicOkToSubmit] = useState(true);

        const handleSubmitTopic = event => {
            event.preventDefault();

            console.log(topic);
            console.log(JSON.stringify(topic));

            if (isTopicOkToSubmit) {
                fetch('http://localhost:8080/topic',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(topic)
                    })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("Successful submit: ", result);
                        setIsTopicOkToSubmit(true);
                    })
                    .catch((error) => {
                        console.error("Error: ", error);
                    });
            } else {
                setIsTopicOkToSubmit(false);
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
                        <input type={"text"}
                               name={"requirements"} id={"requirements"}
                               required={true}
                               onInput={handleChange}
                        />
                    </label>
                    <label>
                        restrictions
                        <input type={"text"}
                               name={"restrictions"} id={"restrictions"}
                               required={true}
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
                    <button type="reset">reset</button>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
;

export default Topic;