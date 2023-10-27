import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductDetailsButton from './ProductDetailsButton';
import { TextField, Button } from "@mui/material";
import axios from 'axios'

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <GridToolbarDensitySelector />
            <IconButton color="primary" aria-label="delete selected rows" component="span">
                <DeleteIcon />
            </IconButton>
        </GridToolbarContainer>
    );
}

export default function OrderTable(props) {
    // Company
    const acceptRequest = async (id) => {
        try {
            const c = await axios.post('/acceptRequest', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }
    const rejectRequest = async (id) => {
        try {
            const c = await axios.post('/rejectRequest', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }
    const dispatchRequest = async (id) => {
        try {
            const c = await axios.post('/dispatchRequest', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }

    const confirmationPending = async (id) => {
        try {
            const c = await axios.post('/confirmationPending', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }

    // Vendor
    const revokeRequest = async (id) => {
        try {
            const c = await axios.post('/revokeRequest', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }
    const confirmDelivery = async (id) => {
        try {
            const c = await axios.post('/confirmDelivery', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }
    const declineConfirmation = async (id) => {
        try {
            const c = await axios.post('/declineConfirmation', {id}, {
                withCredentials: true,
            });
            if(c.status===200){
                alert(c.data.msg)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.error)
            }
        }
        props.data.setCall(true)
    }

    const columns = [
        // {
        //     field: 'date',
        //     headerName: 'Date',
        //     type: 'numeric',
        //     width: 230,
        // },
        { field: 'id', headerName: 'ID', width: 250 },
        { field: props.data.role==="vendor" ? 'c_email' : 'v_email', headerName: props.data.role==="vendor" ? 'Company Email' : 'Vendor Email', width: 250 },
        // { field: 'products', headerName: 'Products', width: 250 },
        // {
        //     field: 'count',
        //     headerName: 'Count',
        //     type: 'numeric',
        //     width: 230,
        // },
        {
            field: 'products',  // Placeholder for button/dropdown
            headerName: 'Products',
            width: 170,
            renderCell: (params) => (
                <ProductDetailsButton products={params.row.products} />
            ),
        },
        // {
        //     field: 'hiddenProducts',  // Hidden column for actual product data
        //     headerName: 'Products',
        //     hide: true,
        // },
        { field: 'status', headerName: 'Status', width: 150 },
        props.data.role==="vendor" ? {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            headerWidth: 200,
            renderCell: (params) => {
                const status = params.row.status;
          
                switch (status) {
                  case 'Requested':
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            className="link_in_table"
                            onClick={() => {
                              revokeRequest(params.row.id);
                            }}
                          >
                            Revoke
                          </Button>
                        </div>
                      );
                  case 'Confirmation pending':
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            confirmDelivery(params.row.id);
                          }}
                        >
                          Confirm
                        </Button>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            declineConfirmation(params.row.id);
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    );
                  default:
                    return null;
                }
              },
            width: 350,
        } :
        {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            headerWidth: 200,
            renderCell: (params) => {
                const status = params.row.status;
          
                switch (status) {
                  case 'Requested':
                    return (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            acceptRequest(params.row.id);
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            rejectRequest(params.row.id);
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    );
                  case 'Accepted':
                    return (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            dispatchRequest(params.row.id);
                          }}
                        >
                          Dispatch
                        </Button>
                      </div>
                    );
                  case 'Dispatched':
                    return (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          className="link_in_table"
                          onClick={() => {
                            confirmationPending(params.row.id);
                          }}
                        >
                          Request Confirmation
                        </Button>
                      </div>
                    );
                  default:
                    return null;
                }
              },
            width: 200,
          },
    ];
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={props.data.rows}
                columns={columns}
                components={{
                    Toolbar: CustomToolbar,
                }}
                onSelectionModelChange={handleSelection}
                selectionModel={selectionModel}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                // pagination
                // pageSize={5}
                checkboxSelection
            />
        </div>
    );
}