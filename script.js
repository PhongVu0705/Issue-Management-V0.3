"use strict";
const data = [
  {
    pic: "Chief",
    projNumber: "1",
    projName: "1",
    pcbaPN: "1",
    type: "Task",
    name: "1",
    status: "close",
    stage: "MP",
    completedAction: "1",
    pendingAction: "1",
    timeModified: "111111",
    attachments: "1",
  },
  {
    pic: "Chief",
    projNumber: "1",
    projName: "1",
    pcbaPN: "1",
    type: "Task",
    name: "1",
    status: "close",
    stage: "MP",
    completedAction: "1",
    pendingAction: "1",
    timeModified: "111111",
    attachments: "1",
  },
];

//*******************KHỞI TẠO DỮ LIỆU, KHAI BÁO BIỂN*******************

var inputForm = {
  pic: "",
  projNumber: "",
  projName: "",
  pcbaPN: "",
  pcbaSupplier: "",
  type: "",
  name: "",
  status: "",
  stage: "",
  completedAction: "",
  pendingAction: "",
  attachments: "",
  timeModified: "",
};
var status = 0;

//*******************XỬ LÝ SỰ KIỆN CLICK VÀO BUTTON*******************
//hàm load trang
$(document).ready(function () {
  //hiển thị datatable
  $(dataTable).dataTable({
    data: data,
    columns: [
      { data: "projNumber" },
      { data: "projName" },
      { data: "type" },
      { data: "name" },
      { data: "pcbaPN" },
      { data: "pic" },
      { data: "stage" },
      {
        data: "status",
        render: function (data) {
          if (data == "Open") {
            return `<button class="btn btn-yellow btn-sm">Open</button>`;
          } else return `<button class="btn btn-green btn-sm">Close</button>`;
        },
      },
      {
        data: null,
        render: function () {
          return `<button class="btn btn-secondary btn-sm me-1" id="modal-btn-edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" id="modal-btn-delete">
                  <i class="fa-solid fa-trash"></i>
                  </button>`;
        },
      },
      { data: "timeModified", visible: false },
    ],
    columnDefs: [{ className: "text-center", targets: "_all" }],
  });
  //hiển thị nút ấn
  if (status == 1) {
    $("#btn-status").text("Open");
    $("#btn-status").removeClass("btn-green").addClass("btn-yellow");
  } else {
    $("#btn-status").text("Close");
    $("#btn-status").removeClass("btn-yellow").addClass("btn-green");
  }
});
//sự kiện ấn vào nút add issue
$("#btn-add-issue").click(function () {
  $("#modal-edit").modal("show");
  $("#modal-edit-btn-submit").show();
  $("#modal-edit-btn-save").hide();
  clearData();
});
//sự kiện ấn vào nút cancel
$("#modal-edit-btn-cancel").click(function () {
  $("#modal-edit").modal("hide");
});
$("#modal-delete-btn-cancel").click(function () {
  $("#modal-delete").modal("hide");
});
//sự kiện ấn vào nút submit
$("#modal-edit-btn-submit").click(function () {
  //lấy dữ liệu vào
  getFormData(inputForm);
  //kiểm tra dữ liệu
  if (isValid(inputForm)) {
    //xử lý dữ liệu đúng-> convert thành csv
    var jsonData = JSON.stringify(inputForm);

    //đóng modal
    $("#modal-edit").modal("hide");
  } else {
    //xử lý dữ liệu sai
    alert("Please fill in the required fields!");
  }

  //chuyển dữ liệu thành csv
});
//sự kiện chuyển nút status khi ấn vào
$("#btn-status").click(function () {
  if (status == 0) {
    status = 1;
    $("#btn-status").text("Open");
    $("#btn-status").removeClass("btn-green").addClass("btn-yellow");
  } else {
    status = 0;
  }
});
//sự kiện ấn vào nút delete trên table
$("#dataTable").on("click", "#modal-btn-delete", function () {
  inputForm = $(dataTable).DataTable().row($(this).parents("tr")).data();
  console.log(inputForm);
  $("#modal-delete").modal("show");
});
//sự kiện ấn vòa nút delete trên modal
$("#modal-delete-btn-delete").click(function () {
  let index = data.findIndex((item) => item.projNumber == inputForm.projNumber);
  if (index !== -1) {
    // Xóa phần tử khỏi mảng
    data.splice(index, 1);
    console.log("Dữ liệu sau khi xóa:", data);
    // Xóa hàng khỏi DataTable và vẽ lại bảng
    $(dataTable).DataTable().clear().rows.add(data).draw();
  }
  $("#modal-delete").modal("hide");
});

//*******************CÁC HÀM DÙNG CHUNG*******************
function getFormData(inputForm) {
  inputForm.projNumber = $("#project-number").val();
  inputForm.projName = $("#project-name").val();
  inputForm.pcbaPN = $("#pcba-pn").val();
  inputForm.pic = $("#pic").val();
  inputForm.pcbaSupplier = $("#pcba-supplier").val();
  inputForm.type = $("#type").val();
  inputForm.stage = $("#stage").val();
  inputForm.name = $("#name").val();
  inputForm.completedAction = $("#completed-action").val();
  inputForm.pendingAction = $("#pending-action").val();
  inputForm.status = $("#btn-status").text();
  inputForm.attachments = $("#attachment").val();
  inputForm.timeModified = getEpochSeconds();
}
function isValid(inputForm) {
  if (
    inputForm.projNumber == "" ||
    inputForm.projName == "" ||
    inputForm.pcbaPN == "" ||
    inputForm.pic == "" ||
    inputForm.pcbaSupplier == "" ||
    inputForm.type == "" ||
    inputForm.name == ""
  ) {
    return false;
  }
  return true;
}
//hàm lấy epouch timestamp
function getEpochSeconds() {
  return Math.floor(Date.now() / 1000);
}
//hàm xóa dữ liệu cũ khi mở modal
function clearData() {
  $("#project-number").val("");
  $("#project-name").val("");
  $("#pcba-pn").val("");
  $("#pic").val(0);
  $("#pcba-supplier").val(0);
  $("#type").val(0);
  $("#stage").val(0);
  $("#name").val("");
  $("#completed-action").val("");
  $("#pending-action").val("");
  $("#attachment").val("");
  status = 0;
  $("#btn-status").text("Close");
  $("#btn-status").removeClass("btn-yellow").addClass("btn-green");
}
