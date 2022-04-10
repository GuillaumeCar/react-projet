import { NavLink } from 'react-router-dom';
import SearchGame from './SearchGame';
import { Menu, Image } from 'semantic-ui-react';
import './Menu.css';

export default function MenuApp() {
    return (
        <Menu stackable fixed="top">
            <NavLink to='/'>
                <Menu.Item>
                    <Image src='/logo_ggs.png' size="tiny" />
                </Menu.Item>
            </NavLink>

            <NavLink to='/team'>
                <Menu.Item
                    name='team' className='menu-tab'
                >
                    L'équipe
                </Menu.Item>
            </NavLink>

            <NavLink to='/mes-favoris'>
                <Menu.Item
                    name='favoris'
                    className='menu-tab'
                >
                    Favoris
                </Menu.Item>
            </NavLink>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <SearchGame />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
