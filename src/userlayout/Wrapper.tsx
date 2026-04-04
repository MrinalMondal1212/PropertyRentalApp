// import React from 'react'
import UserNavbar from '../component/UserNavbar';
import { Outlet } from 'react-router-dom';
import UserFooter from '../component/UserFooter';
import ScrollToTop from '../function/ScrollToTop';

export const Wrapper = () => {
  return (
    <div>
        <UserNavbar />
        <main>
          <ScrollToTop/>
            <Outlet/>
        </main>
        <UserFooter/>
    </div>
  )
}
export default Wrapper;