import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {

  successIconUrl = "assets/images/icons/modal-success-ico.png";
  failureIconUrl = "assets/images/icons/modal-failure-ico.png";

  baseUrl = environment.baseURL;

  //Login
  login = "user/user/login";

  //UploadFile
  uploadFile = "master/file/save";
  getImage = "master/file/get/by-id?id=";

  //Dashboard chart
  getDashBoardCharts = "configuration/dashboard/charts"
  getDashboardMetrics = "configuration/dashboard/metrics"

  // Count
  getCarCount = "master/carCount";
  getLocationCount = "master/locationCount";

  //Type
  getAllWasherTypes = "master/washertype/get";

  //TimeSlots
  getAllTimeSlots = "master/slots/get";

  //car / brand
  addBrand = "master/Brand/save";
  getAllBrands = "master/Brand/getAllBrand";
  getBrands = "master/Brand/getBrand";
  deleteBrand = "master/Brand/delete?id=";
  getBrandById = "master/Brand/by-id?id=";

  //car / varient
  addVarient = "master/Varient/save";
  getAllVarients = "master/Varient/getAllVarient";
  getVarient = "master/Varient/getVarients";
  deleteVarient = "master/Varient/delete?id=";
  getVarientById = "master/Varient/by-id?id=";
  getVarientByBrand = "master/Varient/by-brand?brand=";

  //master /user

  getAllUsers = "master/user/users";
  getUser = "master/user/";
  getUserById = "master/user/by-id?id=";

  //master /ratings
  getRatingById: "master/rating/by-id?id=";

  //master /plan

  addPlan = "master/plan/save";
  getPlan = "master/plan/";
  getAllPlans = "master/plan/get";
  getPlanById = "master/plan/by-id?id=";
  deletePlan = "master/plan/delete?id=";

  //master/vendor

   addVendor="master/vendor/save";
   getVendors = "master/vendor/";
   getAllVendors = "master/vendor/getAll";
   getVendorById="master/vendor/by-id?id=";
   deleteVendor="master/vendor/delete?id=";

  //welcomeScreen
  addWelcomeScreen = "master/WelcomeScreen/save";
  getAllWelcomeScreens = "master/WelcomeScreen/getAllScreens";
  getWelcomeScreen = "master/WelcomeScreen/getScreens";
  deleteWelcomeScreen = "master/WelcomeScreen/delete?id=";
  getWelcomeScreenById = "master/WelcomeScreen/by-id?id=";

  //banner
  addBanner = "master/banner/save";
  getAllBannerByRankAndIsActiveTrue ="master/banner/getAllBannerByRankAndIsActiveTrue";
  getBanners = "master/banner/getBanners";
  deleteBanner = "master/banner/delete?id=";
  getBannerById = "master/banner/by-id?id=";

  //service
  addService = "master/services/save";
  getAllService= "master/services/getAllService";
  getService = "master/services/getService";
  deleteService = "master/services/delete?id=";
  getServiceById = "master/services/by-id?id=";
  deleteServiceDetail="/master/services/delete-service-detail?id="

  //category
  addServiceGroup="/master/service-group/save";
  getAllServiceGroup="/master/service-group/";
  getServiceGroupById="master/service-group/by-id?id=";
  deleteServiceGroup="master/service-group/delete?id=";
  getServiceGroup="master/service-group/getServiceGroup";


  //Report
  getGenericReport = "report/generic";
  getAggregateReport = "report/aggregate?report=";
  getReportFilters = "report/filter?report=";

  //District
  addDistrict = "master/districts/save";
  getAllDistricts = "master/districts/districts";
  getDistricts = "master/districts/";
  deleteDistrict = "master/districts/delete?id=";
  getDistrictById = "master/districts/by-id?id=";
  getDistrictByRegion = "master/districts/by-region?region=";

  //Region

  addRegion = "master/regions/save";
  getAllRegions = "master/regions/regions";
  getRegions = "master/regions/";
  deleteRegion = "master/regions/delete?id=";
  getRegionById = "master/regions/by-id?id=";


  //Employee
  addEmployee = "master/employee/save";
  getEmployee = "master/employee/getEmployees";
  getAllEmployee = "master/employee/getAllEmployees";
  getEmployeeById = "master/employee/by-id?id=";
  getEmployeeByDistrict = "/master/employee/get-by-district?districtId="
  getEmployeeByType = "master/employee/get-by-type?typeId="
  deleteEmployee = "master/employee/delete?id=";
  getNearestEmployee="/master/booking/get-nearest-employees?id="

  //BookingStatus
  getAllBookings="/master/booking/bookings";
  getBookingById="/master/booking/by-id?id="
  getBookings="/master/booking/";
  addBookingEmployee="/master/booking/book-employee"

  //UserAddress
  getAllUserAddress="";
  getUserAddressById="/master/address/by-id?id=";
  saveUserAddress="";

  //Dowloads
  downloadPdf = "/master/booking/downloadBookingReportPdf?type=";
  downloadExcel = "/master/booking/downloadBookingReportExcel?type=";

  //Settings
  addSettings="/master/support/save";
  getAllSettings="/master/support/get-all";
  getSettingByName="/master/support/getMobileNumber?name=";
  getSettings="/master/support/get";
  getSettingsById="/master/support/by-id?id=";

  //Report
  getReport="/configuration/report";
  downloadReportPdf="/configuration/pdf?report=";
  downloadReportExcel="/configuration/excel?report=";

  //Broadcast Notification
   getBroadcast="/master/broadcast/getBroadcast";
   getAllBroadcast="getBroadcast";
   addBroadcast="/master/broadcast/save";

}
