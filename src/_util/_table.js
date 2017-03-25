export default (content) => {
	let tableHeader, tableBody;
	let contentHeadr, contentBody;
	if (content instanceof Array) {
		contentBody = content
	} else {
		contentHeadr = content.header;
		contentBody  = content.body;
		contentHeadr.forEach(col => tableHeader += `<th style="padding:4px 8px">${col}</th>`)
		tableHeader = `<tr style="border:1px solid #444;background: #444;color:#666" >${tableHeader}</tr>`
	}
	contentBody.forEach(row => {
		let tableCol;
		row.forEach(col => tableCol += `<td style="border:1px solid #444;padding:4px 8px">${col}</td>`)
		tableBody += `<tr style="border:1px solid #444" >${tableCol}</tr>`
	})
	return ``
}