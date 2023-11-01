import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./contexts";
import { router } from "./routes";
import store from "./store/store";

function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppProvider>
  );
}

export default App;
