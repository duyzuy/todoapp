import { useMemo } from "react";


const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({length}, (value, index) => start + index)
}

export const DOTS = '...'

export const usePaginations = ({
    pageSize,
    totalCount,
    siblingCount = 1,
    currentPage,
}) => {

    const paginationRange = useMemo( () => {

        const totalPageCount = Math.ceil(totalCount/pageSize)

        // total pagenum when showing: siblingCount + lastIndex + firstIndex + 2*Dots + currentPage
        const totalPageNumbers = siblingCount + 5

        if(totalCount < pageSize){
            return [];
        }
        if(totalPageCount < totalPageNumbers){
            return range(1, totalPageCount)
        }
        //case 1 if the number of page is less than the page numbers want to show in pagination component.
        if(totalCount <= totalPageNumbers){

            return range(1, totalCount)
        }

        
        //calculate right and left sibling
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const firstPageIndex = 1;
        const lastPqageIndex = totalPageCount

        const shouldShowLeftDots = leftSiblingIndex > 2 
        const shouldShowRightDots = totalPageCount - 2 > rightSiblingIndex

        //case 2: no left dot show, but right dots show
        if(!shouldShowLeftDots && shouldShowRightDots){
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, lastPqageIndex]
        }

        //case 3: right dots no show but left dots show

        if(!shouldShowRightDots && shouldShowLeftDots){
            let rightItemCount = totalPageCount - (3 + 2 * siblingCount)
            let rightRange = range(rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        //case 4 show boths left and right

        if(shouldShowLeftDots && shouldShowRightDots){
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPqageIndex]
        }


    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange;
}