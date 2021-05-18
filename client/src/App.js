import "./App.css";
import MaterialApp from "./MaterialTut/MaterialApp";
import { AuthProvider } from "./MaterialTut/hooks/useAuth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MaterialApp />
      </AuthProvider>
    </div>
  );
}

export default App;
