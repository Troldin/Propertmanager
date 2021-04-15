import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/users");
  }
  // DataService for Users managment
  getAllTenants() {
    return http.get("/users/tenants");
  } 
  getAllAdmins() {
    return http.get("/users/admins");
  } 
  getAllRestorers(){
    return http.get("/users/restorers");
  }

  getUser(id) {
    return http.get(`/users/${id}`);
  }
  updateUser(id, data) {
    return http.put(`/users/${id}`, data);
  }
  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }
  createUser(data) {
    return http.post("/users", data);
  }
  

  ////////////      Building     ///////////
  getAllBuildings() {
    return http.get("/buildings")
  }
  getBuilding(id) {
    return http.get(`/buildings/${id}`);
  }
  getAllBuildingsByAdminId(id){
    return http.get(`/buildings/byAdministratorId/${id}`)
  }
  updateBuilding(id, data) {
    return http.put(`/buildings/${id}`, data);
  }
  deleteBuilding(id) {
    return http.delete(`/buildings/${id}`);
  }
  createBuilding(data) {
    return http.post("/buildings", data);
  }
  ////////////    Applications    //////////

  getAllRestorerApplications(id){
    return http.get(`/reports/byRestorerId/${id}`)
  }
  createApplication(data) {
    return http.post("/reports", data);
  }
  getAllApplicationsByUserId(id){
    return http.get(`/reports/byUserId/${id}`)
  }
  deleteApplication(id){
    return http.delete(`/reports/${id}`);
  }
  updateApplication(id, data) {
    return http.put(`/reports/${id}`, data);
  }
  ///////////       Payments     ///////////

  getAllPaymentsNotVerified(){
    return http.get(`/payments/notVerified`)
  }
  getPaymentsNotVerifiedByAdminId(id){
    return http.get(`/payments/findAllNotVerifiedByAdminId/${id}`)
  }
  getAllTenantPayments(id){
    return http.get(`/payments/byTenantId/${id}`)
  }

  updatePayment(id, data) {
    return http.put(`/payments/${id}`, data);
  }
  getAllContractsDebts(){
    return http.get('/contracts/debts/');
  }
  getAllContractsDebtsByAdminId(id){
    return http.get(`/contracts/debtsByAdminId/${id}`);
  }
  createPayment(data) {
    return http.post(`/payments`, data);
  }
  ///////////       Unit         ///////////
  getAllUnits() {
    return http.get("/units")
  }
  getUnit(id) {
    return http.get(`/units/${id}`);
  }
  getUnitsByBuildingId(id) {
    return http.get(`units/ByBuildingId/${id}`);
  }
  getAvailable(id){
    return http.get(`/units/getAvailable/${id}`)
  }
  getBuildingUnitTenant(id){
    return http.get(`/units/buildingUnitsTenants/${id}`);
  }
  updateUnit(id, data) {
    return http.put(`/units/${id}`, data);
  }
  deleteUnit(id) {
    return http.delete(`/units/${id}`);
  }
  createUnit(data) {
    return http.post(`/units`, data);
  }
  /////////  Contracts
  createContract(data) {
    return http.post("/contracts", data);
  }
  getActive(id){
    return http.get(`contracts/getActive/${id}`)
  }
  getExpired(id){
    return http.get(`contracts/getExpired/${id}`)
  }
  getAllContractsByTenantId(id){
    return http.get(`/contracts/tenantContracts/${id}`)
  }
  ////////// Tasks /////////////
  getTask(id) {
    return http.get(`/tasks/${id}`);
  }
  deleteTask(id) {
    return http.delete(`/tasks/${id}`);
  }
  updateTask(id, data) {
    return http.put(`/tasks/${id}`, data);
  }
  getTaskByReportId(id){
    return http.get(`/tasks/byReportId/${id}`)
  }
  createTask(data){
    return http.post("/tasks", data);
  }
  getTaskByOrderId(id){
    return http.get(`/tasks/byOrderId/${id}`)
  }
  getTaskNull(){
    return http.get(`/tasks/notInOrder`)
  }
  ////////    Orders    /////////////
  createOrder(data){
    return http.post("/orders", data);
  }
  updateOrder(id, data) {
    return http.put(`/orders/${id}`, data);
  }
  getOrderByRestorerId(id){
    return http.get(`/orders/byRestorerId/${id}`)
  }
  getOrder(id) {
    return http.get(`/orders/${id}`);
  }
  //////////     Sessions    /////////////////
  createSession(data) {
    return http.post('/session', data);
  }
  deleteSession(key) {
    return http.delete(`/session/${key}`);
  }
  ////////   Raports   //////////////
  raportUnitStats(){
    return http.get(`/units/stats`, {responseType:'blob'})
  }

  raportUnitPayments(data){
  return http.post(`/units/profitability`,data, {responseType:'blob'})
  }
}



export default new DataService();
