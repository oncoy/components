/**
 * Created by xcp on 2016/3/15.
 *
 * from jquery-1.9.1
 */

module.exports = function (a, b) {
    var c = a.nodeType === 9 ? a.documentElement : a;

    return a === b || !!(b && b.nodeType === 1 && (
            c.contains ?
                c.contains(b) :
            a.compareDocumentPosition && a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINED_BY
        ))
};