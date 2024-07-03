export interface Option {
    label: string,
    value: string,
}

export interface Question {
    question: string,
    entity: string,
    options: Option[],
    subtitle?: string,
}

export interface Answer {
    id: string,
    entity: string,
    title: string,
    answers: Option[],
}

export enum Entities {
    singleSelect = "single-select",
    singleSelectImage = "single-select-image",
    multipleSelect = "multiple-select",
    bubbleSelect = "bubble-select",
}