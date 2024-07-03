import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { QuizProvider } from "./Providers/QuizProvider.tsx";
import Quiz from "./Pages/Quiz.tsx";
import Form from "./Pages/Form.tsx";
import ThankYou from "./Pages/ThankYou.tsx";
import { Routes as RoutesEnum} from "./constants/enums.ts";

function App() {
    return (
        <main>
            <BrowserRouter>
                <QuizProvider>
                    <Routes>
                        <Route path={RoutesEnum.default} element={<Navigate to={RoutesEnum.firstPage} />} />
                        <Route path={RoutesEnum.quizPage} element={<Quiz/>} />
                        <Route path={RoutesEnum.email} element={<Form />} />
                        <Route path={RoutesEnum.thankYou} element={<ThankYou />} />
                    </Routes>
                </QuizProvider>
            </BrowserRouter>
        </main>
    )
}

export default App
