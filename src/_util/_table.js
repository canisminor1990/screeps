export default (content) => {
	let tableHeader, tableBody;
	let contentHeadr, contentBody;
	if (content instanceof Array) {
		contentBody = content
	} else {
		contentHeadr    = content.header;
		contentBody     = content.body;
		contentHeadr.forEach(col => tableHeader += `<th>${col}</th>`)
		tableHeader = `<tr style="border:1px solid #444;background: #444" >${tableHeader}</tr>`
	}
	contentBody.forEach(row => {
		row.forEach(col => tableCol += `<td style="border:1px solid #444;padding:2px 4px">${col}</td>`)
		tableBody += `<tr style="border:1px solid #444" >${tableCol}</tr>`
	})
	return `<table style="border:1px solid #444">${tableHeader}${tableBody}</table>`
}