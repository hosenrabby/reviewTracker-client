import React from 'react';
import Pagination from '@mui/material/Pagination';

const PagiantePage = ({data ,itemsPerPage ,setCurrentPage,currentPage}) => {

    const totalPage = Math.ceil(data/itemsPerPage)
    return (
        <div>
            <Pagination count={totalPage} page={currentPage} onChange={(event ,value )=>setCurrentPage(value)} variant="outlined" shape="rounded" color='primary' />
        </div>
    );
};

export default PagiantePage;