function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
            item.cat.split(' ').some(word =>
            word.toLowerCase().startsWith(query)
        )
    );
}


// export = {filterItems};