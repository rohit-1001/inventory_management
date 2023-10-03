import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'date',
        headerName: 'Date',
        type: 'numeric',
        width: 200,
    },
    { field: 'vendor', headerName: 'Vendor', width: 200 },
    { field: 'productName', headerName: 'Product Name', width: 200 },
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

export default function ProductTable(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    return (
        <div style={{ height: 700, width: '100%' }}>
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
