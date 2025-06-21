// src/pages/ShopPage.jsx
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./ShopPage.scss";
import CloudNavbar from "../components/CloudNavbar";
import sampleImages from "../data/sampleImages";

export default function ShopPage() {
    const [items, setItems] = useState([]);
    const [filterSex, setFilterSex] = useState("all"); // "all", "male", "female", or "unisex"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/clothes")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                // Example: add a “discount” flag to some items for demo purposes.
                const withDiscounts = data.map((item, idx) => ({
                    ...item,
                    discount: idx < 2 ? "30% OFF" : null,
                }));
                setItems(withDiscounts);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not load items.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="shop-loading">Loading...</div>;
    if (error) return <div className="shop-error">{error}</div>;

    // Filter items based on `filterSex`
    const filteredItems = items.filter((item) => {
        if (filterSex === "all") return true;
        return item.sex?.toLowerCase() === filterSex;
    });

    return (
        <div>
            <CloudNavbar/>

            <div className="shop-container">
                <h1 className="shop-title">Our Collection</h1>

                <div className="shop-filter">
          <span
              className={filterSex === "all" ? "filter-item active" : "filter-item"}
              onClick={() => setFilterSex("all")}
          >
            View All
          </span>
                    <span
                        className={filterSex === "male" ? "filter-item active" : "filter-item"}
                        onClick={() => setFilterSex("male")}
                    >
            Boys
          </span>
                    <span
                        className={filterSex === "female" ? "filter-item active" : "filter-item"}
                        onClick={() => setFilterSex("female")}
                    >
            Girls
          </span>
                    <span
                        className={filterSex === "unisex" ? "filter-item active" : "filter-item"}
                        onClick={() => setFilterSex("unisex")}
                    >
            Unisex
          </span>
                </div>

                <div className="shop-grid">
                    {filteredItems.map((item) => {
                        const numericId = Number(item.id);
                        const fallbackIdx = (numericId - 1) % sampleImages.length;
                        //const imageSrc = item.imageUrl || sampleImages[fallbackIdx];
                        const imageSrc = item.imageUrl;
                        return (
                            <Link
                                to={`/shop/${item.id}`}
                                key={item.id}
                                className="shop-card"
                            >
                                <div className="shop-card-image-wrapper">
                                    <img
                                        src={imageSrc}
                                        alt={item.name}
                                        className="shop-card-image"
                                    />
                                    {item.discount && (
                                        <div className="shop-card-badge">{item.discount}</div>
                                    )}
                                </div>

                                <div className="shop-card-info">
                                    <h2 className="shop-card-name">{item.name}</h2>
                                    <p className="shop-card-price">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
