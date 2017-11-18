
var debug='';
//var debug='http://localhost:9090';
var query_url = debug+'/rest/products?status';


function queryData() {
	var condition = new Object();
	condition.status = "";
	$.ajax({
		type: "GET",
		url: query_url,
		timeout: 3000,
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			console.log(data);
			initDoingTable(data);
			initTodoTable(data);
		},
		error: function(msg) {
			swal({title:'刷新系统后台数据',text:'刷新失败',timer:3000,showConfirmButton:false,type:'error'});
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
		"bLengthChange": false,
		"searching": false,
		"bAutoWidth": true,
		"destroy": true,
		"columns": [{
                "title": "编号",
                "data": "id",
                "width": "40px"
            },
            {
				"title": "名称",
				"data": "name",
				"width": "20%"
			},
			{
				"title": "厂家",
				"data": "factory",
				"width": "20%"
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
				"data": "number",
				"width": "60px"
			},
			{
				"title": "交货时间",
				"data": "toCustomerTime"
			},
			{
				"title": "生产顺序",
				"data": "makeOrder",
				"width": "80px"
			}
		],
		"order": [[7, 'asc' ]],
		"oLanguage": {
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sZeroRecords": "对不起，查询不到任何相关数据",
			"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
			"sInfoEmtpy": "找不到相关数据",
			"sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
			"sProcessing": "正在加载中...",
			"sSearch": "搜索",
			"oPaginate": {
				"sFirst": "第一页",
				"sPrevious": " 上一页 ",
				"sNext": " 下一页 ",
				"sLast": " 最后一页 "
			},
		},
		"aLengthMenu": [
			[8, 20, 100, -1],
			[8, 20, 100, "All"]
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
setInterval("queryData()", 10000);
