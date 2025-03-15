import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import Form from "./Pages/Form.tsx";
import Quiz from "./Pages/Quiz.tsx";
import ThankYou from "./Pages/ThankYou.tsx";
import { QuizProvider } from "./Providers/QuizProvider.tsx";
import { Routes as RoutesEnum } from "./constants/enums.ts";

function App() {
    return (
        <main>
            <HashRouter>
                <QuizProvider>
                    <Routes>
                        <Route path={RoutesEnum.default} element={<Navigate to={RoutesEnum.firstPage} />} />
                        <Route path={RoutesEnum.quizPage} element={<Quiz />} />
                        <Route path={RoutesEnum.email} element={<Form />} />
                        <Route path={RoutesEnum.thankYou} element={<ThankYou />} />
                    </Routes>
                </QuizProvider>
            </HashRouter>
        </main>
    );
}

export default App;
