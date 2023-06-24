import createNewEnterprise from "./CreateEnterprise";
import renderEnterprise from "./RenderEnterprise";
import findEnterprise from "./FindEnterprise";
import updateEnterprise from "./UpdateEnterprise";
import deleteEnterprise from "./DeleteEnterprise";

//Controler
const enterpriseCtrl = {};

enterpriseCtrl.createNewEnterprise = createNewEnterprise;
enterpriseCtrl.renderEnterprise = renderEnterprise;
enterpriseCtrl.findEnterprise = findEnterprise;
enterpriseCtrl.updateEnterprise = updateEnterprise;
enterpriseCtrl.deleteEnterprise = deleteEnterprise;

module.exports = enterpriseCtrl;
