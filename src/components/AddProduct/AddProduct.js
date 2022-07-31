import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import { useState } from 'react';

function AddProduct({ addProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isFood, setIsFood] = useState(false);
  const btnDisabled = !name || !category;

  const onAddProduct = () => {
    addProduct(name, category, isFood);
    setName('');
    setCategory('');
    setIsFood(false);
  };

  return (
    <div align="center">
      <div className={styles.AddProducts}>
        <label>
          {'Name: '}
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          {'Category: '}
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          {'Food product: '}
          <input
            type="checkbox"
            checked={isFood}
            onChange={() => setIsFood(!isFood)}
          />
        </label>

        <button
          className={styles.inputs}
          disabled={btnDisabled}
          onClick={onAddProduct}
        >
          Add product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
