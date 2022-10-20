import { useEffect } from 'react';
import './App.css';

// Router
import { DefaultLayout } from './component/layouts/defaultLayout/DefaultLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../src/redux/store';
import { getUsers } from './redux/features/UserSlice';
 

function App() {
   const dispatch = useDispatch<any>();
   const dataUser = useSelector((state: State) => state.user);
   useEffect(() => {
      dispatch(getUsers());
       
   }, [dispatch]);

   return (
      <div className="App">
         <div className="wrapper">
            <Router>
               {dataUser.isLoggedIn ? (
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
               ) : (
                  <Routes>
                     {dataUser.data.length > 0 &&
                        publicRoutes.map((route, index) => {
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
