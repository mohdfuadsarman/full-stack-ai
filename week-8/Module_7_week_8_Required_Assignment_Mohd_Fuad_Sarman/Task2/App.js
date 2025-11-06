import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "./components/Button";
import Card from "./components/Card";
import Header from "./components/Header";
import "./styles.css";

export default function App() {
    const handleBuy = () => alert("Item bought!");
    const handleAddToCart = () => alert("Item added to cart!");

    return (
        <div style={{ padding: "30px", fontFamily: "Arial" }}>
            <Header />
            <h1>Products</h1>
            <Card title="Laptop" content="Powerful and lightweight.">
                <Button
                    icon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                    label="Add to Cart"
                    onClick={handleAddToCart}
                />
                <Button label="Buy Now" onClick={handleBuy} />
            </Card>

            <Card title="Headphones" content="High-quality sound.">
                <Button
                    icon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                    label="Add to Cart"
                    onClick={handleAddToCart}
                />
                <Button label="Buy Now" onClick={handleBuy} />
            </Card>
        </div>
    );
}
