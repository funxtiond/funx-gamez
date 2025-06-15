import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Link to="/expr-01">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Expr 01
          </div>
        </Link>
        <Link to="/expr-02">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Expr 02
          </div>
        </Link>
        <Link to="/expr-03">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Expr 03
          </div>
        </Link>
        <Link to="/expr-04">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Expr 04 <br />
            (jsPDF case)
          </div>
        </Link>
        <Link to="/expr-05">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Expr 05
          </div>
        </Link>
        <Link to="/color-quiz">
          <div className="aspect-square border-2 rounded-2xl flex justify-center items-center">
            Color Quiz
          </div>
        </Link>
      </div>

      <div className="card">
        <h2>Do Experiments. Get Experience.</h2>
      </div>
      <p className="read-the-docs">
        Check <code>src/main.tsx</code> for Routes configuration
      </p>
    </>
  );
}

export default App;
