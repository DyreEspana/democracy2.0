import {useEffect, useState} from "react";

const LawList = ({BACKEND_PORT}) => {

    const [laws, setLaws] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(laws);

    useEffect(() => {
        console.log("Fetch");
        setLoading(true);
        fetch(BACKEND_PORT + "/topic",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => response.json())
            .then(topics => {
                console.log(topics);
                console.log(typeof topics);
                if (topics.length !== 0) {
                    console.log("set topics")
                    setLaws(topics)
                    setLoading(false);
                }
            })
            .catch(error => console.error("Error: " + error));
    }, []);

    const handleNavigateToLawPage = (event, index) => {
        event.preventDefault();

        console.log("Law Click" + index);
        console.log(event);
    };

    return (
        <>
            {laws.length !== 0 ?
                <div className={"lawListMainDiv"}>
                    <h2>Laws</h2>
                    {laws.map((law, index) =>
                        <div key={index} className={"law"}
                             onClick={handleNavigateToLawPage}>
                            <h2>law.title</h2>
                            <p>law.goal</p>
                        </div>)}
                </div>
                : ""}
        </>
    )
}

export default LawList;