import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../common/styles/Headers.module.scss';

function ProductsFilters({ productsList, filterProducts }) {
  const [searchValue, setSearchValue] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFoodCategory, setIsFoodCategory] = useState(false);

  useEffect(() => {
    filterUniqueCategory();
  }, [productsList]);

  const filterUniqueCategory = () => {
    const categoryList = productsList.map((product) => product.kategoria);
    setUniqueCategories([...new Set(categoryList)]);
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    filterProducts(event.target.value, selectedCategory, isFoodCategory); // do auto filtrów
  };

  const onSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(searchValue, event.target.value, isFoodCategory); // do auto filtrów
  };

  const onChangeIsFoodCategory = () => {
    setIsFoodCategory(!isFoodCategory);
    filterProducts(searchValue, selectedCategory, !isFoodCategory); // do auto filtrów
  };

  return (
    <div align="center">
      <div className={styles.FilterProducts}>
        <label>
          {'Enter a name or part of a name to search for products: '}
          <input value={searchValue} onChange={onChangeSearchValue} />
        </label>
        <label className={styles.inputs}>
          {'Select the category you want to see: '}
          <select onChange={onSelectCategory}>
            <option key={'default'} value={''}></option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.inputs}>
          {'Food product: '}
          <input
            type="checkbox"
            value={isFoodCategory}
            onChange={onChangeIsFoodCategory}
          />
        </label>
        {/* <button onClick={() => filterProducts(searchValue, selectedCategory, isFoodCategory)}>Wyszukaj</button> */}
      </div>
    </div>
  );
}

export default ProductsFilters;
