import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SettingPage() {
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
            navigate(location.state?.navigateTo);
      });

      return <></>;
}

export default SettingPage;
