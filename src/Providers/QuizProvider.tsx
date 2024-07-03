import React, { createContext, useContext } from "react";
import { Answer } from "../types";
import { useTranslation } from "react-i18next";

interface QuizContextType {
    selectedAnswers: Answer[];
    setSelectedAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    handleChangeLanguage: (lng: string) => void,
    handleChangeAnswers: (answer: Answer) => void,
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedAnswers, setSelectedAnswers] = React.useState<Answer[]>([]);
    const { i18n } = useTranslation();

    React.useEffect(() => {
        const storedAnswers = localStorage.getItem('answers');
        if (storedAnswers) {
            setSelectedAnswers(JSON.parse(storedAnswers));
        }
        const storedLanguage = localStorage.getItem('language');
        if (storedAnswers) {
            i18n.changeLanguage(storedLanguage as string);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('answers', JSON.stringify(selectedAnswers));
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
        localStorage.setItem('language', value);
    };

    const contextValue: QuizContextType = {
        selectedAnswers,
        setSelectedAnswers,
        handleChangeLanguage,
        handleChangeAnswers,
    };

    return (
        <QuizContext.Provider value={contextValue}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};