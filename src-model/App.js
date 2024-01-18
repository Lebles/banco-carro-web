import { useState, useEffect } from "react";
import styles from "./Link.module.css";
import { HomePage } from "./components/HomePage";
import { Registro } from "./components/Registro";
import { Form } from "./components/Form";

const defaultPage = HomePage;
const router = [
  { url: "/registros" , component: Registro, button: "Registros" },
  { url: "/singin" , component: Form, button: "Sing In" },
];

function App() {
  //#region Routering
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  let Page = defaultPage;
  for (let e of router) {
    if (currentRoute.startsWith(e.url)) {
      Page = e.component;
      break;
    }
  }
  //#endregion Routering
  
  return (
    <div>
      <nav style={{textAlign: "right"}}>
        <a className={styles.link} href="/home">Home</a>
        {router.map((each, id) => <a className={styles.link} key={id} href={each.url}>{each.button}</a>)}
      </nav>
      <Page/>
    </div>
  );
}

export default App;
