import "./index.css";

import Info     from "../../icons/info";
import Email    from "../../icons/email";
import Github   from "../../icons/github";
import Website  from "../../icons/website";
import LinkedIn from "../../icons/linkedin";

function InfoPage(){
    return (
        <section>
            <div className="page-header">
                <Info width="48" height="48"/>
                <h1>INFO</h1>
            </div>

            <p>Esse projeto surgiu somente da necessidade de melhorar minhas habilidades com React e a <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">API IndexedDB</a> dos navegadores. Caso tenha sugestões, dúvidas ou queira reportar bugs, você pode me contatar nas seguintes redes:</p>

            <div className="links">
                <a href="mailto:yurikanegae@gmail.com">             <Email    width="48" height="48"/></a>
                <a href="https://www.linkedin.com/in/yurikanegae/"> <LinkedIn width="48" height="48"/></a>
                <a href="https://github.com/YuriKanegae">           <Github   width="48" height="48"/></a>
                <a href="https://yurikanegae.com">                  <Website  width="48" height="48"/></a>
            </div>

            <p>Todo o layout e tema é inspirado no <a href="https://monkeytype.com/">MonkeyType</a>.</p>
        </section>
    );
}

export default InfoPage;