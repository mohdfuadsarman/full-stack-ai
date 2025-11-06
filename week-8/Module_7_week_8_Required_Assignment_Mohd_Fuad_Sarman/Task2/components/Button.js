
function Button({ label, icon, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                margin: "5px",
                padding: "10px 16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                cursor: "pointer",
                border: "1px solid grey",
                borderRadius: "6px",
            }}
        >
            {icon && <span>{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
}

export default Button;
