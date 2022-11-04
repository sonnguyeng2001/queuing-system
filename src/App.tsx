import React, { useEffect } from 'react';
import './App.css';

// Router
// import { DefaultLayout } from './component/layouts/defaultLayout/DefaultLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../src/redux/store';
import { getUsers } from './redux/features/UserSlice';
import { getDevices } from './redux/features/DeviceSlice';
import { getRoles } from './redux/features/RoleSlice';
import { getCustomerServices } from './redux/features/CustomerServicesSlice';
import { getServices } from './redux/features/ServiceSlice';

// React lazy
const DefaultLayout = React.lazy(() =>
      import('./components/layouts/defaultLayout/DefaultLayout').then(({ DefaultLayout }) => ({
            default: DefaultLayout,
      })),
);
function App() {
      const dispatch = useDispatch<any>();
      const dataUser = useSelector((state: State) => state.user);
      useEffect(() => {
            dispatch(getUsers());
            dispatch(getDevices());
            dispatch(getRoles());
            dispatch(getCustomerServices());
            dispatch(getServices());
      }, [dispatch]);

      return (
            <div className="App">
                  <div className="wrapper">
                        <Router>
                              {dataUser.isLoggedIn ? (
                                    <React.Suspense fallback={<div>App.tsx: Line 33</div>}>
                                          <Routes>
                                                {privateRoutes.map((route, index) => {
                                                      const Page = route.component;
                                                      let Layout = DefaultLayout;
                                                      if (route.layout) {
                                                            Layout = route.layout;
                                                      }
                                                      return (
                                                            <Route
                                                                  key={index}
                                                                  path={route.path}
                                                                  element={<Layout component={<Page />}></Layout>}
                                                            />
                                                      );
                                                })}
                                          </Routes>
                                    </React.Suspense>
                              ) : (
                                    <Routes>
                                          {publicRoutes.map((route, index) => {
                                                const Page = route.component;
                                                return <Route key={index} path={route.path} element={<Page />} />;
                                          })}
                                    </Routes>
                              )}
                        </Router>
                  </div>
            </div>
      );
}

export default App;
