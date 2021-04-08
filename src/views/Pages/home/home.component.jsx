import Layout from 'antd/lib/layout/layout';
import React from 'react';

import {Table, table} from 'antd';

// import Directory from '../../components/directory/directory.component';

import SiderDemo from '../../../hoc/layout/layout.component';

import './home.styles.css';

const HomePage = () => (
    <div className='homepage'>
        <SiderDemo/>
    </div>
);

export default HomePage;