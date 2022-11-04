import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

function ServicesPage() {
   const navigate = useNavigate();
   useEffect(() => {
      navigate(routesConfig.listServices);
   }, []);
   return <></>;
}

export default ServicesPage;
