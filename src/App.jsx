import './App.css';
import EditorComponent from './Editor';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <>
      <div>
       <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home/>} />
           <Route path="/:roomId" element={<EditorComponent />} />
         </Routes>
       </BrowserRouter>
      </div>
    </>
  )
}

export default App
