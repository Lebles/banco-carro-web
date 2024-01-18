import { useState, useEffect } from 'react';

import Main from './components/Main';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';
import ListPage from './components/ListPage';

const defaultPage = LoginPage;
const router = [
  { url: "/main" , component: Main },
  { url: "/home" , component: HomePage },
  { url: "/list" , component: ListPage },
  { url: "/login" , component: LoginPage },
];

function App() {
  //#region routering
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
  //#endregion routering

  return (<html>
    <Page/>
  </html>);
}

export default App;
