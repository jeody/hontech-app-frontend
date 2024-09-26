import React, { useState } from 'react';
import './Sidebar.scss';
import { HiMenuAlt3 } from 'react-icons/hi';
import { GiCarSeat } from 'react-icons/gi';
import menu from '../../data/sidebar';
import SidebarItems from './SidebarItems';
import { useNavigate } from 'react-router-dom';
//import hontechLogo from '../../assets/hontech-logo-sm.png';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top_section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <GiCarSeat
              size={35}
              style={{ cursor: 'pointer' }}
              onClick={goHome}
            />
            {/* 
            <img
              src={hontechLogo}
              alt='Hontech'
              style={{ cursor: 'pointer' }}
              onClick={goHome}
            />
            */}
          </div>

          <div
            className='bars'
            style={{ marginLeft: isOpen ? '100px' : '0px' }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItems key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all .5s',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
