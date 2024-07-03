import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProgressBar from "./ProgressBar.tsx";
import Loader from "./Loader.tsx";
import Select from "./Select.tsx";
import { Question } from "../types";
import { useQuizContext } from "../Providers/QuizProvider.tsx";

interface QuizProps {}

const Quiz: React.FC<QuizProps> = ({ }) => {
    const { id = "1" } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { selectedAnswers, handleChangeLanguage, handleChangeAnswers } = useQuizContext();

    const [isLoading, setIsLoading] = React.useState(false);

    const question = t((`${id}` as any), ({ returnObjects: true } as any)) as Question;

    const { question: title, subtitle, entity } = question;

    const handleChange = React.useCallback((answers: any) => {
        handleChangeAnswers({ id, entity, title, answers })

        if (+id === 1) {
            const { value } = answers[0];

            handleChangeLanguage(value);
        }

        if (+id + 1 <= 5) {
            navigate(`/quiz/${+id + 1}`);
        } else {
            setIsLoading(true);
        }

    }, [entity, selectedAnswers, handleChangeAnswers]);

    if (isLoading) return <Loader />

    return (
        <Fragment>
            <ProgressBar
                currentQuestion={+id}
                totalQuestions={5}
            />
            {title && (
                <h1 className="question-title">{ title }</h1>
            )}

            {subtitle && (
                <h5 className="question-subtitle">{ subtitle }</h5>
            )}

            <Select
                question={question}
                handleChange={handleChange}
            />
        </Fragment>
    );
};

export default Quiz;