// Dashboard
import { DashboardPage } from '../component/pages/Dashboard/Dashboard';

// Devices
import DevicesPage from '../component/pages/Devices';
import { ListDevices } from '../component/pages/Devices/List/ListDevices';
import { AddDevices } from '../component/pages/Devices/Add/AddDevices';
import { DetailsDevices } from '../component/pages/Devices/Details/DetailsDevices';
import { UpdateDevices } from '../component/pages/Devices/Update/UpdateDevices';

// Services
import ServicesPage from '../component/pages/Services';
import { ListServices } from '../component/pages/Services/List/ListServices';
import { DetailsServices } from '../component/pages/Services/Details/DetailsServices';
import { AddServices } from '../component/pages/Services/Add/AddServices';

// CustomerService
import CustomerService from '../component/pages/CustomerService';
import { ListCustomerService } from '../component/pages/CustomerService/List/ListCustomerService';
import { AddCustomerService } from '../component/pages/CustomerService/Add/AddCustomerService';

// Report
import ReportPage from '../component/pages/Report';
import { ListReport } from '../component/pages/Report/List/ListReport';

// Setting
import SettingPage from '../component/pages/Setting';
import { SettingRole } from '../component/pages/Setting/Role/SettingRole';
import { SettingAccount } from './../component/pages/Setting/Account/SettingAccount';

// User Account
import { ForgotPasswordPage } from '../component/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../component/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../component/pages/Login/Login';

import { routesConfig } from './routeConfig';
import { UpdateServices } from '../component/pages/Services/Update/UpdateServices';

export type RouteProps = {
   path: string;
   component: any;
   layout?: any;
   translate?: string;
   pageHeader: string;
};

const privateRoutes: RouteProps[] = [
   // Dashboard
   {
      path: routesConfig.dashboard,
      component: DashboardPage,
      translate: 'Dashboard',
      pageHeader: routesConfig.dashboard,
   },

   // Devices
   {
      path: routesConfig.devices,
      component: DevicesPage,
      translate: 'Thiết bị',
      pageHeader: routesConfig.devices,
   },
   {
      path: routesConfig.addDevices,
      component: AddDevices,
      translate: 'Thêm thiết bị',
      pageHeader: routesConfig.addDevices,
   },
   {
      path: routesConfig.detailsDevices,
      component: DetailsDevices,
      translate: 'Chi tiết thiết bị',
      pageHeader: '/devices/detailsDevices',
   },
   {
      path: routesConfig.updateDevices,
      component: UpdateDevices,
      translate: 'Cập nhật thiết bị',
      pageHeader: '/devices/updateDevices',
   },
   {
      path: routesConfig.listDevices,
      component: ListDevices,
      translate: 'Danh sách thiết bị',
      pageHeader: routesConfig.listDevices,
   },

   // Services
   {
      path: routesConfig.services,
      component: ServicesPage,
      translate: 'Dịch vụ',
      pageHeader: routesConfig.services,
   },
   {
      path: routesConfig.listServices,
      component: ListServices,
      translate: 'Danh sách dịch vụ',
      pageHeader: routesConfig.listServices,
   },
   {
      path: routesConfig.detailsServices,
      component: DetailsServices,
      translate: 'Chi tiết dịch vụ',
      pageHeader: '/services/detailsServices',
   },
   {
      path: routesConfig.updateServices,
      component: UpdateServices,
      translate: 'Cập nhật dịch vụ',
      pageHeader: '/services/updateServices',
   },
   {
      path: routesConfig.addServices,
      component: AddServices,
      translate: 'Thêm dịch vụ',
      pageHeader: routesConfig.addServices,
   },

   // CustomerService
   {
      path: routesConfig.customerService,
      component: CustomerService,
      translate: 'Cấp số',
      pageHeader: routesConfig.customerService,
   },
   {
      path: routesConfig.listCustomerService,
      component: ListCustomerService,
      translate: 'Danh sách cấp số',
      pageHeader: routesConfig.listCustomerService,
   },
   {
      path: routesConfig.addCustomerService,
      component: AddCustomerService,
      translate: 'Cấp số mới',
      pageHeader: routesConfig.addCustomerService,
   },

   // Report
   {
      path: routesConfig.report,
      component: ReportPage,
      translate: 'Báo cáo',
      pageHeader: routesConfig.report,
   },
   {
      path: routesConfig.listReport,
      component: ListReport,
      translate: 'Lập báo cáo',
      pageHeader: routesConfig.listReport,
   },

   // Setting Page

   {
      path: routesConfig.setting,
      component: SettingPage,
      translate: 'Cài đặt hệ thống',
      pageHeader: routesConfig.setting,
   },
   {
      path: routesConfig.settingRole,
      component: SettingRole,
      translate: 'Quản lý vai trò',
      pageHeader: routesConfig.settingRole,
   },
   {
      path: routesConfig.settingAccount,
      component: SettingAccount,
      translate: 'Quản lý tài khoản',
      pageHeader: routesConfig.settingAccount,
   },
];

const publicRoutes: RouteProps[] = [
   {
      path: routesConfig.login,
      component: LoginPage,
      translate: 'Đăng nhập',
      pageHeader: routesConfig.login,
   },
   {
      path: routesConfig.forgotPassword,
      component: ForgotPasswordPage,
      translate: 'Quên mật khẩu',
      pageHeader: routesConfig.resetPassword,
   },
   {
      path: routesConfig.resetPassword,
      component: ResetPassword,
      translate: 'Đặt lại mật khẩu',
      pageHeader: routesConfig.resetPassword,
   },
];

export { publicRoutes, privateRoutes };
