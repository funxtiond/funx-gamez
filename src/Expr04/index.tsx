import { useRef } from "react";
import jsPDF from "jspdf";

export default function Expr04() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    console.log("aa");
    if (!contentRef.current) return;
    // Get the original element
    const element = contentRef.current;

    // Create a cloned div that preserves styles
    const cloneContainer = document.createElement("div");
    // cloneContainer.style.position = 'fixed'
    // cloneContainer.style.top = '0'
    // cloneContainer.style.left = '0'
    cloneContainer.style.width = `${element.offsetWidth}px`;
    cloneContainer.style.height = "auto";
    cloneContainer.style.background = "white";
    cloneContainer.style.zIndex = "-1000";
    // cloneContainer.style.padding = '16px'
    cloneContainer.style.margin = "0";
    cloneContainer.style.fontFamily = "Montserrat, sans-serif";

    // Add header with title and timestamp
    const header = document.createElement("div");
    header.innerHTML = `
  <h1 style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; color: black;">DNA Profile AI Analysis</h1>
  <p style="text-align: center; font-size: 10px; margin-bottom: 20px; color: #666;">
    Generated at: ${new Date("DD/MM/yyyy, HH:mm:ss")} SGT
  </p>
`;

    // Clone the content element without height restrictions
    const contentClone = element.cloneNode(true) as HTMLElement;
    contentClone.style.height = "auto";
    contentClone.style.maxHeight = "none";
    contentClone.style.overflow = "visible";
    contentClone.querySelectorAll("strong").forEach((span) => {
      span.style.lineHeight = "initial !important";
      span.style.position = "relative";
      // span.style.top = '-9px'
    });

    // Add everything to the container and append to document
    cloneContainer.appendChild(header);
    cloneContainer.appendChild(contentClone);
    document.body.appendChild(cloneContainer);
    console.log(cloneContainer);
    // Wait a moment for styles to be applied and content to be rendered
    setTimeout(async () => {
      try {
        // Create PDF (A4 size)
        const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

        // pdf.addFileToVFS('Montserrat-Regular.ttf', 'Montserrat')
        // pdf.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal')
        // pdf.setFont('Montserrat', 'normal')

        // // Generate PNG with high quality
        // const dataUrl = await toPng(cloneContainer, {
        //   quality: 1,
        //   pixelRatio: 2,
        //   skipAutoScale: false,
        //   cacheBust: true,
        //   includeQueryParams: true,
        //   backgroundColor: '#ffffff'
        // })

        // // Get A4 page dimensions
        // const pageWidth = pdf.internal.pageSize.getWidth()
        // const pageHeight = pdf.internal.pageSize.getHeight()

        // // Calculate image properties
        // const imgProps = pdf.getImageProperties(dataUrl)
        // const scale = pageWidth / imgProps.width
        // const scaledImgHeight = imgProps.height * scale

        // // Calculate total pages needed
        // const pagesNeeded = Math.ceil(scaledImgHeight / pageHeight)

        // // Add content across multiple pages
        // for (let i = 0; i < pagesNeeded; i++) {
        //   if (i > 0) {
        //     pdf.addPage()
        //   }

        //   pdf.addImage(
        //     dataUrl,
        //     'PNG',
        //     0, // x position on page
        //     -i * pageHeight, // y position on page (negative to show correct portion)
        //     pageWidth, // width on page
        //     scaledImgHeight, // height on page
        //     undefined, // alias
        //     'FAST' // compression
        //   )
        // }

        // // Preview rendering
        // html2canvas(cloneContainer, {
        //   scale: 1.2,
        //   scrollY: -window.scrollY,
        //   scrollX: -window.scrollX,
        //   useCORS: true
        // }).then((canvas) => {
        //   // Show as image
        //   const imgDataUrl = canvas.toDataURL('image/png')

        //   const previewImg = document.createElement('img')
        //   previewImg.src = imgDataUrl
        //   previewImg.style.maxWidth = '100%'
        //   previewImg.style.border = '1px solid #ccc'
        //   previewImg.style.marginTop = '20px'
        //   previewImg.style.marginLeft = '120px'

        //   document.body.appendChild(previewImg)

        //   // Optional: clean up the hidden cloneContainer
        //   document.body.removeChild(cloneContainer)

        //   setLoading(false)
        // })

        await pdf.html(cloneContainer, {
          autoPaging: "text",
          html2canvas: { scale: 0.4, useCORS: true },
          margin: [10, 10, 10, 10],
          callback: (doc) => {
            // Save PDF
            console.log("after .html", doc);
            doc.save(`DNA_Analysis_${new Date()}.pdf`);

            // Preview PDF
            doc.output("blob");
            const blob = doc.output("blob");
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl);

            document.body.removeChild(cloneContainer);
          },
        });
      } catch (err) {
        console.error("Error during PNG generation:", err);
        document.body.removeChild(cloneContainer);
      }
    }, 500); // Give browser 500ms to render the clone
  };

  return (
    <div className="">
      <button className="btn-primary" onClick={handleDownloadPdf}>
        Download
      </button>

      {/* Content Area for PDF */}
      <div ref={contentRef} className="text-left">
        <h2 style={{ textAlign: "left" }}>Hello CodeSandbox</h2>
        <p>Start editing to see some magic happen!</p>
        <div className="font-bold text-500 text-[16px] leading-[22px] my-2">
          <span>Dear</span>
          &nbsp;
          <span className="text-primary">{"abc"},</span>
        </div>
        <div className="text-[14px] leading-[22px]">
          <span>
            From your available genetic traits analysed, this is the summary
            report of a possible life you may have based on your{" "}
            <span className="font-bold">{"bdef"} potential.</span>
          </span>
        </div>
        <ul>
          <li>
            <strong>Point 1: </strong>
            This is Testing for point 1.
          </li>
        </ul>
      </div>
    </div>
  );
}
