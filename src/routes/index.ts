import { ServicesPage } from './../component/pages/Services/Services';
import { DevicesPage } from '../component/pages/Devices/Devices';
import { DashboardPage } from '../component/pages/Dashboard/Dashboard';
import { ForgotPasswordPage } from '../component/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../component/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../component/pages/Login/Login';
import { routesConfig } from './routeConfig';
import { AddDevices } from '../component/pages/Devices/AddDevices/AddDevices';
import { ListDevices } from '../component/pages/Devices/ListDevices/ListDevices';
import { DeleteDevices } from '../component/pages/Devices/DeleteDevices/DeleteDevices';
import { Page404 } from '../component/pages/Page404/Page404';

export type RouteProps = {
   path: string;
   component: any;
   layout?: any;
   translate?: string;
};

const privateRoutes: RouteProps[] = [
   {
      path: routesConfig.dashboard,
      component: DashboardPage,
      translate: 'Dashboard',
   },
   {
      path: routesConfig.devices,
      component: DevicesPage,
      translate: 'Thiết bị',
   },
   {
      path: routesConfig.addDevices,
      component: AddDevices,
      translate: 'Thêm thiết bị',
   },
   {
      path: routesConfig.deleteDevices,
      component: DeleteDevices,
      translate: 'Xóa thiết bị',
   },
   {
      path: routesConfig.listDevices,
      component: ListDevices,
      translate: 'Danh sách thiết bị',
   },
   {
      path: routesConfig.services,
      component: ServicesPage,
      translate: 'Dịch vụ',
   },
];

const publicRoutes: RouteProps[] = [
   {
      path: routesConfig.login,
      component: LoginPage,
      translate: 'Đăng nhập',
   },
   {
      path: routesConfig.forgotPassword,
      component: ForgotPasswordPage,
      translate: 'Quên mật khẩu',
   },
   {
      path: routesConfig.resetPassword,
      component: ResetPassword,
      translate: 'Đặt lại mật khẩu',
   },
];

export { publicRoutes, privateRoutes };
