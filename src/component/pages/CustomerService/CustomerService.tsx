import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

export const CustomerService = () => {
   const navigate = useNavigate();
   useEffect(() => {
      navigate(routesConfig.listCustomerService);
   }, []);
   return <></>;
};
