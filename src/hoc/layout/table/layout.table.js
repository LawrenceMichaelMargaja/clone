import React, {Component} from 'react';
import ReactDOM from 'react-router-dom';
import { Layout, Menu, Table } from 'antd';

class SiderDemoTable extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('nextProps', nextProps);

        const {transactions} = this.props
        console.log('console.log of transactions from layout.table.js        ' + transactions)

        if (transactions === null) {
            alert('Alert from layout.table.js       ' + [JSON.stringify({transactions})])
            return false
        }

        return true
    }





    componentWillMount() {
        this.props.getTableBody()
        // console.log('console log from componentWillMount in layout.table.js      ' + this.props.transactions)
    }

    render() {

        // Destructure your props here
        const {
            columns,
            getTableBody,
        } = this.props

        return (
            <Table
                columns={columns}
                dataSource={getTableBody()}
            />
        )
    }


}

export default SiderDemoTable;
