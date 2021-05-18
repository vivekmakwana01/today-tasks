import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Create from "./components/Create";
import Layout from "./components/Layout";
import Notes from "./components/Notes";
import PrivateRoute from "./components/PrivateRoute";

export default function MaterialApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <PrivateRoute exact path="/create" component={Create} />
            {/* <Route exact path="/create" component={Create} /> */}
            <PrivateRoute path="/" component={Notes} />
            {/* <Route path="/" component={Notes} /> */}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
