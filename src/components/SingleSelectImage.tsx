import React from "react";
import Female from "../assets/Female.png";
import Male from "../assets/Male.png";
import Other from "../assets/Other.png";
import { Option } from "../types";

type SingleSelectImageProps = {
    options: Option[];
    handleChange: (answers: Option[]) => void;
};

const genderImages = [Female, Male, Other];

const SingleSelectImage: React.FC<SingleSelectImageProps> = ({ options, handleChange }) => {
    const [localeOptions] = React.useState(options);

    return (
        <div className={"single-select-image"}>
            {localeOptions.map((option, index) => {
                const { label } = option;
                return (
                    <div key={label} className={"single-select-image-option"} onClick={() => handleChange([option])}>
                        <img src={genderImages[index] as string} alt={label} />
                        <span className={"single-select-image-label"}>{label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default SingleSelectImage;
