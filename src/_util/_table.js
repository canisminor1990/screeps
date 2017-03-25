export default (content) => {
	let tableRow = "";
	content.forEach(row => {
		let tableCol = "";
		row.forEach(col => {
			tableCol += `<td style="border:1px solid #444;padding:2px 4px">${col}</td>`
		})
		tableRow += `<tr style="border:1px solid #444" >${tableCol}</tr>`
	})
	return `<table style="border:1px solid #444">${tableRow}</table>`
}