import { useEffect, useState } from 'react';
import React from 'react';
import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import ProductFilters from './components/ProductsFilters/ProductsFilters';
import AddProduct from './components/AddProduct/AddProduct';
import { products } from './common/consts/produkty';
import styles from './App.module.scss';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [productsList, setProductsList] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  useEffect(() => {
    setFilteredProducts(productsList);
  }, [productsList]);

  const addToShoppingList = (productName) => {
    const id = Math.random();
    const addedProduct = { id, name: productName, isBought: false };
    setShoppingList((prevState) => [...prevState, addedProduct]);
  };

  const removeFromShoppingList = (product) => {
    const filteredList = shoppingList.filter((p) => p.id !== product.id);
    setShoppingList(filteredList);
  };

  const filterProducts = (searchValue, searchCategory, isFoodCategory) => {
    let filteredProducts = productsList;

    if (searchValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.nazwa.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (searchCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.kategoria === searchCategory
      );
    }
    if (isFoodCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.produktSpozywczy === isFoodCategory
      );
    }

    setFilteredProducts(filteredProducts);
  };

  const addProduct = (name, category, isFood) => {
    const newProduct = {
      nazwa: name,
      kategoria: category,
      produktSpozywczy: isFood,
    };
    setProductsList([...productsList, newProduct]);
  };

  const onToggleBought = (id) => {
    // const list = JSON.parse(JSON.stringify(shoppingList));
    // const product = list.find((product) => product.id === id);
    // product.isBought = !product.isBought;
    const arrow = shoppingList.map((product) =>
      product.id === id ? { ...product, isBought: !product.isBought } : product
    );
    setShoppingList(arrow);
  };

  return (
    <div className={styles.appWrapper}>
      <br />
      <div align="center">
        <h1 className={styles.title}>Buyer app</h1>
      </div>
      <p className={styles.description}>
        The buyer application allows you to create a shopping list from products
        from menu. Products to the menu, in turn, can be added through the panel
        in the top parts filling in the fields: name, category, product type
        (product food / non-food). Filter field allows you to filter products
        from the menu also after the listed fields.
      </p>
      <p className={styles.description}>
        From the menu on the left, we add products to "your shopping list". In
        the shopping list, right-click to remove the added product, or left
        cross it out. Clicking the left button again eliminates the
        strikethrough.
      </p>
      <AddProduct addProduct={addProduct} />
      <ProductFilters
        productsList={productsList}
        filterProducts={filterProducts}
      />

      <div className={styles.columnsWrapper}>
        <ProductsList
          filteredProducts={filteredProducts}
          addToShoppingList={addToShoppingList}
        />
        <ShopingList
          shoppingList={shoppingList}
          removeFromShoppingList={removeFromShoppingList}
          onToggleBought={onToggleBought}
        />
      </div>
    </div>
  );
}

export default App;
