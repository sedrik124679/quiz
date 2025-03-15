import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { useQuizContext } from "../Providers/QuizProvider.tsx";
import Loader from "../components/Loader.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import Select from "../components/Select.tsx";
import { Option, Question } from "../types";

const Quiz = () => {
    const { id = "1" } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { selectedAnswers, handleChangeLanguage, handleChangeAnswers } = useQuizContext();

    const [isLoading, setIsLoading] = React.useState(false);

    const question = t(`${id}` as any, { returnObjects: true } as any) as Question;

    const { question: title, subtitle, entity } = question;

    const handleChange = React.useCallback(
        (answers: Option[]) => {
            handleChangeAnswers({ id, entity, title, answers });

            if (Number(id) === 1) {
                const { value } = answers[0];

                handleChangeLanguage(value);
            }

            if (Number(id) + 1 <= 5) {
                navigate(`/quiz/${+id + 1}`);
            } else {
                setIsLoading(true);
            }
        },
        [entity, selectedAnswers, handleChangeAnswers]
    );

    if (isLoading) return <Loader />;

    return (
        <React.Fragment>
            <ProgressBar currentQuestion={Number(id)} totalQuestions={5} />
            {title && <h1 className="question-title">{title}</h1>}

            {subtitle && <h5 className="question-subtitle">{subtitle}</h5>}

            <Select question={question} handleChange={handleChange} />
        </React.Fragment>
    );
};

export default Quiz;
