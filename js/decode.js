var mxEdgeHandler = function () {
}
mxEdgeHandler.prototype.destroy = function (...args) {
}
var mxVertexHandler = function () {
}
mxVertexHandler.prototype.destroy = function (...args) {
}
mxVertexHandler.prototype.mouseMove = function (...args) {
}
var mxRubberband = function () {
}
var mxGuide = function () {
}
var mxOutline = function () {
}
var mxDragSource = function () {
}
var mxEdgeSegmentHandler = function () {
}
var mxSelectionCellsHandler = function () {
}
mxSelectionCellsHandler.prototype.refresh = function (...args) {
}

function createXmlDocument() {
    var doc = null;

    if (document.implementation && document.implementation.createDocument) {
        doc = document.implementation.createDocument('', '', null);
    } else if (window.ActiveXObject) {
        doc = new ActiveXObject('Microsoft.XMLDOM');
    }

    return doc;
}

function parseXml(xml) {
    if (window.DOMParser) {
        var parser = new DOMParser();
        return parser.parseFromString(xml, 'text/xml');
    } else {
        var result = createXmlDocument();

        result.async = 'false';
        result.loadXML(xml);

        return result;
    }
}

function getTextContent(node) {
    return (node != null) ? node[ (node.textContent === undefined) ? 'text' : 'textContent' ] : '';
}

function decode(data) {
    try {
        var node = parseXml(data).documentElement;
        if (node != null && node.nodeName == 'mxfile') {
            var diagrams = node.getElementsByTagName('diagram');

            if (diagrams.length > 0) {
                data = getTextContent(diagrams[ 0 ]);
                data = atob(data);
                data = pako.inflateRaw(Uint8Array.from(data, c => c.charCodeAt(0)), { to: 'string' });
                data = decodeURIComponent(data);
                return data;
            }
        }
    } catch (e) {
        console.log(e)
        // ignore
    }
}
