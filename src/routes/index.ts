import { ListActionHistory } from './../components/pages/Setting/ActionHistory/List/ListActionHistory';
// Dashboard
import { DashboardPage } from '../components/pages/Dashboard/Dashboard';

// Devices
import DevicesPage from '../components/pages/Devices';
import { ListDevices } from '../components/pages/Devices/List/ListDevices';
import { AddDevices } from '../components/pages/Devices/Add/AddDevices';
import { DetailsDevices } from '../components/pages/Devices/Details/DetailsDevices';
import { UpdateDevices } from '../components/pages/Devices/Update/UpdateDevices';

// Services
import ServicesPage from '../components/pages/Services';
import { ListServices } from '../components/pages/Services/List/ListServices';
import { DetailsServices } from '../components/pages/Services/Details/DetailsServices';
import { AddServices } from '../components/pages/Services/Add/AddServices';

// CustomerService
import CustomerService from '../components/pages/CustomerService';
import { ListCustomerService } from '../components/pages/CustomerService/List/ListCustomerService';
import { AddCustomerService } from '../components/pages/CustomerService/Add/AddCustomerService';
import { UpdateServices } from '../components/pages/Services/Update/UpdateServices';

// Report
import ReportPage from '../components/pages/Report';
import { ListReport } from '../components/pages/Report/List/ListReport';

// Setting
import SettingPage from '../components/pages/Setting';

// Setting => Role
import { ListRole } from '../components/pages/Setting/Role/ListRole/ListRole';
import { AddRole } from '../components/pages/Setting/Role/AddRole/AddRole';
import { UpdateRole } from '../components/pages/Setting/Role/UpdateRole/UpdateRole';

// Setting => Account
import { ListAccount } from '../components/pages/Setting/Account/ListAccount/ListAccount';
import { UpdateAccount } from '../components/pages/Setting/Account/UpdateAccount/UpdateAccount';

// User Account
import { ForgotPasswordPage } from '../components/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../components/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../components/pages/Login/Login';

import { routesConfig } from './routeConfig';
import { AddAccount } from '../components/pages/Setting/Account/AddAccount/AddAccount';
import { InfoUser } from '../components/pages/InfoUser/InfoUser';
import { DetailsCustomerService } from '../components/pages/CustomerService/Details/DetailsCustomerService';

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
      {
            path: routesConfig.detailsCustomerService,
            component: DetailsCustomerService,
            translate: 'Chi tiết cấp số',
            pageHeader: '/customerService/detailsCustomerService',
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

      // Setting Page => Role
      {
            path: routesConfig.listRole,
            component: ListRole,
            translate: 'Quản lý vai trò',
            pageHeader: routesConfig.listRole,
      },
      {
            path: routesConfig.addRole,
            component: AddRole,
            translate: 'Thêm vai trò',
            pageHeader: routesConfig.addRole,
      },
      {
            path: routesConfig.updateRole,
            component: UpdateRole,
            translate: 'Cập nhật vai trò',
            pageHeader: '/setting/updateRole',
      },
      // Setting Page => Account
      {
            path: routesConfig.listAccount,
            component: ListAccount,
            translate: 'Quản lý tài khoản',
            pageHeader: routesConfig.listAccount,
      },
      {
            path: routesConfig.updateAccount,
            component: UpdateAccount,
            translate: 'Cập nhật tài khoản',
            pageHeader: '/setting/updateAccount',
      },
      {
            path: routesConfig.addAccount,
            component: AddAccount,
            translate: 'Thêm tài khoản',
            pageHeader: routesConfig.addAccount,
      },

      // Setting Page => Action History
      {
            path: routesConfig.listActionHistory,
            component:ListActionHistory ,
            translate: 'Nhật ký hoạt động',
            pageHeader: routesConfig.listActionHistory,
      },

      // InfoUser
      {
            path: routesConfig.infoUser,
            component: InfoUser,
            translate: 'Thông tin cá nhân',
            pageHeader: routesConfig.infoUser,
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
