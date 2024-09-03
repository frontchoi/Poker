import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/Main';
// import ResultPage from 'pages/Result';
import GamePage from 'pages/Game';

// 공통 타입스크립트 파일 import
import './types';

const Layout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />}></Route>
                    <Route path="/game" element={<GamePage />}></Route>
                    {/* <Route path="/result" element={<ResultPage />}></Route> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
