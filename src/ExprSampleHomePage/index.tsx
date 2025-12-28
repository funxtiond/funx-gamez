import { MouseEvent, MouseEventHandler } from "react";

const Header = () => {
  
  /** Currying technique */ 
  const handleOnClick = (alertText: string) => (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    alert(alertText + ' ' + e.currentTarget.value);
  };
  return (
    <header>
      <img src="/expr-logo.svg" alt="Expr Logo" />
      <button onClick={handleOnClick("You clicked")} value="Me!">Click me</button>
    </header>
  );
};

export default function ExprSampleHomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}
