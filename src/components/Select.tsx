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

    switch (entity){
        case Entities.singleSelectImage:
            const imagesSelectOptions = localeOptions.map((option) => {
               return { ...option }
            });
            return (
                <SingleSelectImage
                    options={imagesSelectOptions}
                    handleChange={handleChange}
                />
            )
        case Entities.bubbleSelect:
            const bubblesSelectOptions = localeOptions.map((option) => {
                return { ...option }
            });
            return (
                <BubbleSelect
                    options={bubblesSelectOptions}
                    handleChange={handleChange}
                />
            )
        case Entities.multipleSelect:
            const multipleSelectOptions = localeOptions.map((option) => ({ ...option }));
            return (
                <MultipleSelect
                    options={multipleSelectOptions}
                    handleChange={handleChange}
                />
            )
        default:
            const singleSelectOptions = localeOptions.map((option) => ({ ...option }));

            return (
                <SingleSelect
                    handleChange={handleChange}
                    options={singleSelectOptions}
                />
            )
    }
};

export default Select;