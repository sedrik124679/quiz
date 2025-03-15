import React from "react";
import NextButton from "./NextButton.tsx";
import { Option } from "../types";

type MultipleSelectProps = {
    options: Option[];
    handleChange: (answers: Option[]) => void;
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({ options, handleChange }) => {
    const [localeOptions] = React.useState(options);
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    const handleCheckboxChange = (option: Option) => {
        setSelectedOptions((prev) =>
            prev.find((item) => item.value === option.value)
                ? prev.filter((opt) => opt.value !== option.value)
                : [...prev, option]
        );
    };

    const handleClick = React.useCallback(() => handleChange(selectedOptions), [selectedOptions]);

    return (
        <div>
            <div className="multiple-select-container">
                {localeOptions.map((option) => {
                    const { value, label } = option;
                    return (
                        <label
                            className={`multiple-select-option ${
                                selectedOptions.find((item) => item.value === value)
                                    ? "multiple-select-option-selected"
                                    : ""
                            }`}
                            key={value}
                        >
                            {label}
                            <input
                                type="checkbox"
                                value={value}
                                className="multiple-select-checkbox"
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="multiple-select-checkbox-box" />
                        </label>
                    );
                })}
            </div>
            <NextButton disabled={!selectedOptions.length} onClick={handleClick} />
        </div>
    );
};

export default MultipleSelect;
