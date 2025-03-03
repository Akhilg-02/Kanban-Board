import { ApiProvider } from "./Context/ApiContext";
import { DragDropProvider } from "./Context/DndContext";
import AppRoutes from "./Routes/AppRoutes";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div>
      <DragDropProvider backend={HTML5Backend}>
        <ApiProvider>
          <AppRoutes />
        </ApiProvider>
      </DragDropProvider>
    </div>
  );
}

export default App;
