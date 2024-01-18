export function HomePage() {
    return(
        <div style={{ textAlign: "justify", marginInline: "10%"}}>
            <h1 style={{textAlign: "center"}}>Bienbenido a Home!</h1>
            {new Array(20).fill(<p>{"Filling Text ".repeat(100)}</p>)}
        </div>
    );
}