import React, { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

type NextButtonProps = {
    disabled: boolean;
    onClick: () => void;
    styles?: CSSProperties;
    text?: string;
};

const NextButton: React.FC<NextButtonProps> = ({ disabled, onClick, styles = {}, text = "" }) => {
    const { t } = useTranslation();
    return (
        <button className="select-button" disabled={disabled} onClick={onClick} style={styles}>
            {text || t("nextButton")}
        </button>
    );
};

export default NextButton;
