$(document).ready(function() {
    // gán các sự kiện cho các element:
    // initEvents();
    
    // // Load dữ liệu:
    loadData();
    var formMode = "edit";
    //JQuerry
    //Hie
    $("#btnAdd").click(function(){
        //Hiển thị form thêm mới
        $("#dlgDialog").show();
        //Focus vào ô nhập liệu đầu tiên
        $("#txtEmployeeCode").focus()
    })

    $(".m-btn-close").click(function(){
        $("#dlgDialog").hide();
    })
    console.log("Gán dữ liệu cho các tr");


    $(".m-table").on("dblclick", "tr", function(){
        console.log(this);
        $("#dlgDialog").show();
    })

    $("#btnCancel").click(function() {
        $("#dlgDialog").hide();
    })

    $("#btnRefresh").click(function(){
        loadData();
    });
    
    // Validate du lieu

    $("#btnSave").click(function(){
        let employeeCode = $("#txtEmployeeCode").val();
        let fullName = $("#txtFullName").val();
        let gender = $("#Gender").val();
        let dob = $("#txtDateOfBirth").val();
        let email = $("#Email").val();
        let salary = $("#Salary").val();
    
        if(employeeCode == null || employeeCode === ""){
            alert(resource["VI"].employeeNotEmpty);
        }
        console.log(dob)

        if(dob){
            dob = new Date(dob);
        }
        if(dob > new Date()){
            alert("Ngày sinh không được lớn hơn ngày hiện tại!");
        }

        let employee = {
            "EmployeeCode": employeeCode,
            "EmployeeName": fullName,
            "Gender": gender,
            "DateOfBirth": dob,
            "Email": email,
            "DepartmentId": "4442131321-424145-ed12-ff34-ee2414ewqqwgas1",
            "Salary": salary
        }
        

        //3.Gọi API thực hiện thêm mới
        $.ajax({
            type: "POST",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            data: employee,
            dataType: "json",
            contentType: "application/json",
            success: function(response){
                $(".m-loading").hide();
                $(".m-loading").show();
                loadData();
            },
            error: function(response){
                alert(response.responseJSon.userMsg);
                $('.m-loading').hide();
            }
        });
        //4.Hiển thi loading
        $(".m-loading").show();

        //5.
    })

    // Hiển thị trạng thái lỗi validate khi không nhập vào các trường hợp bắt buộc nhập:
    $("input[required").blur(function(){
        var me = this;
        validateInputRequire(me);
    })

})

function validateInputRequire(input){
    var me = this;
    let value = $(input).val()
    if(value == null || value === ""){
        $(input).addClass("m-input-error");

        $(input).attr("title", "Thông tin này không được để trống!");
    }
    else{
        $(input).removeClass("m-input-error");

        $(input).removeAttr("title");
    }
}
function loadData(){
    //clear du lieu
    $("table#tblEmployee tbody").empty();

    //1. Goi api lay du lieu
    $(".m-loading").show();
    console.log("Bắt đầu lấy dữ liệu");

    $.ajax({
        type: "GET",
        url: "https://cukcuk.manhnv.net/api/v1/Employees",
        success: function(response){
            for(const employee of response){
                //Láy các thông tin cần thiết của đối tượng
                let employeeCode = employee.EmployeeCode;
                let fullName = employee.EmployeeName;
                let genderName = employee["GenderName"];
                let dob = employee["DateOfBirth"];
                let phoneNumber = employee.PhoneNumber;
                let email = employee.Email;
                let position = employee["PositionName"];
                let department = employee["DepartmentName"];
                let salary = employee.Salary;
                let jobStatus = employee["JobStatusName"];


                //Định dạng dữ liệu

                if (dob) {
                    dob = new Date(dob);
                    // Lấy ra ngày:
                    let date = dob.getDate();
                    // lấy ra tháng:
                    let month = dob.getMonth() + 1;
                    month = month < 10 ? `0${month}` : month;
                    // lấy ra năm:
                    let year = dob.getFullYear();
                    dob = `${date}/${month}/${year}`; 
                    // return `${year}-${month}-${dateValue}`;
                } else {
                    dob = "";
                }

                if(salary){
                    salary = new Intl.NumberFormat('vn-VI', { style: 'currency', currency: 'VND' }).format(salary);
                }
                else{
                    salary = "";
                }
                

                var el = $(`<tr>
                        <td class="text-align-center">
                            <input type="checkbox" checked="">
                        </td>
                        <td class="text-align-left">${employeeCode}</td>
                        <td class="text-align-left">${fullName}</td>
                        <td class="text-align-left">${genderName}</td>
                        <td class="text-align-center">${dob}</td>
                        <td class="text-align-left">${phoneNumber}</td>
                        <td class="text-align-left">${email}</td>
                        <td class="text-align-left">${position}</td>
                        <td class="text-align-left">${department}</td>
                        <td class="text-align-right">${salary}</td>
                        <td class="text-align-left">${jobStatus}</td>
                    </tr>`);
                    el.data("entity", employee);
                    $("table#tblEmployee tbody").append(el)
                    $(".m-loading").hide();
                    console.log("Binding dữ liệu xong");
            }
           
            // debugger;
        },
        error: function(response){
            debugger
        }
    });
}

var jsObbject = {
    CustomerCode: "NV001",
    FullName: "Nguyen Van Manh",
    GetName: function(){
        return "Manh";
    },
    DateOfBirth: new Date(),
    Address: undefined,
}
var jsonObject = {
    "CustomerCode": "NV001",
    "FullName": "Nguyen Van Manh",
    "DateOfBirth": "2001-11-11",
    "Address": null
}