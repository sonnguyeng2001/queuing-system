import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

function SettingPage() {
   const navigate = useNavigate();
   useEffect(() => {
      navigate(routesConfig.settingRole);
   });
   return <></>;
}

export default SettingPage;
