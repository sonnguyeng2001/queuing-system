import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';

function ActionHistoryPage() {
      const navigate = useNavigate();
      useEffect(() => {
            navigate(routesConfig.listReport);
      });
      return <></>;
}

export default ActionHistoryPage;
