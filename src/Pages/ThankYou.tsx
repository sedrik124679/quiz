import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CheckMark from "../assets/checkmark.svg";
import Download from "../assets/download.svg";
import NextButton from "../components/NextButton.tsx";
import Menu from "../assets/O.svg";
import { useQuizContext } from "../Providers/QuizProvider.tsx";
import { downloadCSVFile } from "../utils";

interface ThankYouProps {}

const ThankYou: React.FC<ThankYouProps> = ({}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { selectedAnswers, setSelectedAnswers } = useQuizContext();

    const handleRetakeQuizClick = React.useCallback(() => {
        setSelectedAnswers([]);
        navigate("/quiz/1");
    }, []);

    const handleDownload = React.useCallback(() => {
        const csvContent = selectedAnswers.reduce((acc, answer) => {
            const answers = answer.answers.map((ans) => ans.value).join(',');
            return `${acc}${answer.id},${answer.title},${answer.entity},"${answers}"\n`;
        }, "order,title,type,answer\n");

        downloadCSVFile(csvContent);
    }, [selectedAnswers]);

    return (
        <div className="thanku-container">
            <div className="menu-container">
                <img src={Menu} alt="Menu"/>
            </div>
            <div className="title">{t("thankyou.title")}</div>
            <div className="subtitle">{t("thankyou.subtitle")}</div>
            <img src={CheckMark} alt="CheckMark" className="checkmark"/>

            <div className="download" onClick={handleDownload}>
                <img src={Download} alt="download"/>
                {t("thankyou.download")}
            </div>
            <NextButton
                disabled={false}
                onClick={handleRetakeQuizClick}
                text={t("retakeQuiz")}
            />
        </div>
    );
};

export default ThankYou;