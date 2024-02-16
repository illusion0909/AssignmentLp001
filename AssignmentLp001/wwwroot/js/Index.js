var dataTable;

$(document).ready(function () { 
    loadDataTable();
    ClearText();
})
function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Setting/GetALL"
        },
        "columns": [
            { "data": "key", "width": "20%" },
            { "data": "value", "width": "20%" },
            { "data": "value2", "width": "20%" },
            { "data": "description", "width": "20%" },
            { "data": "created", "width": "20%" },
            { "data": "lastModified", "width": "20%" },
           
            {
                "data": "isDeleted",
                "width": "20%",
                "render": function (data) {
                    return data ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                }
            },
            {
                "data": "id",
                "render": function (data) {  
                    return `
                            <div class="text-center">
                            <a class="btn btn-warning" onclick=edit("/Setting/Edit/${data}")>
                            <i class="fas fa-edit"></i>
                           </a>
                           <a class="btn btn-danger" onclick=Delete("/Setting/Delete/${data}")>
                           <i class="fas fa-trash-alt"></i>
                           </a>
                           </div>
                           `;
            
                }
            }
        ]
    })
}
function Delete(url) {
    swal({
        title: "Want To Delete Data?",
        text: "Delete information",
        buttons: true,
        icon: "warning",
        dangerModel: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: url,
                type: "Delete",
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);

                    }
                }
            })
        }
    })
}

$('#btnOpen').click(function () {
    $('.modal-title').html("Add Item");
    $('#settingModal').modal('show');
    
});

$('.datepicker').datepicker({ dateFormat: 'dd-M-yy' });
$('.datepicker').on('changeDate', function (ev) {
    $(this).datepicker('hide');
});
function addItem() {
   // debugger
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);
    var hours = ('0' + currentDate.getHours()).slice(-2);
    var minutes = ('0' + currentDate.getMinutes()).slice(-2);
    var seconds = ('0' + currentDate.getSeconds()).slice(-2);

    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    var itemList = {

        Key: $('#Key').val(),
        Value: $('#Value').val(),
        Value2: $('#Value2').val(),
        Description: $('#Description').val(),
        Created: $('#Created').val(),
        LastModified:formattedDate,
        IsDeleted:$('N').val(),
        
    }

    $.ajax({
        url: '/Setting/Add',
        type: 'Post',
        data: itemList,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {
            
            ClearText();
            hide();
            dataTable.ajax.reload();
        },
        error: function () {
            alert("error while deleting data");
        }
        })
}
function hide() {
    $('#settingModal').modal('hide');
}

function edit(url) {
    $('.modal-title').html("Edit Item");
    $('#settingModal').modal('show');
    $.ajax({
        url: url,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
      
        success: function (data) {
            $('#ItemId').val(data.id),
                $('#Key').val(data.key),
                $('#Value').val(data.value),
                $('#Value2').val(data.value2),
                $('#Description').val(data.description),
                $('#Created').val(data.created)
            $('#AddsettingModal').css('display', 'none');
            $('#updatesettingModal').css('display', 'block');
            
        },
        error: function () {
            alert("Data Does Not Exist");
        }
    })
}
function UpdateItem() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);
    var hours = ('0' + currentDate.getHours()).slice(-2);
    var minutes = ('0' + currentDate.getMinutes()).slice(-2);
    var seconds = ('0' + currentDate.getSeconds()).slice(-2);
    debugger;
    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    var itemList = {
        Id: $('#ItemId').val(),
        Key: $('#Key').val(),
        Value: $('#Value').val(),
        Value2: $('#Value2').val(),
        Description: $('#Description').val(),
        Created: $('#Created').val(),
        LastModified: formattedDate,
        IsDeleted: $('N').val()

    }
    $.ajax({
        url: '/Setting/Update',
        type: 'Post',
        data: itemList,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {

            ClearText();
            hide();
            dataTable.ajax.reload();
        },
        error: function () {
            alert("error while deleting data");
        }
    })
}

function ClearText() {
    $('#Key').val('');
    $('#Value').val('');
    $('#Value2').val('');
    $('#Description').val('');
   
    $('#ItemId').val('');
}