import React from "react";
import { Switch, Route } from "react-router";
import routes from "./index";

export default function RenderRoutes() {
  return (
    <Switch>
      {routes.map((route, i) => {
        const { key = i, render, component: Cmp, ...routeProps } = route;
        return (
          <Route
            key={key}
            render={(props) =>
              render ? (
                render({
                  ...props,
                  route,
                })
              ) : (
                <Cmp {...props} route={route} />
              )
            }
            {...routeProps}
          />
        );
      })}
    </Switch>
  );
}
