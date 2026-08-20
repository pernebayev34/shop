import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const fetchProducts = useCallback(() => {
    setLoading(true);
    fetch("https://backend.magnateshop.uz/api/products?page=1&limit=100", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data.items || []);
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <ProductsTable data={data} setData={setData} loading={loading} onRefresh={fetchProducts} />
    </div>
  );
};

export default Products;
