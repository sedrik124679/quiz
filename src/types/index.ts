export type Option = {
    label: string;
    value: string;
};

export type Question = {
    question: string;
    entity: string;
    options: Option[];
    subtitle?: string;
};

export type Answer = {
    id: string;
    entity: string;
    title: string;
    answers: Option[];
};
