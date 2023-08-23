import { useSelector, useDispatch } from 'react-redux';
import { addCategories } from '../redux/Categories/category';

function Categories() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  if (categories.length === 0) {
    dispatch(addCategories('under construction'));
  }

  return (
    <div>
      <h1>Categories:</h1>
      <ul>
        {categories.map((category) => (
          <li key={1}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
