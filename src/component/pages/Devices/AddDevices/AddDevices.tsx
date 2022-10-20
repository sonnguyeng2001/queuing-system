import { Link } from "react-router-dom";
import { routesConfig } from "../../../../routes/routeConfig";

export const AddDevices = () => {
   return (
      <div>
         <h2>Delete Devices</h2>
         <Link to={routesConfig.detailsDevices}>Go to Delete Devices</Link>
      </div>
   );
};
