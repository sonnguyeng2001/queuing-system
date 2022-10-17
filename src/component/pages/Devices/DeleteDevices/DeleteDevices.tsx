import { Link } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';

export const DeleteDevices = () => {
   return (
      <div>
         <h2>Delete Devices</h2>
         <Link to={routesConfig.listDevices}>Go to List Devices</Link>
      </div>
   );
};
