return function getHost(headers) {
    return getHeader(headers, ':authority') || getHeader(headers, 'host');
}