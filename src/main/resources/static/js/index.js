function queryData() {
	var condition = new Object();
	condition.status = "";
	$.ajax({
		type: "GET",
		//url: "http://localhost:9090/rest/products?status",
		url: "/rest/products?status",
		timeout: 3000,
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			console.log(data);
			initDoingTable(data);
			initTodoTable(data);
		},
		error: function(msg) {
			alert("system error...");
		}
	});
};

function initDoingTable(rows, table, status) {
	initTable(rows, 'doing-table', '2');
}

function initTodoTable(rows) {
	initTable(rows, 'todo-table', '1');
}

function initTable(rows, table, status) {
	var data = new Array();
	rows.forEach(function(row, index) {
		if(row.status === status) {
			data.push(row);
		}
	});

	$('#' + table).DataTable({
		"data": data,
		"bAutoWidth": true,
		"destroy":true,
		"columns": [{
				"title": "名称",
				"data": "name"
			},
			{
				"title": "厂家",
				"data": "factory"
			},
			{
				"title": "材料",
				"data": "material"
			},
			{
				"title": "工艺类型",
				"data": "type"
			},
			{
				"title": "数量",
				"data": "number"
			},
			{
				"title": "交货时间",
				"data": "toCustomerTime"
			},
			{
				"title": "生产顺序",
				"data": "makeOrder"
			}
		]
	});
}

function showTime() {
	nowtime = new Date();
	year = nowtime.getFullYear();
	month = nowtime.getMonth() + 1;
	date = nowtime.getDate();
	document.getElementById("current-time").innerText = year + "年" + month + "月" + date + "日                 " + nowtime.toLocaleTimeString();
};

setInterval("this.showTime()", 1000);
queryData();
setInterval("queryData()", 5000);