import './index.css';
import {
  BrowserRouter,
  Routes,Route,Link
} from "react-router-dom";
import Bookstate from "./components/book-state"
import Form from "./components/Form"
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to= "/components/Form">Catogerys</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Bookstate />} />
        <Route path='/components/Form' element={<Form />} />
    </Routes>
      </BrowserRouter>
  );
}

export default App;
