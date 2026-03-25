// import React from 'react'
import UserNavbar from '../component/UserNavbar';
import { Outlet } from 'react-router-dom';
import UserFooter from '../component/UserFooter';

export const Wrapper = () => {
  return (
    <div>
        <UserNavbar />
        <main>
            <Outlet/>
        </main>
        <UserFooter/>
    </div>
  )
}
export default Wrapper;