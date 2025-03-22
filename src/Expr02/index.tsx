import { useEffect } from "react";
import "./index.css";

export function Expr02() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);
  return (
    <div className="text-white">
      <h1
        className="gradient-text"
        // style={{ "--x": "50%", "--y": "50%" }}
        onMouseMove={(e) => {
          console.log(e.clientX, e.clientY);
          e.currentTarget.style.setProperty(
            "--x",
            `${e.nativeEvent.offsetX}px`
          );
          e.currentTarget.style.setProperty(
            "--y",
            `${e.nativeEvent.offsetY}px`
          );
        }}
        onMouseOut={(e) => {
          // e.currentTarget.style.setProperty("--x", "50%");
          // e.currentTarget.style.setProperty("--y", "50%");

          const target = e.currentTarget;

          /** startX, startY, endX, endY are in percentage value(%) */
          const startX =
            (parseInt(target.style.getPropertyValue("--x")) /
              target.clientWidth) *
            100;
          const startY =
            (parseInt(target.style.getPropertyValue("--y")) /
              target.clientHeight) *
            100;
          const endX = 50;
          const endY = 50;
          const duration = 500; // in millisecond

          console.log("When mouse out", startX, startY);

          const startTime = performance.now();
          function animate() {
            const elapsed = performance.now() - startTime;
            const progress = elapsed / duration;
            if (progress > 1) {
              target.style.setProperty("--x", endX + "%");
              target.style.setProperty("--y", endY + "%");
            } else {
              const newX = startX + (+endX - startX) * progress;
              const newY = startY + (+endY - startY) * progress;
              target.style.setProperty("--x", newX + "%");
              target.style.setProperty("--y", newY + "%");
              requestAnimationFrame(animate);
            }
          }
          animate();
        }}
      >
        Expr02
      </h1>
    </div>
  );
}
