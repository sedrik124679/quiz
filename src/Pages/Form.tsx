import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../Providers/QuizProvider.tsx";

import Menu from "../assets/O.svg";
import NextButton from "../components/NextButton.tsx";
import { Routes } from "../constants/enums.ts";
import { validateEmail } from "../utils";

const Form = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { handleChangeAnswers } = useQuizContext();

    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    const handleNextClick = () => {
        if (!validateEmail(email)) {
            setError(t("email.error"));
        } else {
            handleChangeAnswers({
                id: "6",
                entity: "email",
                answers: [{ label: email, value: email }],
                title: "Email"
            });
            setError("");
            navigate(Routes.thankYou);
        }
    };

    return (
        <div className="form-container">
            <div className="menu-container">
                <img src={Menu} alt="Menu" />
            </div>
            <h1 className="form-title">{t("email.title")}</h1>
            <h5 className="form-subtitle">{t("email.subtitle")}</h5>
            <input
                type="email"
                placeholder={t("email.placeholder")}
                className={`form-input ${error ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="form-error">{error}</div>}
            <div className="form-privacy">
                <Trans i18nKey="email.policy" components={{ a: <a href="#" className="form-link" /> }} />
            </div>

            <NextButton disabled={!email.length} onClick={handleNextClick} />
        </div>
    );
};

export default Form;
