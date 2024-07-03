import React from "react";
import { Option } from "../types";

interface SingleSelectProps {
    options: Option[],
    handleChange: (answers: Option[]) => void,
}

const SingleSelect: React.FC<SingleSelectProps> = ({ options, handleChange  }) => {
    const [localeOptions] = React.useState(options);

    const memoOptions = React.useMemo(() => {
        return localeOptions.map((option) => option);
    }, [localeOptions, options]);

    return (
        <div className="single-select-container">
            {memoOptions.map((option) => {
                const { value, label } = option;
                return (
                    <div
                        key={value}
                        className="single-select-option"
                        onClick={() => handleChange([option])}
                    >
                        {label}
                    </div>
                )
            })}
        </div>
    );
};

export default SingleSelect;