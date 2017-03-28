export default (content) => {
	let tableHeader                    = "",
	    tableBody                      = "",
	    contentHeadr = "", contentBody = "";
	if (content instanceof Array) {
		contentBody = content
	} else {
		contentHeadr = content.header;
		contentBody  = content.body;
		contentHeadr.forEach(col => tableHeader += `<th style="width:88px;border:1px solid #444;padding:4px 8px;word-break:break-all; word-wrap:break-word;">${col}</th>`)
		tableHeader = `<tr style="border:1px solid #444;background: #333;color:#888" >${tableHeader}</tr>`
	}
	contentBody.forEach(row => {
		let tableCol = "";
		row.forEach(col => tableCol += `<td style="width:72px;border:1px solid #444;padding:4px 8px;word-break:break-all; word-wrap:break-word;">${col}</td>`)
		tableBody += `<tr style="border:1px solid #444" >${tableCol}</tr>`
	})
	return `<table style="border:1px solid #444;max-width: 100%;word-break:break-all; word-wrap:break-word;">${tableHeader}${tableBody}</table>`
}