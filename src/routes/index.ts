// Dashboard
import { DashboardPage } from '../component/pages/Dashboard/Dashboard';

// Devices
import { DevicesPage } from '../component/pages/Devices/Devices';
import { ListDevices } from '../component/pages/Devices/ListDevices/ListDevices';
import { AddDevices } from '../component/pages/Devices/AddDevices/AddDevices';
import { DetailsDevices } from '../component/pages/Devices/DetailsDevices/DetailsDevices';
import { UpdateDevices } from '../component/pages/Devices/UpdateDevices/UpdateDevices';

// Services
import { ServicesPage } from './../component/pages/Services/Services';
import { ListServices } from './../component/pages/Services/ListServices/ListServices';
import { DetailsServices } from './../component/pages/Services/DetailsServices/DetailsServices';
import { AddServices } from './../component/pages/Services/AddServices/AddServices';

// CustomerService
import { CustomerService } from '../component/pages/CustomerService/CustomerService';
import { ListCustomerService } from '../component/pages/CustomerService/ListCustomerService/ListCustomerService';

// User Account
import { ForgotPasswordPage } from '../component/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../component/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../component/pages/Login/Login';

import { routesConfig } from './routeConfig';
import { UpdateServices } from '../component/pages/Services/UpdateServices/UpdateServices';

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
