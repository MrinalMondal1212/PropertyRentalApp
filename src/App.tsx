import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import Routing from "./routes/Routing";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={Routing} />
      </Provider>
    </>
  );
}

export default App;
