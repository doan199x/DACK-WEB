
module.exports = {
    pagination(objects, page, perPage, rows) {
        var pages = Math.floor(rows / perPage)
        var pageNumbers = [];
        if (rows % perPage > 0) {
            pages++;
        }
        if (page < 1) {
            page = 1;
        }
        if (page > pages) {
            page = pages;
        }
        var start = (page - 1) * perPage;
        var end = page * perPage;
        for (var i = 0; i <= pages; i++) {
            pageNumbers.push({
                value: i,
                isCurrentPage: i === +page
            })
        }
        var prev_value = (+page - 1 != 0) ? +page - 1 : 1;
        var next_value = (+page + 1 != pages + 1) ? +page + 1 : pages;
        return result = {
            objectOnPage: objects.slice(start, end),
            preve_value: prev_value,
            next_value: next_value,
            pageNumbers: pageNumbers
        }
    }
};
