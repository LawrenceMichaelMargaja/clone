import React, {Component, useCallback, useState, useEffect} from 'react';
import ReactDOM from 'react-router-dom';
import { Layout, Menu, Table, Sider, Cell } from 'antd';
import {fetchTransactions, updateDeliveryStatus} from "../../store/actions/delivery";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {useDispatch, useSelector} from "react-redux";

import SiderDemoTable from './table/layout.table';

// import dataSource from '../../hoc/table/Table-Souce';

import './layout.styles.css';
import { render } from '@testing-library/react';



const SiderDemo = () => {

    const {Header, Sider, Content} = Layout;

    const dispatch = useDispatch();
    const transactions = useSelector(state => state.delivery.transactions.data);
    const transactionsPagination = useSelector(state => state.delivery.transactions.pagination);


    const [rowsPerPage, setRowsPerPage] = useState(200)
    const [page, setPage] = useState(0)


    const fetchData = (rows, page, search) => dispatch(fetchTransactions(rows, page, search))

    useEffect(() => {
        fetchData(rowsPerPage, page)
    }, [page, rowsPerPage]);


    alert('Alert from layout.components.jsx    ' + [JSON.stringify({transactions})])


    console.log('Transactions console logged:     ' + [transactions]);

    const columns = [
        {
            title: 'Date',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Recipient',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
        },
        {
            title: 'Type',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Region',
            dataIndex: 'address',
            key: '2',
            width: 150,
        },
        {
            title: 'Seller',
            dataIndex: 'address',
            key: '3',
            width: 150,
        },
        {
            title: 'Dropshipper',
            dataIndex: 'address',
            key: '4',
            width: 150,
        },
        {
            title: 'Trans',
            dataIndex: 'address',
            key: '5',
            width: 150,
        },
        {
            title: 'Amount',
            dataIndex: 'address',
            key: '6',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'address',
            key: '7',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>,
        },
    ];




    const getTableBody = () => {

        const data = [];

        for (let i in transactions) {

            const {
                date_created: dateCreated,
                recipient,
                transaction_number: transactionNumber,
                amount,
                tracking_number: trackingNumber,
                type: type,
                status: status,
                dropshipper,
                seller: seller,
                region: region,
            } = transactions[i]

            data.push({
                key: i,
                recipient: recipient,
                transaction_number: transactionNumber,
                amount: amount,
                tracking_number: trackingNumber,
                type: type,
                dropshipper: dropshipper,
                seller: seller,
                region: region
            });



            // data.push(
            //     [   key
            //         {align: "center", value: dateCreated},
            //         {align: "left", value: recipient},
            //         {align: "center", value: type},
            //         {align: "center", value: region},
            //         {align: "left", value: seller},
            //         {align: "center", value: dropshipper},
            //         {align: "center", value: transactionNumber},
            //         {align: "right", value: amount.toFixed(2)},
            //         {align: "center", value: status},
            //         // {align:"center", value: fillButtons(status, transactionNumber},
            //         ]
            //     )
            }
            return data;
        }



        const getTableBody2 = useCallback(getTableBody, [transactions])



        const SiderDemoTable2 = () => {
            return (
                <SiderDemoTable
                    // searchFilter={searchFilter}
                    transactions={transactions}
                    columns={columns}
                    getTableBody={getTableBody2}
                    // transactionsPagination={transactionsPagination}
                    // handleOnChangePage={handleOnChangePage}
                    // handleOnChangeRowsPerPage={handleOnChangeRowsPerPage}
                />
            )
        }


        // toggle = () => {
        //   this.setState({
        //     collapsed: !this.state.collapsed,
        //   });
        // };

        return (
            <Layout className='layout'>
                <Sider className='sider' trigger={null} collapsible>
                    <div className="logo"/>
                    <Menu className='menu' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item className='menu-item' key="1" icon={<UserOutlined/>}>
                            Delivery Management
                        </Menu.Item>
                        <Menu.Item className='menu-item' key="2" icon={<VideoCameraOutlined/>}>
                            Transactions
                        </Menu.Item>
                        <Menu.Item className='menu-item' key="3" icon={<UploadOutlined/>}>
                            Coins
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
                    </Header>
                    {/* <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '86vh',
            }}
          >
            Content
          </Content> */}
                    {
                        SiderDemoTable2()
                    }
                    {/* <Table dataSource={this.transactions} columns={this.state.columns}/> */}
                </Layout>
            </Layout>
        );
}

export default SiderDemo;
