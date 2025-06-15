import { useEffect, useRef, useState } from "react";

type Item = {
  id: string;
  name: string;
  href: string;
};

const Component = ({ items }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // set the initial value to -1, to indicate that we haven't run the calculations yet
  const [lastVisibleMenuItem, setLastVisibleMenuItem] = useState(-1);

  useEffect(() => {
    const div = ref.current;

    if (div) {
      const { width } = div.getBoundingClientRect();

      // Convert div's children into array
      const children = [...div.childNodes] as HTMLDivElement[];

      // All children widths
      const childrenWidths = children.map(
        (child) => child.getBoundingClientRect().width
      );

      // const itemIndex = getLastVisibleItem(ref.current);

      // Set the state with the actual number
      setLastVisibleMenuItem(itemIndex);
    }
  }, [ref]);

  return (
    <div className="navigation" ref={ref}>
      {items.map((item: any) => {
        return <a href={item.href}>{item.name}</a>;
      })}

      <button id="more">...</button>
    </div>
  );
};

export default function Expr05() {
  return (
    <>
      <Component />
    </>
  );
}
