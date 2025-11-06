import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "./Button";

function Header() {
    handleCartList = () => alert("Showing cart list ...");
    handleLogin = () => alert("Loging in ...");
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px",
                backgroundColor: "grey",
            }}
        >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Digital Mall</div>

            <div style={{ display: "flex", gap: "1px" }}>
                <Button
                    icon={
                        <ShoppingCartIcon sx={{ fontSize: 16 }} onClick={handleCartList} />
                    }
                />
                <Button label="Login" onClick={handleLogin} />
            </div>
        </header>
    );
}

export default Header;
