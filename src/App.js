import "./App.css";
import PageProvider from "./context/PageContext";
import Pages from "./pages/Pages";

function App() {
  return (
    <>
      <PageProvider>
        <Pages />
      </PageProvider>
    </>
  );
}

export default App;
