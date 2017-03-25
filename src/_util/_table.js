export default (content) => {
	let tableRow = "";
	content.forEach(row => {
		let tableCol = "";
		row.forEach(col => {
			tableCol += `<td style="padding:2px 4px">${col}</td>`
		})
		tableRow += `<tr>${tableCol}</tr>`
	})
	
	return `<table style="border:1px solid #999">${tableRow}</table>`
}