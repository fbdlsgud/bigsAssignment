import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./layout/AppLayout";
import RoutesComponent from "./routes/RoutesComponent";

function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <RoutesComponent />
      </AppLayout>
    </AuthProvider>
  );
}

export default App;
