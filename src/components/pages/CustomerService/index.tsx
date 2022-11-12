import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

function CustomerService() {
      const navigate = useNavigate();
      useEffect(() => {
            navigate(routesConfig.listCustomerService);
      }, []);
      return <></>;
}

export default CustomerService;
