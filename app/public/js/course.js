function getPrevPage(preve_value, perPage) {
    location.href = `/course?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/course?page=${next_value}&perPage=${perPage}`;
}