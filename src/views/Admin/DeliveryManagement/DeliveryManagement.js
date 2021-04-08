const DeliveryManagement2 = () => {

    const classes = useStyles();

    // Component variables
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.delivery.transactions.data);
    const transactionsPagination = useSelector(state => state.delivery.transactions.pagination);
    const isLoadingFetchAll = useSelector(state => state.delivery.loading.fetchTransactions);
    const isLoadingUpdatingDeliveryStatus = useSelector(state => state.delivery.loading.updateDeliveryStatus);

    // Pagination
    const [rowsPerPage, setRowsPerPage] = useState(200)
    const [page, setPage] = useState(0)
    const [searchFilter, setSearchFilter] = useState("")

    const {Modal, OpenModal} = useModal()
    const [deliveryDetails, setDeliveryDetails] = useState({})

    const fetchData = (rows, page, search) => dispatch(fetchTransactions(rows, page, search))

    const {searchLoading} = useSearchDelay({
        searchVar: searchFilter,
        timeoutDuration: 1000,
        funcToExecute: _searchFilter => fetchData(rowsPerPage, page, _searchFilter),
        searchCondition: () => searchFilter !== ""
    })

    /**
     * Pagination handlers
     */

    const handleOnChangePage = (event, newPage) => setPage(newPage)
    const handleOnChangeRowsPerPage = event => setRowsPerPage(event.target.value)

    /**
     * end of Pagination handlers
     */

    useEffect(() => {
        fetchData(rowsPerPage, page)
    }, [page, rowsPerPage]);

    // Handle delivery management modal
    useEffect(() => {
        if (size(deliveryDetails) > 0) {
            OpenModal()
        }
    }, [deliveryDetails])

    /*useEffect(() => {
        fetchData(rowsPerPage, page, searchFilter)
    }, [searchFilter])*/

    const getTableHead = () => {
        return [
            {align:"center", value: "Date"},
            {align:"left", value: "Recipient"},
            {align:"center", value: "Type"},
            {align:"center", value: "Region"},
            {align:"left", value: "Seller"},
            {align:"center", value: "Dropshipper"},
            {align:"center", value: "Trans"},
            {align:"right", value: "Amount"},
            {align:"center", value: "Status"},
            {align:"center", value: "Action"},
        ]
    }

    const getTableBody = () => {
        const container = []

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

            container.push(
                [
                    {align:"center", value:dateCreated},
                    {align:"left", value:recipient},
                    {align:"center", value:type},
                    {align:"center", value:region},
                    {align:"left", value:seller},
                    {align:"center", value:dropshipper},
                    {align:"center", value:transactionNumber},
                    {align:"right", value:amount.toFixed(2)},
                    {align:"center", value:status},
                    {align:"center", value: fillButtons(status, transactionNumber, type)},
                ]
            )

            // Add keys to container
            for (let i in container) {

            }
        }

        return container
    }

    const getTableBody2 = useCallback(getTableBody, [transactions])

    const onUpdate = (id, type, status) => {

        /**
         * Handle orders
         */
        if (type === 'Order') {
            if (status === 'Voided') {
                let voidOrRejectReason = prompt("Please enter your reason for deleting", "");

                if (voidOrRejectReason === "") {
                    alert('You must provide a reason for: ' + status)
                    return
                }

                dispatch(updateOrder(id, voidOrRejectReason, () => {
                    fetchData(rowsPerPage, page)
                }))
            }
        }

        /**
         * Handle deliveries
         */
        if (type === 'Delivery') {
            if (window.confirm(`Mark this delivery as: ${status}?`)) {
                let trackingNumber = ''
                let voidOrRejectReason = ''

                if (status === "Fulfilled") {
                    // Ask prompt for tracking number
                    trackingNumber = prompt("Please enter your tracking number", "");

                    if (trackingNumber === "" || trackingNumber === null) {
                        alert(`You must enter the tracking number`)
                        return
                    }
                }

                if (status === "Returned" || status === "Voided") {
                    voidOrRejectReason = prompt(`Please enter your ${status} reason`, "");

                    if (voidOrRejectReason === "" || voidOrRejectReason === null) {
                        alert(`You must enter a reason on why you want the delivery "${status}"`)
                        return
                    }
                }

                dispatch(updateDeliveryStatus(id, status, trackingNumber, voidOrRejectReason,() => {
                    // fetchData(rowsPerPage, page)
                }))
            }
        }
    };

    const fillButtons = (status, id, type) => {
        return (
            <Fragment>
                <Tooltip title="Details">
                    <Button
                        size="sm"
                        justIcon
                        color={"info"}
                        onClick={() => setDeliveryDetails({id, type})}
                        className={classes.actionButton}
                        key={id}>
                        <Icon>launch</Icon>
                    </Button>
                </Tooltip>

                {renderDeliveryOptions(id, status, type)}
            </Fragment>
        )
    };

    const renderDeliveryOptions = (id, status, type) => {
        let button = null

        if (type === 'Package') {
            if (status === 'Procured') {
                button = (
                    <Tooltip title="Voided">
                        <Button
                            disabled={status === 'Voided'}
                            size="sm"
                            justIcon
                            onClick={() => onUpdate(id, 'Order', 'Voided')}
                            color={"danger"} className={classes.actionButton} key={id + "Void"}>
                            <Icon>remove_circle</Icon>
                        </Button>
                    </Tooltip>
                )
            }
        } else {
            button = (
                <React.Fragment>
                    {/* Mark as: Delivered */}
                    <Tooltip title="Delivered">
                        <Button
                            disabled={status !== 'Fulfilled'}
                            size="sm"
                            justIcon
                            onClick={() => onUpdate(id, 'Delivery', 'Delivered')}
                            color={"success"} className={classes.actionButton} key={id + "Delivered"}>
                            <Icon>verified</Icon>
                        </Button>
                    </Tooltip>


                    {/* Mark as: Reject */}
                    <Tooltip title="Returned">
                        <Button
                            disabled={status !== 'Fulfilled'}
                            size="sm"
                            justIcon
                            onClick={() => onUpdate(id, 'Delivery', 'Returned')}
                            color={"danger"} className={classes.actionButton} key={id + "Returned"}>
                            <Icon>remove_circle_outline</Icon>
                        </Button>
                    </Tooltip>


                    {/* Mark as: Void */}
                    <Tooltip title="Void">
                        <Button
                            disabled={status === 'Voided'}
                            size="sm"
                            justIcon
                            onClick={() => onUpdate(id, 'Delivery', 'Voided')}
                            color={"danger"} className={classes.actionButton} key={id + "Voided"}>
                            <Icon>remove_circle_outline</Icon>
                        </Button>
                    </Tooltip>
                </React.Fragment>

            )

        }

        return button
    };

    const DisplayTable2 = () => {
        return (
            <DeliveryManagementTable
                // searchFilter={searchFilter}
                transactions={transactions}
                getTableHead={getTableHead}
                getTableBody={getTableBody2}
                // transactionsPagination={transactionsPagination}
                handleOnChangePage={handleOnChangePage}
                handleOnChangeRowsPerPage={handleOnChangeRowsPerPage}
            />
        )
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment/>
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Transaction List</h4>
                        </CardHeader>
                        <CardBody>
                            <Modal>
                                <Details2
                                    id={deliveryDetails.id}
                                    type={deliveryDetails.type}
                                />
                            </Modal>
                            {/* <div>
                                {
                                    JSON.stringify(transactionsPagination)
                                }
                            </div> */}
                            

                            {/* <CustomInput
                                id="regular"
                                inputProps={{
                                    type: "number",
                                    placeholder: "Search Tran Num",
                                    style: {
                                        maxWidth: '500px',
                                    },
                                    value: searchFilter,
                                    onChange: e => {
                                        const val = e.target.value
                                        // alert(val)
                                        setSearchFilter(val)
                                        // alert(JSON.stringify({val}))
                                        // setSearchFilter(e.target.value)
                                        // alert('there is you: ' + e.target.value)
                                    }
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> */}

                            {
                                searchLoading && <CircularProgress />
                            }

                            {
                                DisplayTable2()
                            }


                            {
                                // isLoadingFetchAll || isLoadingUpdatingDeliveryStatus ? <LinearLoading/> : renderTable()
                            }
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

        </div>
    );
};

export default DeliveryManagement2;
