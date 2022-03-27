import React from 'react'
import {usePaginations, DOTS} from './usePaginations'

export const Pagination = ({
    paginationLoading, 
    currentPage,
    totalCount,
    pageSize,
    onChangePage,
    siblingCount,

}) => {
    
    const pageTotal = Math.ceil(totalCount/pageSize)
    
    const paginations = usePaginations({ 
        pageSize,
        totalCount,
        siblingCount,
        currentPage,
    })
   
    const onNext = () => {
        onChangePage(currentPage + 1)
    }
    const onPrev = () => {
        onChangePage(currentPage - 1)
    }
    if(totalCount < pageSize){
        return '';
    }
    return (
        <div className={`todo__paginations ${paginationLoading == true ? 'disabled' : ''}`}>
            <div 
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={onPrev}
            >
                Trước
            </div>
            
            <ul>
               
                {paginations.map((pageNum, index) => {

                    if(pageNum === DOTS){
                        return <li className="paginate-item dot" key={`dot${index}`}><span>...</span></li>
                    }

                    return (
                        <li 
                            key={index}
                            className={`paginate-item ${pageNum === currentPage ? 'current' : ''}`}
                            onClick={() => onChangePage(pageNum)}
                        >
                            <span>{pageNum}</span>
                        
                        </li>
                    )
                })}
            
             
            </ul>
            <div 
                className={`next ${currentPage === pageTotal ? 'disabled' : ''}`}
                onClick={onNext}
               >
                   Sau
            </div>
        </div>
    )
    
}

export default Pagination
