
function Card({ title, content, children }) {
    return (
        <div
            style={{
                border: "1px solid grey",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "10px",
                maxWidth: "300px",
            }}
        >
            <h3>{title}</h3>
            <p>{content}</p>

            <div style={{ marginTop: "10px", display: "flex" }}>{children}</div>
        </div>
    );
}

export default Card;
