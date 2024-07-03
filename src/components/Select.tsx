import React from "react";

import SingleSelectImage from "./SingleSelectImage.tsx";
import BubbleSelect from "./BubbleSelect.tsx";
import MultipleSelect from "./MultipleSelect.tsx";
import SingleSelect from "./SingleSelect.tsx";

import { Option, Question } from "../types";
import { Entities } from "../constants/enums.ts";

interface SelectProps {
    question: Question,
    handleChange: (answers: Option[]) => void;
}

const Select: React.FC<SelectProps> = ({ question, handleChange }) => {
    const { entity, options } = question;

    const localeOptions = React.useMemo(() => {
        return options;
    }, [options])

    switch (entity) {
        case Entities.singleSelectImage: {
            const options = localeOptions.map((option) => ({ ...option }));
            return (
                <SingleSelectImage
                    options={options}
                    handleChange={handleChange}
                />
            )
        }
        case Entities.bubbleSelect: {
            const options = localeOptions.map((option) => ({ ...option }));
            return (
                <BubbleSelect
                    options={options}
                    handleChange={handleChange}
                />
            )
        }
        case Entities.multipleSelect: {
            const options = localeOptions.map((option) => ({ ...option }));
            return (
                <MultipleSelect
                    options={options}
                    handleChange={handleChange}
                />
            )
        }
        default: {
            const options = localeOptions.map((option) => ({ ...option }));
            return (
                <SingleSelect
                    handleChange={handleChange}
                    options={options}
                />
            )
        }
    }
};

export default Select;