import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductDetailsButton from './ProductDetailsButton';
import ShowInfo from './ShowInfo';
import { Button } from "@mui/material";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
      const c = await axios.post('/acceptRequest', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }
  const rejectRequest = async (id) => {
    try {
      const c = await axios.post('/rejectRequest', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }
  const dispatchRequest = async (id) => {
    try {
      const c = await axios.post('/dispatchRequest', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }

  const confirmationPending = async (id) => {
    try {
      const c = await axios.post('/confirmationPending', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }

  // Vendor
  const revokeRequest = async (id) => {
    try {
      const c = await axios.post('/revokeRequest', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }
  const confirmDelivery = async (id) => {
    try {
      const c = await axios.post('/confirmDelivery', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      }
    }
    props.data.setCall(true)
  }
  const declineConfirmation = async (id) => {
    try {
      const c = await axios.post('/declineConfirmation', { id }, {
        withCredentials: true,
      });
      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
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
    { field: 'id', headerName: 'ID', width: 250, align: 'center', headerAlign: 'center', },
    {
      field: props.data.role === "vendor" ? 'c_email' : 'v_email',
      headerName: props.data.role === "vendor" ? 'Company Email' : 'Vendor Email',
      width: 250,
      align: 'center',
      renderCell: (params) => (
        <ShowInfo email={props.data.role === "vendor" ? params.row.c_email : params.row.v_email} />
      ),
      headerAlign: 'center',
    },
    {
      field: 'products',  // Placeholder for button/dropdown
      headerName: 'Products',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ProductDetailsButton products={params.row.products} />
      ),
    },
    // {
    //     field: 'hiddenProducts',  // Hidden column for actual product data
    //     headerName: 'Products',
    //     hide: true,
    // },
    { field: 'status', headerName: 'Status', width: 150, align: 'center', headerAlign: 'center', },
    props.data.role === "vendor" ? {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      headerWidth: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = params.row.status;

        switch (status) {
          case 'Requested':
            return (
              <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <Button
                  className="link_in_table"
                  onClick={() => {
                    revokeRequest(params.row.id);
                  }}
                  style={{
                    color: "red",
                  }}
                >
                  Revoke
                </Button>
              </div>
            );
          case 'Confirmation pending':
            return (
              <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <Button
                  className="link_in_table"
                  onClick={() => {
                    confirmDelivery(params.row.id);
                  }}
                  style={{
                    color: "green",
                  }}
                >
                  Confirm
                </Button>
                <Button
                  className="link_in_table"
                  onClick={() => {
                    declineConfirmation(params.row.id);
                  }}
                  style={{
                    color: "red",
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
      width: 250,
    } :
      {
        field: 'action',
        headerName: 'Action',
        headerAlign: 'center',
        headerWidth: 200,
        align: 'center',
        renderCell: (params) => {
          const status = params.row.status;

          switch (status) {
            case 'Requested':
              return (
                <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                  <Button
                    className="link_in_table"
                    onClick={() => {
                      acceptRequest(params.row.id);
                    }}
                    style={{
                      color: "green",

                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    className="link_in_table"
                    onClick={() => {
                      rejectRequest(params.row.id);
                    }}
                    style={{
                      color: "red",

                    }}
                  >
                    Reject
                  </Button>
                </div>
              );
            case 'Accepted':
              return (
                <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                  <Button
                    className="link_in_table"
                    onClick={() => {
                      dispatchRequest(params.row.id);
                    }}
                    style={{
                      color: "green",
                    }}
                  >
                    Dispatch
                  </Button>
                </div>
              );
            case 'Dispatched':
              return (
                <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                  <Button
                    className="link_in_table"
                    onClick={() => {
                      confirmationPending(params.row.id);
                    }}
                    style={{
                      color: "green",

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