import createNewproduct from "./CreateProduct";
import getProduct from "./GetProduct/index";
import updateProduct from "./UpdateProduct";
import deleteProduct from "./DeleteProduct";
import getPdf from "./DownloadPdf";
import sendPdf from "./SendPdf";

//Controler
const productCtrl = {};

//Use cases [Application]
productCtrl.createNewproduct = createNewproduct;
productCtrl.getProduct = getProduct;
productCtrl.updateProduct = updateProduct;
productCtrl.deleteProduct = deleteProduct;
productCtrl.getPdf = getPdf;
productCtrl.sendPdf = sendPdf;

module.exports = productCtrl;
