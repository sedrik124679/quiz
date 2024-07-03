import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { QuizProvider } from "./Providers/QuizProvider.tsx";
import Quiz from "./components/Quiz.tsx";
import Form from "./components/Form.tsx";
import ThankYou from "./components/ThankYou.tsx";

function App() {
    return (
        <main>
            <BrowserRouter>
                <QuizProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/quiz/1" />} />
                        <Route path="/quiz/:id" element={<Quiz/>} />
                        <Route path="/email" element={<Form />} />
                        <Route path="/thankyou" element={<ThankYou />} />
                    </Routes>
                </QuizProvider>
            </BrowserRouter>
        </main>
    )
}

export default App
