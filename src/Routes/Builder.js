import { Map } from "immutable";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MyCatalog from "../Assets/catalog/mycatalog";

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from "prv-react-planner";
import { useLayoutEffect, useState } from "react";

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", (plannerState) =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let store = createStore(
  reducer,
  null,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

function Builder() {
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        const headerHeight =
          document.getElementsByTagName("nav")[0]?.offsetHeight || 0;
        setSize([window.innerWidth, window.innerHeight - headerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };

  // get screen size
  const [width, height] = useWindowSize();

  return (
    <Provider store={store}>
      <ReactPlanner
        catalog={MyCatalog}
        width={width}
        height={height}
        plugins={plugins}
        stateExtractor={(state) => state.get("react-planner")}
      />
    </Provider>
  );
}

export default Builder;
