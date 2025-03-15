import React from "react";
import NextButton from "./NextButton.tsx";
import Action from "../assets/Topic/Actions.svg";
import Adult from "../assets/Topic/Adult.svg";
import BadBoy from "../assets/Topic/Badboy.svg";
import Billionaire from "../assets/Topic/Billionaire.svg";
import Romance from "../assets/Topic/Romance.svg";
import Royal from "../assets/Topic/Royal.svg";
import Werewolf from "../assets/Topic/Werewolf.svg";
import { Option } from "../types";
import { chunkArray } from "../utils";

type BubbleSelectProps = {
    options: Option[];
    handleChange: (answers: Option[]) => void;
};

const bubbleImages = [[Werewolf, Action], [Royal, Romance], [Adult, BadBoy], [Billionaire]];

const BubbleSelect: React.FC<BubbleSelectProps> = ({ options, handleChange }) => {
    const [localeOptions] = React.useState(options);

    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

    const handledOptions = React.useMemo(() => chunkArray(localeOptions, 2), [localeOptions, options]);

    const handleSelectChange = (option: Option) => {
        setSelectedOptions((prev) => {
            if (prev.find((item) => item.value === option.value)) {
                return prev.filter((opt) => opt.value !== option.value);
            } else if (prev.length < 3) {
                return [...prev, option];
            } else {
                return prev;
            }
        });
    };

    const handleClick = React.useCallback(() => handleChange(selectedOptions), [selectedOptions]);

    return (
        <div className="bubble-select">
            <div className="bubble-select-container">
                {handledOptions.map((options, index) => {
                    return (
                        <div
                            key={`${index}-${options[0].value}`}
                            style={{
                                marginTop:
                                    options.length === 1 && index === handledOptions.length - 1
                                        ? "-12px"
                                        : index % 2 !== 0
                                          ? "24px"
                                          : "0"
                            }}
                            className="option-group"
                        >
                            {options.map((opt: Option, i: number) => {
                                const { label, value } = opt;
                                return (
                                    <div
                                        key={label}
                                        className={`option ${
                                            selectedOptions.find((item) => item.value === value) ? "selected" : ""
                                        }`}
                                        onClick={() => handleSelectChange({ label, value })}
                                    >
                                        <img src={bubbleImages[index][i] as string} alt={label} />
                                        <span>{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <NextButton disabled={!selectedOptions.length} onClick={handleClick} />
        </div>
    );
};

export default BubbleSelect;
