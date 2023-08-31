import "./Home.css";

const Home = () => {
    return (
        <div className={"mainDivHome"}>
            <header>
                <div>
                    <h1>Demokratie 2.0</h1>
                    <p>Wir entscheiden über unser Leben</p>
                </div>
            </header>
            <section className={"intro"}>
                <h2>Vision</h2>
                <p>
                    Wir wollen das Leben für alle verbessern!
                    <br/>
                    <br/>
                    Unterstützt von einer unabhängigen und objektiven Künstlichen Intelligenz werden Gesetzestexte
                    automatisch erstellt.
                    Jeder kann etwas bewirken.
                    <br/>
                    <br/>
                    Deine Stimme zählt!
                </p>
            </section>
            <section className={"theme info"}>
                <svg className={"leftIcon"}
                     xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                    <path
                        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h300v60H180v600h600v-300h60v300q0 24-18 42t-42 18H180Zm480-420v-120H540v-60h120v-120h60v120h120v60H720v120h-60Z"/>
                </svg>
                <div>
                    <h3>1. Thema</h3>
                    <p>
                        Nachdem du öfters mitgewirkt hast steht es dir offen, Themen einzubringen, die dir am Herzen
                        liegen.
                        <br/>
                        Bitte überlege dir nur sehr gut, welche Themen du einreichen willst, denn du hast für einen
                        gewissen
                        Zeitraum nur eine limitierte Anzahl.
                        <br/>
                        Hier erhältst du ein simples Formular, welches du gewissenhaft ausfüllen solltest und die KI
                        macht
                        den Rest
                        für dich. Sie recherchiert, erstellt Umfragen und schreibt das Gesetz für dich.
                    </p>
                </div>
            </section>
            <section className={"survey info"}>
                <div>
                    <h3>2. Umfragen</h3>
                    <p>
                        Wenn dein intelligenter Gesetzesentwerfer bei der Recherche nicht alle wichtigen Daten und
                        Fakten
                        findet, erstellt er ganz automatisch eine Umfrage.
                        <br/>
                        <br/>
                        Jeder kann seine Stimme einmal pro Thema äußern.
                        <br/>
                        <br/>
                        Diese Umfragen sind jedoch nur für einen gewissen Zeitraum freigeschaltet.
                    </p>
                </div>
                <svg className={"rightIcon"}
                     xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                    <path
                        d="M250-279h220v-60H250v60Zm120-171h220v-60H370v60Zm120-171h220v-60H490v60ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/>
                </svg>
            </section>
            <section className={"law info"}>
                <svg className={"leftIcon"}
                     xmlns="http://www.w3.org/2000/svg" height="48"
                     viewBox="0 -960 960 960" width="48">
                    <path
                        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-660v600h600v-600H676v279l-98-59-98 59v-279H180Zm0 600v-600 600Z"/>
                </svg>
                <div>
                    <h3>3. Gesetz</h3>
                    <p>
                        Dein Thema hat jetzt ein Gesetz, das allen öffentlich zur Verfügung steht.
                        <br/>
                        <br/>
                        Doch dein intelligenter Assistent kann noch mehr!
                        Er informiert dich auch kurz und bündig über die Vor- und Nachteile.
                    </p>
                </div>
            </section>
            <section className={"vote info"}>
                <div>
                    <h3>4. Abstimmung</h3>
                    <p>
                        Um abstimmen zu können, muss jeder zuerst die Pros und Contras lesen.
                        Dadurch soll sichergestellt werden, dass nur informierte Personen abstimmen dürfen.
                        <br/>
                        <br/>
                        Die Abstimmung ist zeitlich begrenzt verfügbar, also gib deine Stimme so schnell wie möglich ab!
                        Schau immer wieder rein, um top informiert zu bleiben und keine Abstimmung zu verpassen.
                        Immerhin kannst du so einfach über dein Leben entscheiden.
                        <br/>
                        <br/>
                        Es ist ganz einfach - schlußendlich gibt es nur ein Ja oder Nein.
                    </p>
                </div>
                <svg className={"rightIcon"}
                     xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                    <path
                        d="M180-120q-24.75 0-42.375-17.625T120-180v-600q0-24.75 17.625-42.375T180-840h600q14 0 25.5 6t18.5 14l-44 44v-4H180v600h600v-343l60-60v403q0 24.75-17.625 42.375T780-120H180Zm281-168L239-510l42-42 180 180 382-382 42 42-424 424Z"/>
                </svg>
            </section>
            <section className={"statistic info"}>
                <svg className={"leftIcon"}
                     xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                    <path
                        d="M284-277h60v-205h-60v205Zm332 0h60v-420h-60v420Zm-166 0h60v-118h-60v118Zm0-205h60v-60h-60v60ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/>
                </svg>
                <div>
                    <h3>5. Statistik</h3>
                    <p>
                        Nachdem alle Stimmen ausgewertet wurden, erhält man Zugriff auf informative Statistiken.
                        <br/>
                        <br/>
                        Damit erhältst du einen Überblick, wie das Thema bei anderen angekommen ist.
                        Wann die nächsten Abstimmungen zu ähnlichen Themen möglich sind, siehst du hier auch.
                    </p>
                </div>
            </section>
        </div>
    )
};

export default Home;