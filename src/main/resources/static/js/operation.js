
var debug='';
//var debug='http://localhost:9090';

var add_mod_del_url = debug+'/rest/product';
var bulk_mod_url = debug+'/rest/product';
var query_url = debug+'/rest/products?status';

var table;



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
			initTable(data);
		},
		error: function(msg) {
			swal({
				title: '刷新系统后台数据',
				text: '刷新失败',
				timer: 2000,
				showConfirmButton: false,
				type: 'error'
			});
		}
	});
};

function initTable(rows) {
	table = $('#all-table').DataTable({
		"data": rows,
		"bAutoWidth": true,
		"destroy": true,
		"columns": [{
				"title": "编号",
				"data": "id",
				"width": "30px"
			}, {
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
				"width": "30px"
			},
			{
				"title": "交货时间",
				"data": "toCustomerTime"
			},
			{
				"title": "状态",
				"data": "status"
			},
			{
				"title": "生产顺序",
				"data": "makeOrder",
				"width": "60px"
			},
			{
				"title": "创建时间",
				"data": "createTime"
			},
			{
				"title": "操作",
				"data": null,
				"width": "80px"
			}
		],
		"order": [
			[9, 'desc']
		],
		"columnDefs": [
			{
                "render": function ( data, type, row ) {
                    return cvtStatusToDisplay(data, type, row);
                },
                "targets": 7
            },
			{
			"targets": -1,
			"defaultContent": "<button id='edit' class='btn btn-primary'><span class='glyphicon glyphicon-edit'></button> " +
				"<button id='delete' class='btn btn-warning'><span class='glyphicon glyphicon-remove'></button> "
		}],

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
			[10, 30, 100, -1],
			[10, 30, 100, "All"]
		]
	});
}

function cvtStatusToDisplay(data, type, row){
	switch(data){
		case '0':
			return '进场';
		case '1':
			return '等待生产';
		case '2':
			return '生产中';
		case '3':
			return '生产完成';
		case '4':
			return '已交货';
	}
	return '进场';
}

function addSubmit() {
	var product = getFormData('add-dialog');

	$.ajax({
		type: "PUT",
		url: add_mod_del_url,
		//url: "/rest/products?status",
		data: JSON.stringify(product),
		timeout: 3000,
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			if('200' === data) {
				swal({
					title: '产品信息:'+product.name,
					text: '提交成功',
					timer: 2000,
					showConfirmButton: false,
					type: 'success'
				});
				queryData();
				$('#add-dialog').modal('hide');
			} else {
				swal({
					title: data,
					text: '提交失败',
					showConfirmButton: true,
					type: 'error'
				});
			}
		},
		error: function(msg) {
			swal({
				title: '产品信息:' + product.name,
				text: '提交失败',
				showConfirmButton: true,
				type: 'error'
			});
		}
	});
}

function modifySubmit() {
	var product = getFormData('modify-dialog');

	$.ajax({
		type: "POST",
		url: add_mod_del_url,
		//url: "/rest/products?status",
		data: JSON.stringify(product),
		timeout: 3000,
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			if('200' === data) {
				swal({
					title: '产品编号:'+product.id,
					text: '修改成功',
					timer: 2000,
					showConfirmButton: false,
					type: 'success'
				});
				queryData();
				$('#modify-dialog').modal('hide');
			} else {
				swal({
					title: data,
					text: '修改失败',
					showConfirmButton: true,
					type: 'error'
				});
			}
		},
		error: function(msg) {
			swal({
				title: '产品信息:' + product.name,
				text: '提交失败',
				showConfirmButton: true,
				type: 'error'
			});
		}
	});
}

function deleteProduct(row) {
	$.ajax({
		type: "DELETE",
		url: add_mod_del_url,
		//url: "/rest/products?status",
		data: JSON.stringify(row),
		timeout: 3000,
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			if('200' === data) {
				swal({
					title: '产品编号:'+row.id,
					text: '删除成功',
					timer: 2000,
					showConfirmButton: false,
					type: 'success'
				});
				queryData();
			} else {
				swal({
					title: data,
					text: '删除失败:' + row.id,
					showConfirmButton: true,
					type: 'error'
				});
			}

		},
		error: function(msg) {
			swal({
				title: '产品编号:' + row.id,
				text: '删除失败',
				showConfirmButton: true,
				type: 'error'
			});
		}
	});
}

function deleteProductConfirm(row) {
	swal({
		title: "确定要删除这条信息吗",
		text: "删除后将无法恢复，请谨慎操作！",
		type: "warning",
		showCancelButton: true,
		//confirmButtonColor: "#DD6B55",
		confirmButtonText: "是的，我要删除！",
		cancelButtonText: "让我再考虑一下…"
	}).then(
		function(isConfirm) {
			if(isConfirm === true) {
				deleteProduct(row);
			}
		});
}

function getFormData(formId) {
	var data = {};
	var conttol = $('#' + formId + ' .form-control');
	for(var i = 0; i < conttol.length; i++) {
		data[conttol[i].id] = conttol[i].value;
	}
	return data;
}

function setFormData(formId, data) {
	var conttol = $('#' + formId + ' .form-control');
	for(var i = 0; i < conttol.length; i++) {
		conttol[i].value=data[conttol[i].id];
	}
}

function addBtnClickEvent() {
	$('#all-table tbody').on('click', 'button#edit', function() {
		var data = table.row($(this).parents('tr')).data();
		setFormData('modify-dialog', data);
		$('#modify-dialog').modal({backdrop: 'static'});
	});
	$('#all-table tbody').on('click', 'button#delete', function() {
		var data = table.row($(this).parents('tr')).data();
		deleteProductConfirm(data);
	});
}

document.getElementById("add-btn").onclick = function() {
	$('#add-dialog').modal({backdrop: 'static'});
};
document.getElementById("add-submit-btn").onclick = function() {
	addSubmit()
};
document.getElementById("modify-submit-btn").onclick = function() {
	modifySubmit()
};
queryData();
addBtnClickEvent();
setInterval("queryData()", 10*1000);