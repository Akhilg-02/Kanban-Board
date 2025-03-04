import { ApiProvider } from "./Context/ApiContext";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div>
      <ApiProvider>
          <AppRoutes />
      </ApiProvider>
    </div>
  );
}

export default App;
