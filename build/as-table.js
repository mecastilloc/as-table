"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const O = Object;

var _require = require('printable-characters');

const first = _require.first,
      strlen = _require.strlen,
      limit = (s, n) => first(s, n - 1) + '…';

const asColumns = (rows, cfg_) => {

    const zip = (arrs, f) => arrs.reduce((a, b) => b.map((b, i) => [].concat(_toConsumableArray(a[i] || []), [b])), []).map(args => f.apply(undefined, _toConsumableArray(args))),


    /*  Convert cell data to string (converting multiline text to singleline) */

    cells = rows.map(r => r.map(c => c === undefined ? '' : cfg_.print(c).replace(/\n/g, '\\n'))),


    /*  Compute column widths (per row) and max widths (per column)     */

    cellWidths = cells.map(r => r.map(strlen)),
          maxWidths = zip(cellWidths, Math.max),


    /*  Default config     */

    cfg = O.assign({
        delimiter: '  ',
        minColumnWidths: maxWidths.map(x => 0),
        maxTotalWidth: 0 }, cfg_),
          delimiterLength = strlen(cfg.delimiter),


    /*  Project desired column widths, taking maxTotalWidth and minColumnWidths in account.     */

    totalWidth = maxWidths.reduce((a, b) => a + b, 0),
          relativeWidths = maxWidths.map(w => w / totalWidth),
          maxTotalWidth = cfg.maxTotalWidth - delimiterLength * (maxWidths.length - 1),
          excessWidth = Math.max(0, totalWidth - maxTotalWidth),
          computedWidths = zip([cfg.minColumnWidths, maxWidths, relativeWidths], (min, max, relative) => Math.max(min, Math.floor(max - excessWidth * relative))),


    /*  This is how many symbols we should pad or cut (per column).  */

    restCellWidths = cellWidths.map(widths => zip([computedWidths, widths], (a, b) => a - b));

    /*  Perform final composition.   */

    return zip([cells, restCellWidths], (a, b) => zip([a, b], (str, w) => w >= 0 ? str + ' '.repeat(w) : limit(str, strlen(str) + w)).join(cfg.delimiter));
};

const asTable = cfg => O.assign(arr => {
    var _ref;

    /*  Print arrays  */

    if (arr[0] && Array.isArray(arr[0])) return asColumns(arr, cfg).join('\n');

    /*  Print objects   */

    const colNames = [].concat(_toConsumableArray(new Set((_ref = []).concat.apply(_ref, _toConsumableArray(arr.map(O.keys)))))),
          columns = [colNames.map(cfg.title)].concat(_toConsumableArray(arr.map(o => colNames.map(key => o[key])))),
          lines = asColumns(columns, cfg);

    return [lines[0], cfg.dash.repeat(strlen(lines[0]))].concat(_toConsumableArray(lines.slice(1))).join('\n');
}, cfg, {

    configure: newConfig => asTable(O.assign({}, cfg, newConfig))
});

module.exports = asTable({

    maxTotalWidth: Number.MAX_SAFE_INTEGER,
    print: String,
    title: String,
    dash: '-'
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTZDQSxNQUFNLFVBQVUsT0FBTyxFQUFFLE1BQUYsQ0FBVSxPQUFPO0FBQUE7O0FBRXhDOztBQUVJLFFBQUksSUFBSSxDQUFKLEtBQVUsTUFBTSxPQUFOLENBQWUsSUFBSSxDQUFKLENBQWYsQ0FBZCxFQUNJLE9BQU8sVUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBQTJCLElBQTNCLENBQVA7O0FBRVI7O0FBRUksVUFBTSx3Q0FBc0IsSUFBSSxHQUFKLENBQVMsWUFBRyxNQUFILGdDQUFjLElBQUksR0FBSixDQUFTLEVBQUUsSUFBWCxDQUFkLEVBQVQsQ0FBdEIsRUFBTjtBQUFBLFVBQ00sV0FBbUIsU0FBUyxHQUFULENBQWMsSUFBSSxLQUFsQixDQUFuQiw0QkFBZ0QsSUFBSSxHQUFKLENBQVMsS0FBSyxTQUFTLEdBQVQsQ0FBYyxPQUFPLEVBQUUsR0FBRixDQUFyQixDQUFkLENBQWhELEVBRE47QUFBQSxVQUVNLFFBQWtCLFVBQVcsT0FBWCxFQUFvQixHQUFwQixDQUZ4Qjs7QUFJQSxXQUFPLENBQUMsTUFBTSxDQUFOLENBQUQsRUFBVyxJQUFJLElBQUosQ0FBUyxNQUFULENBQWlCLE9BQVEsTUFBTSxDQUFOLENBQVIsQ0FBakIsQ0FBWCw0QkFBbUQsTUFBTSxLQUFOLENBQWEsQ0FBYixDQUFuRCxHQUFvRSxJQUFwRSxDQUEwRSxJQUExRSxDQUFQO0FBRUgsQ0Fmc0IsRUFlcEIsR0Fmb0IsRUFlZjs7QUFFSixlQUFXLGFBQWEsUUFBUyxFQUFFLE1BQUYsQ0FBVSxFQUFWLEVBQWMsR0FBZCxFQUFtQixTQUFuQixDQUFUO0FBRnBCLENBZmUsQ0FBdkI7O0FBb0JBLE9BQU8sT0FBUCxHQUFpQixRQUFTOztBQUV0QixtQkFBZSxPQUFPLGdCQUZBO0FBR3RCLFdBQU8sTUFIZTtBQUl0QixXQUFPLE1BSmU7QUFLdEIsVUFBTTtBQUxnQixDQUFULENBQWpCIiwiZmlsZSI6ImFzLXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IE8gPSBPYmplY3RcbiAgICAsIHsgZmlyc3QsIHN0cmxlbiB9ID0gcmVxdWlyZSAoJ3ByaW50YWJsZS1jaGFyYWN0ZXJzJykgLy8gaGFuZGxlcyBBTlNJIGNvZGVzIGFuZCBpbnZpc2libGUgY2hhcmFjdGVyc1xuICAgICwgbGltaXQgPSAocywgbikgPT4gKGZpcnN0IChzLCBuIC0gMSkgKyAn4oCmJylcblxuY29uc3QgYXNDb2x1bW5zID0gKHJvd3MsIGNmZ18pID0+IHtcbiAgICBcbiAgICBjb25zdFxuXG4gICAgICAgIHppcCA9IChhcnJzLCBmKSA9PiBhcnJzLnJlZHVjZSAoKGEsIGIpID0+IGIubWFwICgoYiwgaSkgPT4gWy4uLmFbaV0gfHwgW10sIGJdKSwgW10pLm1hcCAoYXJncyA9PiBmICguLi5hcmdzKSksXG5cbiAgICAvKiAgQ29udmVydCBjZWxsIGRhdGEgdG8gc3RyaW5nIChjb252ZXJ0aW5nIG11bHRpbGluZSB0ZXh0IHRvIHNpbmdsZWxpbmUpICovXG5cbiAgICAgICAgY2VsbHMgICAgICAgICAgID0gcm93cy5tYXAgKHIgPT4gci5tYXAgKGMgPT4gKGMgPT09IHVuZGVmaW5lZCkgPyAnJyA6IGNmZ18ucHJpbnQgKGMpLnJlcGxhY2UgKC9cXG4vZywgJ1xcXFxuJykpKSxcblxuICAgIC8qICBDb21wdXRlIGNvbHVtbiB3aWR0aHMgKHBlciByb3cpIGFuZCBtYXggd2lkdGhzIChwZXIgY29sdW1uKSAgICAgKi9cblxuICAgICAgICBjZWxsV2lkdGhzICAgICAgPSBjZWxscy5tYXAgKHIgPT4gci5tYXAgKHN0cmxlbikpLFxuICAgICAgICBtYXhXaWR0aHMgICAgICAgPSB6aXAgKGNlbGxXaWR0aHMsIE1hdGgubWF4KSxcblxuICAgIC8qICBEZWZhdWx0IGNvbmZpZyAgICAgKi9cblxuICAgICAgICBjZmcgICAgICAgICAgICAgPSBPLmFzc2lnbiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcjogJyAgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5Db2x1bW5XaWR0aHM6IG1heFdpZHRocy5tYXAgKHggPT4gMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG90YWxXaWR0aDogMCB9LCBjZmdfKSxcblxuICAgICAgICBkZWxpbWl0ZXJMZW5ndGggPSBzdHJsZW4gKGNmZy5kZWxpbWl0ZXIpLFxuXG4gICAgLyogIFByb2plY3QgZGVzaXJlZCBjb2x1bW4gd2lkdGhzLCB0YWtpbmcgbWF4VG90YWxXaWR0aCBhbmQgbWluQ29sdW1uV2lkdGhzIGluIGFjY291bnQuICAgICAqL1xuXG4gICAgICAgIHRvdGFsV2lkdGggICAgICA9IG1heFdpZHRocy5yZWR1Y2UgKChhLCBiKSA9PiBhICsgYiwgMCksXG4gICAgICAgIHJlbGF0aXZlV2lkdGhzICA9IG1heFdpZHRocy5tYXAgKHcgPT4gdyAvIHRvdGFsV2lkdGgpLFxuICAgICAgICBtYXhUb3RhbFdpZHRoICAgPSBjZmcubWF4VG90YWxXaWR0aCAtIChkZWxpbWl0ZXJMZW5ndGggKiAobWF4V2lkdGhzLmxlbmd0aCAtIDEpKSxcbiAgICAgICAgZXhjZXNzV2lkdGggICAgID0gTWF0aC5tYXggKDAsIHRvdGFsV2lkdGggLSBtYXhUb3RhbFdpZHRoKSxcbiAgICAgICAgY29tcHV0ZWRXaWR0aHMgID0gemlwIChbY2ZnLm1pbkNvbHVtbldpZHRocywgbWF4V2lkdGhzLCByZWxhdGl2ZVdpZHRoc10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1pbiwgbWF4LCByZWxhdGl2ZSkgPT4gTWF0aC5tYXggKG1pbiwgTWF0aC5mbG9vciAobWF4IC0gZXhjZXNzV2lkdGggKiByZWxhdGl2ZSkpKSxcblxuICAgIC8qICBUaGlzIGlzIGhvdyBtYW55IHN5bWJvbHMgd2Ugc2hvdWxkIHBhZCBvciBjdXQgKHBlciBjb2x1bW4pLiAgKi9cblxuICAgICAgICByZXN0Q2VsbFdpZHRocyAgPSBjZWxsV2lkdGhzLm1hcCAod2lkdGhzID0+IHppcCAoW2NvbXB1dGVkV2lkdGhzLCB3aWR0aHNdLCAoYSwgYikgPT4gYSAtIGIpKVxuXG4gICAgLyogIFBlcmZvcm0gZmluYWwgY29tcG9zaXRpb24uICAgKi9cblxuICAgICAgICByZXR1cm4gemlwIChbY2VsbHMsIHJlc3RDZWxsV2lkdGhzXSwgKGEsIGIpID0+XG4gICAgICAgICAgICAgICAgemlwIChbYSwgYl0sIChzdHIsIHcpID0+ICh3ID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHN0ciArICcgJy5yZXBlYXQgKHcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsaW1pdCAoc3RyLCBzdHJsZW4gKHN0cikgKyB3KSkpLmpvaW4gKGNmZy5kZWxpbWl0ZXIpKVxufVxuXG5jb25zdCBhc1RhYmxlID0gY2ZnID0+IE8uYXNzaWduIChhcnIgPT4ge1xuXG4vKiAgUHJpbnQgYXJyYXlzICAqL1xuXG4gICAgaWYgKGFyclswXSAmJiBBcnJheS5pc0FycmF5IChhcnJbMF0pKVxuICAgICAgICByZXR1cm4gYXNDb2x1bW5zIChhcnIsIGNmZykuam9pbiAoJ1xcbicpXG5cbi8qICBQcmludCBvYmplY3RzICAgKi9cblxuICAgIGNvbnN0IGNvbE5hbWVzICAgICAgICA9IFsuLi5uZXcgU2V0IChbXS5jb25jYXQgKC4uLmFyci5tYXAgKE8ua2V5cykpKV0sXG4gICAgICAgICAgY29sdW1ucyAgICAgICAgID0gW2NvbE5hbWVzLm1hcCAoY2ZnLnRpdGxlKSwgLi4uYXJyLm1hcCAobyA9PiBjb2xOYW1lcy5tYXAgKGtleSA9PiBvW2tleV0pKV0sXG4gICAgICAgICAgbGluZXMgICAgICAgICAgID0gYXNDb2x1bW5zIChjb2x1bW5zLCBjZmcpXG5cbiAgICByZXR1cm4gW2xpbmVzWzBdLCBjZmcuZGFzaC5yZXBlYXQgKHN0cmxlbiAobGluZXNbMF0pKSwgLi4ubGluZXMuc2xpY2UgKDEpXS5qb2luICgnXFxuJylcblxufSwgY2ZnLCB7XG5cbiAgICBjb25maWd1cmU6IG5ld0NvbmZpZyA9PiBhc1RhYmxlIChPLmFzc2lnbiAoe30sIGNmZywgbmV3Q29uZmlnKSksXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzVGFibGUgKHtcblxuICAgIG1heFRvdGFsV2lkdGg6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIHByaW50OiBTdHJpbmcsXG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICBkYXNoOiAnLSdcbn0pIl19