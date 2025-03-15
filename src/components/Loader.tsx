import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Routes } from "../constants/enums.ts";

const progressEndValue = 100;
const speed = 35;

const Loader = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= progressEndValue) {
                    clearInterval(interval);
                    navigate(Routes.email);
                    return prev;
                }
                return prev + 1;
            });
        }, speed);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="loader-container">
            <div className="spinner-container">
                <div
                    className="circular-progress"
                    style={{ background: `conic-gradient(#E4229C ${progress * 3.6}deg, #ededed 0deg)` }}
                >
                    <div className="progress-value">{`${progress}%`}</div>
                </div>
            </div>
            <h5>
                <Trans i18nKey="loader.label" components={{ br: <br /> }} />
            </h5>
        </div>
    );
};

export default Loader;
