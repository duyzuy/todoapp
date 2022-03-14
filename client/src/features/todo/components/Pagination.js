import React from 'react'

export const Pagination = ({
    paginationLoading, 
    totalPage, 
    currentPage,
    onSetCurrentpage, 
    getArrayFromPageTotalCount, 
    onChangePage,
    pageBound,
    upperPageBound,
    lowerPageBound,
}) => {
    
  
    const paginates = getArrayFromPageTotalCount();
    const pageTotal = totalPage()
  
    const newPagesPaginate = paginates.reduce((prevPage, current) => {
      
        if(current < current){
           
        } 
        console.log(prevPage)
        return prevPage + current;
    }, '')
    console.log(newPagesPaginate)
    const pageNum = paginates.map((paginate) => {
        return (
            
                <li className={currentPage === paginate + 1 ? 'current' : ''} key={paginate}>
                            <span onClick={() => onChangePage(paginate + 1)}>{paginate + 1}</span>
                </li>
        )
    })
  
    
  
    return (
        <div className={`todo__paginations ${paginationLoading == true ? 'disabled' : ''}`}>
            <div className={`prev ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => onSetCurrentpage('prev')}>Prev</div>
            
            <ul>
               
                {pageNum}
               
             
            </ul>
            <div 
                className={`next ${currentPage === pageTotal ? 'disabled' : ''}`}
                onClick={() => onSetCurrentpage('next')}>Next</div>
        </div>
    )
    
}

export default Pagination
