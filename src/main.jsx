
import ReactDOM from "react-dom/client";
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import "./index.css";
import '../aws-config-auth.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
