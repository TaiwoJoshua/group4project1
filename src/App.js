import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import Layout from './components/Layout';
import Error from './components/Error';
import Chart from './pages/Chart';
import Temperature from './pages/Temperature';
import Pressure from './pages/Pressure';
import Humidity from './pages/Humidity';
import { child, get, onValue, ref } from "firebase/database";
import { database } from './api';
import { getMaximumTimestamp } from './AppManager';
import NotFound from './components/NotFound';

const transition = { duration: 0.5 };

const AnimatedRoute = ({ children }) => (
  <motion.div
    key={window.location.pathname}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={transition}
    >
    {children}
  </motion.div>
);

export default function App() {
  const [data, setData] = React.useState({});
  const [fetched, setFetched] = React.useState(false);
  const [readings, setReadings] = React.useState({});
  const [current, setCurrent] = React.useState({ Temperature: 0, Pressure: 0, Humidity: 0, Timestamp: 1710978307147 });

  React.useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `/`)).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        setFetched(true);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      // console.error(error);
    });

    onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
      setFetched(true);
    });
  }, []);

  React.useEffect(() => {
    let reads = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        let reading = data[key];
        if(reading && reading.Temperature && reading.Humidity && reading.Pressure && reading.Timestamp){
          reading = {...reading, Pressure: (parseFloat(reading.Pressure) / 10).toFixed(4) };
          reads[reading.Timestamp] = reading;
        }
      }
    }

    reads = Object.keys(reads).sort().reduce(
      (obj, key) => { 
        obj[key] = reads[key]; 
        return obj;
      }, 
      {}
    );
    const maxTime = getMaximumTimestamp(reads);
    reads["Current"] = reads[maxTime];
    setReadings(reads);
    setCurrent(reads.Current);
  }, [data]);
  
  const routes = [
    { path: '/', element: <Chart readings={readings} fetched={fetched} />, errorElement: <Error /> },
    { path: 'chart', element: <Chart readings={readings} fetched={fetched} /> },
    { path: 'temperature', element: <Temperature current={current} /> },
    { path: 'humidity', element: <Humidity current={current} /> },
    { path: 'pressure', element: <Pressure current={current} /> },
    { path: '*', element: <NotFound /> },
  ];
  
  const routerElements = {
    path: '/',
    element: <Layout />,
    children: routes.map((route) => (route.childOf ? {} : {
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: <AnimatedRoute>{route.element}</AnimatedRoute>,
      loader: route.loader ? route.loader : undefined,
      action: route.action ? route.action : undefined,
      errorElement: route.errorElement ? route.errorElement : undefined,
      children: route.path === '/' ? undefined : routes.map((rout) => {
        if(rout.childOf === route.parent){
          return {
            index: rout.path === '/',
            path: rout.path === '/' ? undefined : rout.path,
            element: <AnimatedRoute>{rout.element}</AnimatedRoute>,
            loader: rout.loader ? rout.loader : undefined,
            action: rout.action ? rout.action : undefined,
            errorElement: rout.errorElement ? rout.errorElement : undefined,
            children: rout.path === '/' ? undefined : routes.map((routs) => {
              if(routs.childOf === rout.parent){
                return {
                  index: routs.path === '/',
                  path: routs.path === '/' ? undefined : routs.path,
                  element: <AnimatedRoute>{routs.element}</AnimatedRoute>,
                  loader: routs.loader ? routs.loader : undefined,
                  action: routs.action ? routs.action : undefined,
                  errorElement: routs.errorElement ? routs.errorElement : undefined
                }
              }else{
                return {};
              }
            })
          }
        }else{
          return {};
        }
      })
    })),
  };
  
  const router = createBrowserRouter([
    routerElements
  ]);

  return (
    <div className='App'>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </div>
  );
}