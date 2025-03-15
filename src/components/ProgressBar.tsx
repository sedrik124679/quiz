import React from "react";
import { useNavigate } from "react-router-dom";

import Back from "../assets/Back.svg";
import Menu from "../assets/O.svg";

type ProgressBarProps = {
    currentQuestion: number;
    totalQuestions: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion = 1, totalQuestions = 5 }) => {
    const navigate = useNavigate();

    const onPreviousClick = React.useCallback(() => {
        navigate(`/quiz/${+currentQuestion - 1}`);
    }, [currentQuestion]);

    const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-text">
                <div>{currentQuestion !== 1 && <img src={Back} alt="Previous" onClick={onPreviousClick} />}</div>
                <div>
                    <span>{currentQuestion}</span>/{totalQuestions}
                </div>
                <div>
                    <img src={Menu} alt="Menu" />
                </div>
            </div>
            <div className="progress-bar-background">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
            </div>
        </div>
    );
};

export default ProgressBar;
