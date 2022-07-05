const createItemPagination = (hrefLink, textContent, active) => {
    const li = document.createElement('li');
    li.className = 'pagination__item';

    const a = document.createElement('a');
    a.className = 'pagination__link';
    a.textContent = textContent;
    a.href = hrefLink;

    if (active) {
        a.classList.add('pagination__link_active');
    }

    li.append(a);

    return li;
}

export const pagination = (wrapper, pages, page, count) => {
    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination__list';

    const isNotStart = (page - Math.floor(count / 2)) > 1;
    const isEnd = (page + Math.floor(count / 2)) > pages;

    const list = [];

    if (count > pages) {
        count = pages;
    }

    for (let i = 0; i < count; i++) {
        let n = i + 1;

        if (isNotStart) {
            if (isEnd) {
                n = pages - count + i + 1;
            } else {
                n = page - Math.floor(count / 2) + i;
            }
        }

        const li = createItemPagination(`index.html?page=${n}`, n, page === n)

        paginationList.append(li);
    }

    const arrowLeft = `
        <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
            <path d="M9.09204 2.49205L3.59604 8.00005L9.09204 13.508L7.40004 15.2L0.200041 8.00005L7.40004 0.800049L9.09204 2.49205Z" />
        </svg>
        `;
    const arrowRight = `
        <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.907959 2.49205L6.40396 8.00005L0.907959 13.508L2.59996 15.2L9.79996 8.00005L2.59996 0.800049L0.907959 2.49205Z" />
        </svg>
        `;

    const firstItem = document.createElement('a');
    firstItem.classList.add('pagination__arrow', 'pagination__arrow_start');
    firstItem.setAttribute('aria-label', 'перейти на первую страницу');
    firstItem.href = isNotStart ? 'index.html' : '';
    firstItem.innerHTML = arrowLeft;

    const lastItem = document.createElement('a');
    lastItem.classList.add('pagination__arrow', 'pagination__arrow_end');
    lastItem.setAttribute('aria-label', 'перейти на последнюю страницу');
    lastItem.href = isEnd ? '' : `index.html?page=${pages}`;
    lastItem.innerHTML = arrowRight;

    wrapper.append(firstItem, paginationList, lastItem);
};