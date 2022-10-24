import React, { FC } from 'react';

interface IPaginationProps {
    page: number;
    count: number;
    siblingCount?: number;
    boundaryCount?: number;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    hidePrevButton?: boolean;
    hideNextButton?: boolean;
};

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({
        length
    }, (_, i) => start + i);
};

const Pagination: FC<IPaginationProps> = ({ page, count, siblingCount = 1, boundaryCount = 1, showFirstButton = true, showLastButton = true, hidePrevButton = true, hideNextButton = true }) => {




    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
    const siblingsStart = Math.max(Math.min( // Natural start
        page - siblingCount, // Lower boundary when page is high
        count - boundaryCount - siblingCount * 2 - 1), // Greater than startPages
        boundaryCount + 2);
    const siblingsEnd = Math.min(Math.max( // Natural end
        page + siblingCount, // Upper boundary when page is low
        boundaryCount + siblingCount * 2 + 2), // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : count - 1); // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']

    const itemList = [...(showFirstButton ? ['first'] : []), ...(hidePrevButton ? [] : ['previous']), ...startPages, // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []), // Sibling pages
    ...range(siblingsStart, siblingsEnd), // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []), ...endPages, ...(hideNextButton ? [] : ['next']), ...(showLastButton ? ['last'] : [])]; // Map the button type to its page number

    return (
        <div>

        </div>
    );
};

export default Pagination;