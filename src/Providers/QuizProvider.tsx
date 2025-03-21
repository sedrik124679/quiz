import React from "react";
import { useTranslation } from "react-i18next";
import { LocalStorageKeys } from "../constants/enums.ts";
import { Answer } from "../types";

type QuizContextType = {
    selectedAnswers: Answer[];
    setSelectedAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    handleChangeLanguage: (lng: string) => void;
    handleChangeAnswers: (answer: Answer) => void;
};

const QuizContext = React.createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedAnswers, setSelectedAnswers] = React.useState<Answer[]>([]);
    const { i18n } = useTranslation();

    React.useEffect(() => {
        const storedAnswers = localStorage.getItem(LocalStorageKeys.answers);
        if (storedAnswers) {
            setSelectedAnswers(JSON.parse(storedAnswers));
        }
        const storedLanguage = localStorage.getItem(LocalStorageKeys.language);
        if (storedAnswers) {
            i18n.changeLanguage(storedLanguage as string);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem(LocalStorageKeys.answers, JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    const handleChangeAnswers = React.useCallback((userAnswer: Answer) => {
        const { id, entity, title, answers } = userAnswer;
        setSelectedAnswers((prev: Answer[]) => {
            const index = prev.findIndex((item) => item.id === id);

            if (index !== -1) {
                const updatedAnswers = [...prev];
                updatedAnswers[index] = { id, entity, title, answers };
                return updatedAnswers;
            } else {
                return [...prev, { id, entity, title, answers }];
            }
        });
    }, []);

    const handleChangeLanguage = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem(LocalStorageKeys.language, value);
    };

    const contextValue: QuizContextType = {
        selectedAnswers,
        setSelectedAnswers,
        handleChangeLanguage,
        handleChangeAnswers
    };

    return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
    const context = React.useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
