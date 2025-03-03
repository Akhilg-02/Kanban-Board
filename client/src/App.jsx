import { ApiProvider } from "./Context/ApiContext";
import { DragDropProvider } from "./Context/DndContext";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div>
      <ApiProvider>
        <DragDropProvider>
          <AppRoutes />
        </DragDropProvider>
      </ApiProvider>
    </div>
  );
}

export default App;
