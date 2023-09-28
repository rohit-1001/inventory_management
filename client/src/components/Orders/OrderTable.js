import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    {
        field: 'date',
        headerName: 'Date',
        type: 'numeric',
        width: 130,
    },
    { field: 'customer', headerName: 'Customer', width: 150 },
    { field: 'saleschannel', headerName: 'Sales Channel', width: 150 },
    {
        field: 'count',
        headerName: 'Count',
        type: 'numeric',
        width: 120,
    },
    { field: 'status', headerName: 'Status', width: 130 },
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

export default function OrderTable(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.data}
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