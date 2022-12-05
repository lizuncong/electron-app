function format(str, arr) {
    let result = '';
    let idx;
    str.split('').forEach(s => {
        if (s !== '{' && !idx) {
            result = result + s
        } else {
            idx = (idx || '') + s
            if (idx[0] === '{' && idx[idx.length - 1] === '}') {
                result = result + arr[Number(idx.slice(1, idx.length - 1))];
                idx = void 0;
            }
        }
    })
    return result;
}

console.log(format('Hello {0}, Welcome to {1}', ['a', 'b']))