import React, { useState, useEffect } from "react";
import "./App.scss";

import { HomePage } from "./page-component/Home-page/home-page.component";
import { SellPage } from "./page-component/sell-page/sell-page.component";
import ShoePage from "./page-component/shoe-page/shoe-page.component";
import { HeaderCentered } from "./components/header-centered/header-centered.component";
import { LoginSignupPage } from "./page-component/login-signup-page/login-signup-page.component";
import { AccountPage } from "./page-component/account-page/account-page.component";
import { TwoFactorPage } from "./page-component/two-factor-page/two-factor.component";
import Browse from "./page-component/browse-page/browse";
import { BillingSettingPage } from "./page-component/billing-setting-page/billing-setting-page.component";
import Product from "./page-component/product-page/Product";
import { HelpPage } from "./page-component/help-page/help-page";
import { EditProfilePage } from "./page-component/edit-profile-page/edit-profile-page.component";
import { ShippingInfoPage } from "./page-component/shipping-info-page/shipping-info-page.component";
import { SellerInfoPage } from "./page-component/seller-info-page/seller-info-page.component";
import BuyPage from "./page-component/buy-page/buy-page";
import { FAQPage } from "./page-component/faq-page/faq-page.component";
import { TermsPage } from "./page-component/terms-page/terms-page.component";
import { PrivacyPage } from "./page-component/privacyPage/PrivacyPage";
import { SecurityPage } from "./page-component/security-page/security-page.component";
import { SettingsPage } from "./page-component/settings-page/settings-page.component";
import { BuyingPage } from "./page-component/buying-page/buying-page.component";
import { SellingPage } from "./page-component/sellling-page/sellling-page.component";
import { FavouritePage } from "./page-component/favourite-page/favourite-page.component";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Footer from "./components/footer/Footer.js";
import Sidebar from "./components/sidebar/Sidebar";
import Searchbar from "./components/searchbar/Searchbar";
import Header from "./components/header/Header.js";
import FaqSeller from "./page-component/faq-page/faq-seller.component";
import CategoryBar from "./components/cat-sidebar/CategoryBar";
import ProductReview from "./page-component/product-review-page/product-review";
import ResetEmail from "./page-component/reset-email/Reset-email";
import ContactUs from "./page-component/contact-us/ContactUs";
import StylePage from "./page-component/style-page/style-page";
import Altogether from "./page-component/altogether/Altogether";
import { Reset } from "./page-component/reset-password/reset";
import axios from "axios";
import ReactGA from "react-ga";
import AboutPage from "./page-component/AboutPage/AboutPage";
import {BASE_URL} from './Constants/Global';

const TRACKING_ID = "UA-198989119-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const App = ({ location }) => {
  const [sidebar, setSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [catbar, setCatbar] = useState(false);
  const [signedIn, setSignIn] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL+`shoes`)
      .then((res) => {
        console.log("after api hit");
        setallProducts(res.data);
      })
      .catch((e) => console.log(e));
    var url = BASE_URL+`collections`;
    axios
      .get(url)
      .then((resb) => {
        setAllBrands(resb.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="app">
      {location.pathname === "/login" ||
      location.pathname === "/twoFactorAuth" ||
      location.pathname === "/logins/1" ? (
        <HeaderCentered />
      ) : location.pathname === "/account" ? (
        <Header
          brands={allBrands}
          products={allProducts}
          setSidebar={setSidebar}
          sidebar={sidebar}
          setSearchbar={setSearchbar}
          searchbar={searchbar}
          signedIn={true}
          dropShadow={true}
        />
      ) : (
        <Header
          brands={allBrands}
          products={allProducts}
          setSidebar={setSidebar}
          sidebar={sidebar}
          setSearchbar={setSearchbar}
          searchbar={searchbar}
          setCatbar={setCatbar}
          catbar={catbar}
          signedIn={true}
          dropShadow={true}
        />
      )}
      <div className="sbar">
        <Sidebar
          allBrands={allBrands}
          sidebar={sidebar}
          setSidebar={setSidebar}
          catbar={catbar}
          setCatbar={setCatbar}
          signedIn={signedIn}
        />
      </div>
      <div className="sbar">
        <Searchbar
          searchbar={searchbar}
          setSearchbar={setSearchbar}
          allProducts={allProducts}
          allBrands={allBrands}
        />
      </div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <HomePage allBrands={allBrands} allProducts={allProducts} />;
          }}
        />
        <Route
          exact
          path="/sell"
          render={() => {
            return <SellPage allProducts={allProducts} />;
          }}
        />
        <Route exact path="/shoe" component={ShoePage} />
        {/* <Route exact path="/login" component={LoginSignupPage} /> */}
        <Route
          exact
          path="/login"
          render={(props) => {
            return (
              <LoginSignupPage
                {...props}
                signedIn={signedIn}
                setSignIn={setSignIn}
              />
            );
          }}
        />

        <Route
          exact
          path="/login/:shoeID/:size/:offer"
          render={(props) => (
            <LoginSignupPage
              {...props}
              signedIn={signedIn}
              setSignIn={setSignIn}
            />
          )}
        />

        <Route
          exact
          path="/login/:id"
          render={(props) => (
            <LoginSignupPage
              {...props}
              signedIn={signedIn}
              setSignIn={setSignIn}
            />
          )}
        />

        <Route
          exact
          path="/logins/:sell"
          render={(props) => (
            <LoginSignupPage
              {...props}
              signedIn={signedIn}
              setSignIn={setSignIn}
            />
          )}
        />

        {/* <Route exact path="/account" component={AccountPage} /> */}

        <Route exact path="/account" component={SecurityPage} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/altogether" component={Altogether} />
        <Route exact path="/styles" component={StylePage} />

        <Route exact path="/settings-section" component={SettingsPage} />
        <Route exact path="/buying-section" component={BuyingPage} />
        <Route exact path="/selling-section" component={SellingPage} />
        <Route
          exact
          path="/product-review/:id/:selectedButton"
          component={ProductReview}
        />
        <Route exact path="/favourites-section" component={FavouritePage} />

        <Route exact path="/browse/:id/" component={Browse} />
        <Route exact path="/browse/0/:keyword" component={Browse} />
        <Route exact path="/browse/:id/size/:sizee" component={Browse} />
        {/* <Route exact path="/browse" component={Browse} /> */}

        <Route exact path="/twoFactorAuth" component={TwoFactorPage} />
        <Route
          exact
          path="/twoFactorAuth/:userType"
          component={TwoFactorPage}
        />
        <Route exact path="/buyingInfo">
          <SellerInfoPage title="Buying Info" />
        </Route>
        <Route exact path="/profileEdit" component={EditProfilePage} />
        <Route exact path="/shippingInfo/:id" component={ShippingInfoPage} />
        <Route
          exact
          path="/shippingInfo/:id/:uType"
          component={ShippingInfoPage}
        />
        <Route exact path="/sellerInfo">
          <SellerInfoPage title="Billing" />
        </Route>
        <Route exact path="/payoutInfo" component={BillingSettingPage} />

        <Route exact path="/help" component={HelpPage} />
        <Route exact path="/buy/:id" component={BuyPage} />
        <Route exact path="/buy/:id/:size/:lowestAsk" component={BuyPage} />
        <Route exact path="/bid/:id/:size/:lowestAsk/:isBid" component={BuyPage} />
        <Route exact path="/faq" component={FAQPage} />
        <Route exact path="/faqSeller" component={FaqSeller} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/terms" component={TermsPage} />
        <Route exact path="/reset" component={ResetEmail} />
        <Route exact path="/resett" component={Reset} />
        <Route exact path="/privacy" component={PrivacyPage} />
        <Route
          exact
          path="/:id"
          render={() => {
            return <Product allProducts={allProducts} />;
          }}
        />
        {/* <Route exact path="/forgot" component={Forgot} /> */}
      </Switch>

      {location.pathname === "/" ||
      location.pathname === "/faq" ||
      location.pathname === "/FaqSeller" ||
      location.pathname === "/terms" ? (
        <Footer />
      ) : null}
    </div>
  );
};

export default withRouter(App);
