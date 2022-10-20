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

// User Account
import { ForgotPasswordPage } from '../component/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../component/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../component/pages/Login/Login';

import { routesConfig } from './routeConfig';


export type RouteProps = {
   path: string;
   component: any;
   layout?: any;
   translate?: string;
   pageHeader: string;
};

const privateRoutes: RouteProps[] = [
   {
      path: routesConfig.dashboard,
      component: DashboardPage,
      translate: 'Dashboard',
      pageHeader: routesConfig.dashboard,
   },
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
   {
      path: routesConfig.services,
      component: ServicesPage,
      translate: 'Dịch vụ',
      pageHeader: routesConfig.services,
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
