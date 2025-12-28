import "./App.css";
import { Link } from "react-router";

function App() {
  const commonClasses =
    "aspect-square border-2 rounded-2xl p-4 flex justify-center items-center text-wrap";
  return (
    <>
      <div className="card flex flex-col gap-4">
        <h2>Do Experiments. Get Experience.</h2>
        <ul className="read-the-docs text-left list-disc">
          <li>Check <code>src/main.tsx</code> for Routes configuration</li>
          <li>Add the url in <code>src/App.tsx</code> to display in Home page (which is this page xD)</li>
        </ul>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <Link to="/expr-01">
          <div className={commonClasses}>Expr 01</div>
        </Link>
        <Link to="/expr-02">
          <div className={commonClasses}>Expr 02</div>
        </Link>
        <Link to="/expr-03">
          <div className={commonClasses}>Expr 03</div>
        </Link>
        <Link to="/expr-04">
          <div className={commonClasses}>
            Expr 04 <br />
            (jsPDF case)
          </div>
        </Link>
        <Link to="/expr-05">
          <div className={commonClasses}>Expr 05</div>
        </Link>
        <Link to="/expr-06">
          <div className={commonClasses}>Expr 06</div>
        </Link>
        <Link to="/rhf-with-test">
          <div className={commonClasses}>ReactHookForm with Test</div>
        </Link>
        <Link to="/color-quiz">
          <div className={commonClasses}>Color Quiz</div>
        </Link>
        <Link to="/sample-home">
          <div className={commonClasses}>Sample Home Page</div>
        </Link>
      </div>
    </>
  );
}

export default App;
