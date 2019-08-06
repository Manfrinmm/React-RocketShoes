import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";

import api from "../../services/api";
import { formatPrice } from "../../util/formart";

import * as CartActions from "../../store/ducks/cart/actions";

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {})
  );

  const dispatch = useDispatch();

  //componentDidMount
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("products");

      const products = data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));
      setProducts(products);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdShoppingCart size={16} color="#fff" />
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
