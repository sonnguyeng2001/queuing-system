import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

function DevicesPage() {
   const navigate = useNavigate();
   useEffect(() => {
      navigate(routesConfig.listDevices);
   }, []);
   return <></>;
}
export default DevicesPage;
