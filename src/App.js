import './index.css';
import {
  BrowserRouter,
  Routes, Route, Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Books from './components/Books';
import Categories from './components/Categories';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header className="head">
          <nav>
            <h1>Book Store CMS</h1>
            <Link to="/">Books</Link>
            <Link to="/components/Categories">categories</Link>
          </nav>
          <div>
            <h2>icon</h2>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/components/Categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
