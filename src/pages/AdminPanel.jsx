import React, { useEffect, useState } from "react";
import CloudNavbar from "../components/CloudNavbar";
import "./AdminPanel.scss";
import sampleImages from "../data/sampleImages";

export default function AdminPanel() {
    const [tab, setTab] = useState("products"); // or "users", "stats"
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // Fetch products
    useEffect(() => {
        if (tab === "products") {
            setLoading(true);
            fetch("http://localhost:8080/api/clothes")
                .then((res) => res.json())
                .then(setProducts)
                .finally(() => setLoading(false));
        }
    }, [tab]);

    // Fetch users
    useEffect(() => {
        if (tab === "users") {
            fetch("http://localhost:8080/api/allUsers")
                .then((res) => res.json())
                .then(setUsers);
        }
    }, [tab]);

    return (
        <div>
            <div className="admin-container">
                <h1>Admin Panel</h1>
                <div className="admin-tabs">
                    <button onClick={() => setTab("products")}>Products</button>
                    <button onClick={() => setTab("users")}>Users</button>
                    <button onClick={() => setTab("stats")}>Stats</button>
                </div>
                {tab === "products" && (
                    <ProductsAdmin products={products} loading={loading} />
                )}
                {tab === "users" && (
                    <UsersAdmin users={users} />
                )}
                {tab === "stats" && (
                    <StatsAdmin />
                )}
            </div>
        </div>
    );
}

// Simple component to show products list (edit as needed)
// function ProductsAdmin({ products, loading }) {
//     return (
//         <div>
//             <h2>Products</h2>
//             {loading ? (
//                 <div>Loading…</div>
//             ) : (
//                 <ul>
//                     {products.map(prod => (
//                         <li key={prod.id}>
//                             {prod.name} - {prod.price} {prod.currency || "RON"}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }
function ProductsAdmin({ products, loading }) {
    // State for add product modal/form
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({
        name: '', price: '', imageUrl: '', stock: 0, description: '',
        size: 'NEWBORN',
        sex: 'UNISEX'
    });

    // Modify stock (example: increase by 1 for demo, you can add an input for manual amount)
    const handleModifyStock = (product) => {
        const newStock = prompt("Enter new stock value:", product.stock ?? 0);
        if (newStock === null) return;
        fetch(`http://localhost:8080/api/clothes/${product.id}/stock`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock: Number(newStock) }),
        }).then(() => window.location.reload());
    };

    // Add product
    const handleAddProduct = () => {
        fetch("http://localhost:8080/api/addclothes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addForm),
        }).then(() => {
            setShowAdd(false);
            window.location.reload();
        });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <button onClick={() => setShowAdd(true)} style={{ padding: "0.6rem 1.5rem" }}>Add Product</button>
            </div>
            {showAdd && (
                <div className="modal-bg">
                    <div className="modal">
                        <h3>Add Product</h3>
                        <input
                            placeholder="Name"
                            value={addForm.name}
                            onChange={e => setAddForm(f => ({...f, name: e.target.value}))}
                        /><br/>
                        <input
                            placeholder="Price"
                            type="number"
                            value={addForm.price}
                            onChange={e => setAddForm(f => ({...f, price: e.target.value}))}
                        /><br/>
                        <input
                            placeholder="Image URL"
                            value={addForm.imageUrl}
                            onChange={e => setAddForm(f => ({...f, imageUrl: e.target.value}))}
                        /><br/>
                        <input
                            placeholder="Stock"
                            type="number"
                            value={addForm.stock}
                            onChange={e => setAddForm(f => ({...f, stock: e.target.value}))}
                        /><br/>
                        <textarea
                            placeholder="Description"
                            value={addForm.description}
                            onChange={e => setAddForm(f => ({...f, description: e.target.value}))}
                            rows={3}
                            style={{width: "90%", resize: "vertical"}}
                        /><br/>
                        <select
                            value={addForm.size}
                            onChange={e => setAddForm(f => ({ ...f, size: e.target.value }))}
                            style={{ width: "90%", marginBottom: "0.5rem" }}
                        >
                            <option value="NEWBORN">NEWBORN (0–3 months)</option>
                            <option value="_3_TO_6_M">3 TO 6 MONTHS</option>
                            <option value="_6_TO_12_M">6 TO 12 MONTHS</option>
                            <option value="_12_TO_18_M">12 TO 18 MONTHS</option>
                            <option value="_2T">2T (Toddler 2T)</option>
                            <option value="_3T">3T (Toddler 3T)</option>
                            <option value="_4T">4T (Toddler 4T)</option>
                            <option value="_5">5 (Size 5)</option>
                            <option value="_6">6 (Size 6)</option>
                            <option value="_7">7 (Size 7)</option>
                            <option value="_8">8 (Size 8)</option>
                        </select>
                        <br/>
                        {/* Sex dropdown */}
                        <select
                            value={addForm.sex}
                            onChange={e => setAddForm(f => ({ ...f, sex: e.target.value }))}
                            style={{ width: "90%", marginBottom: "0.5rem" }}
                        >
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="UNISEX">UNISEX</option>
                        </select>
                        <br/>
                        <button onClick={handleAddProduct}>Save</button>
                        <button onClick={() => setShowAdd(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {loading ? (
                <div>Loading…</div>
            ) : (
                <div className="product-grid">
                    {products.map(prod => (
                        <div key={prod.id} className="product-tile">
                            <img src={prod.imageUrl} alt={prod.name} className="tile-image"/>
                            <div className="tile-name">{prod.name}</div>
                            <div className="tile-price">{prod.price} {prod.currency || "RON"}</div>
                            <div className="tile-stock">Stock: {prod.stock ?? 0}</div>
                            <button onClick={() => handleModifyStock(prod)}>Modify Stock</button>
                            <button
                                style={{
                                    marginLeft: "0.5rem",
                                    color: "white",
                                    background: "red",
                                    border: "none",
                                    padding: "0.3rem 0.8rem",
                                    borderRadius: 3
                                }}
                                onClick={() => handleDeleteProduct(prod.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    fetch(`http://localhost:8080/api/clothes/${id}`, {
        method: "DELETE",
    })
        .then(() => window.location.reload());
};

// Users table as discussed above
function UsersAdmin({users}) {
    return (
        <div className="user-list">
            <h2>Users</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    {/* Add more columns if needed */}
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// Placeholder for stats
function StatsAdmin() {
    return (
        <div>
            <h2>Stats</h2>
            <p>Coming soon…</p>
        </div>
    );
}