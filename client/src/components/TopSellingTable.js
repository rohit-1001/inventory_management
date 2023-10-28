
// This component is used to display the Top Selling Products table in the Vendor Dashboard

import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'pid', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200 },
    { field: 'sales', headerName: 'Sales(₹)', width: 200 },
];

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

export default function TopSellingTable(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    return (
        <div style={{ height: "100%", width: '100%' }}>
            <DataGrid
                rows={props.data}
                columns={columns}
                components={{
                    Toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                onSelectionModelChange={handleSelection}
                selectionModel={selectionModel}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
