import Product from "structure/Product/Domain";
import PDFDocument from "pdfkit";
import SendEmailClient from "config/awsConfig";
import fs from "fs";
import { PDF_PROPS, EMAIL_VERIFIED, ACCESS_DENIED } from "utils/constants";

//PDF props
const {
  fontFamily,
  colWidths,
  rowHeight,
  cellPadding,
  tableTop,
  tableLeft,
  headerTextColor,
  evenRowBackgroundColor,
  oddRowBackgroundColor,
} = PDF_PROPS;

module.exports = async ({ body: { email } , user: { role }}, res) => {

  
    //Roles permission
    if (role !== "admin") return res.status(401).send(ACCESS_DENIED);
  //Find all products
  const products = await Product.find({});
  if (products) {
    try {
      // Create PDFDocument Object
      const pdfPath = "archivo.pdf";
      const doc = new PDFDocument();

      // Set page width and margin
      doc.pipe(fs.createWriteStream("archivo.pdf"));
      doc.fontSize(12);
      doc.page.width = 612;
      doc.page.margins = { top: 50, bottom: 50, left: 100, right: 30 };

      // Configuring table styles
      doc.text("Lista de Productos", { align: "center", fontSize: 18 });
      doc.moveDown();

      // Configurar estilos de tabla
      doc.font(fontFamily);

      // Add table header
      doc.fillColor(headerTextColor);
      doc.strokeColor("white");
      // Encabezado de la tabla

      doc.text("Name", tableLeft + cellPadding, tableTop + cellPadding);
      doc.text(
        "Description",
        tableLeft + colWidths[0] + cellPadding,
        tableTop + cellPadding
      );

      doc.text(
        "Price",
        tableLeft + colWidths[0] + colWidths[1] + colWidths[1] + cellPadding,
        tableTop + cellPadding
      );
      doc.text(
        "Amount",
        tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + cellPadding,
        tableTop + cellPadding
      );
      doc.text(
        "EnterpriseNIT",
        tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 80,
        tableTop + cellPadding
      );
      // Add data rows
      doc.font("Helvetica");
      products.forEach((product, i) => {
        const top = tableTop + rowHeight + i * rowHeight;
        const backgroundColor =
          i % 2 === 0 ? evenRowBackgroundColor : oddRowBackgroundColor;
        doc
          .rect(
            tableLeft,
            top,
            colWidths.reduce((a, b) => a + b),
            rowHeight
          )
          .fill(backgroundColor);
        doc.fillColor(headerTextColor);

        doc.text(product.title, tableLeft + cellPadding, top + cellPadding);
        doc.text(
          product.description,
          tableLeft + colWidths[0] + cellPadding,
          top + cellPadding
        );

        doc.text(
          product.price,
          tableLeft + colWidths[0] + colWidths[1] + colWidths[1] + cellPadding,
          top + cellPadding
        );
        doc.text(
          product.unitsAvailable,
          tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + cellPadding,
          top + cellPadding
        );
        doc.text(
          product.enterpriseNIT,
          tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 80,
          top + cellPadding
        );
      });

      doc.end();

      // Send email with pdf

      const message = {
        from: EMAIL_VERIFIED,
        to: email,
        subject: "Informe de productos",
        text: "Este correo contiene un resumen de los productos requeridos.",
        attachments: [
          {
            filename: "product_list.pdf",
            path: pdfPath,
          },
        ],
      };

      // Try send
      await SendEmailClient.sendMail(message);
      res.json({
        message: "Email sent successfully",
        code: "EMAIL_NOTIFICATION",
      });
    } catch ({ name, message }) {
      res.json({
        message: message,
        code: name,
      });
    }
  }
};
