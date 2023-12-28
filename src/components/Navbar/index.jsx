import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
`;

const NavMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
color: #ddd;
  position: relative;
  font-size: 16px;
  border-right: 1px solid #666;
 
`;

const NavLink = styled(Link)`
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  background-color: #333;
  min-width: 160px;
  z-index: 1;
  margin: 0;
  padding: 0;
`;

const DropdownItem = styled.li`
  color: #ddd;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const MenuNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { label: 'Início', link: '/' },
    {
      label: 'Tensorflow',
      submenu: [
        { label: 'Treinamento', link: 'traintensorflow' },
        { label: 'Predição', link: 'predicttensorflow' },
      ],
    },
    {
      label: 'KNN',
      submenu: [
        { label: 'Treinamento', link: 'trainknn' },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };


  return (
    <Navbar>
      <NavMenu>
        {menuItems.map((item, index) => (
          <NavItem
            key={index}         
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to={item.link}>{item.label}</NavLink>
            {item.submenu && activeDropdown === index && (
              <DropdownMenu>
                {item.submenu.map((subitem, subIndex) => (
                  <DropdownItem key={subIndex}>
                    <NavLink to={subitem.link}>{subitem.label}</NavLink>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </NavItem>
        ))}
      </NavMenu>
    </Navbar>
  );
};

export default MenuNavbar;
