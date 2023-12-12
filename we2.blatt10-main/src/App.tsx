import React from "react";
import { Route, Routes } from "react-router-dom";
import PageShopper from "./components/PageShopper";
import PageShopList from "./components/PageShopList";
import PageShopItem from "./components/PageShopItem";
import PageAdmin from "./components/PageAdmin";
import PagePrefs from "./components/PagePrefs";
import Header from "./components/Menu";
import { Container } from "react-bootstrap";
import Shopper from "./components/Shopper";
import ErrorFallback from "./components/ErrorFallback";
import { getLoginInfoFromJWT, retrieveJWT } from "./JWTManager";
import { LoginContext } from "./LoginContext";
import { ErrorBoundary } from 'react-error-boundary';


function App() {
  const [loginInfo, setLoginInfo] = React.useState(getLoginInfoFromJWT(retrieveJWT()));
  return (
    <Container className="mt-2">
      <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Routes>
            <Route path="/" element={<Shopper />} />
            <Route path="/shopper" element={<PageShopper />} />
            <Route path="/shoplist/:shoplistID" element={<PageShopList />} />
            <Route path="/shopitem/:shopitemID" element={<PageShopItem />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/prefs" element={<PagePrefs />} />
            <Route path="/*" element={<ErrorFallback error={new Error("Error")} />} />
          </Routes>
        </ErrorBoundary>
      </LoginContext.Provider>
    </Container>
  );
}

export default App;
