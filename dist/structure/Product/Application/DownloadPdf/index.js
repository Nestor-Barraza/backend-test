"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _Domain = _interopRequireDefault(require("../../Domain"));
var _fs = _interopRequireDefault(require("fs"));
var _constants = require("../../../../utils/constants");
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
  oddRowBackgroundColor
} = _constants.PDF_PROPS;
module.exports = async ({
  params: {
    name_file
  }
}, res) => {
  //Find all products
  const products = await _Domain.default.find({});
  if (products) {
    try {
      // Create PDFDocument Object
      const doc = new _pdfkit.default();

      // Set page width and margin
      doc.pipe(_fs.default.createWriteStream("archivo.pdf"));
      doc.fontSize(12);
      doc.page.width = 612;
      doc.page.margins = {
        top: 50,
        bottom: 50,
        left: 100,
        right: 30
      };

      // Configuring table styles
      doc.text("Lista de Productos", {
        align: "center",
        fontSize: 18
      });
      doc.moveDown();

      // Configurar estilos de tabla
      doc.font(fontFamily);

      // Add table header
      doc.fillColor(headerTextColor);
      doc.strokeColor("white");
      // Encabezado de la tabla

      doc.text("Name", tableLeft + cellPadding, tableTop + cellPadding);
      doc.text("Description", tableLeft + colWidths[0] + cellPadding, tableTop + cellPadding);
      doc.text("Price", tableLeft + colWidths[0] + colWidths[1] + colWidths[1] + cellPadding, tableTop + cellPadding);
      doc.text("Amount", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + cellPadding, tableTop + cellPadding);
      doc.text("EnterpriseNIT", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 80, tableTop + cellPadding);
      // Add data rows
      doc.font("Helvetica");
      products.forEach((product, i) => {
        const top = tableTop + rowHeight + i * rowHeight;
        const backgroundColor = i % 2 === 0 ? evenRowBackgroundColor : oddRowBackgroundColor;
        doc.rect(tableLeft, top, colWidths.reduce((a, b) => a + b), rowHeight).fill(backgroundColor);
        doc.fillColor(headerTextColor);
        doc.text(product.title, tableLeft + cellPadding, top + cellPadding);
        doc.text(product.description, tableLeft + colWidths[0] + cellPadding, top + cellPadding);
        doc.text(product.price, tableLeft + colWidths[0] + colWidths[1] + colWidths[1] + cellPadding, top + cellPadding);
        doc.text(product.unitsAvailable, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + cellPadding, top + cellPadding);
        doc.text(product.enterpriseNIT, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 80, top + cellPadding);
      });
      // Configure HTTP headers to send PDF file to browser
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename=${name_file}.pdf`);

      // Send PDF file as HTTP response
      doc.pipe(res);
      doc.end();
    } catch ({
      name,
      message
    }) {
      res.json({
        message: message,
        code: name
      });
    }
  }
};