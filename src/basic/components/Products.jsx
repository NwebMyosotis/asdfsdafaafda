import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const handleChange = () => setChecked((prev) => !prev);

  const productLoad = async () => {
    try {
      setLoading(true);
      await fetch(`data/${checked ? "sale_" : ""}products.json`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🔥뜨끈한 데이터를 네트워크에서 받아옴");
          setProducts(data);
        });
      setLoading(false);
      return () => {
        console.log("🧹 깨끗하게 청소하는 일들을 합니다.");
      };
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    productLoad();
  }, [checked]);

  return error !== undefined ? (
    <div>에러발생: {error}</div>
  ) : loading ? (
    <div style={{ margin: "15px 0" }}>Loading...</div>
  ) : (
    <>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Show Only 🔥 Sale</label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
