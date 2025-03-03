const data = [
  {
    id: 1,
    pic: "Chief",
    projNumber: "1",
    projName: "1",
    pcbaPN: "1",
    type: "task",
    name: "1",
    status: "close",
    stage: "MP",
    action: "this is a test line",
    timeModified: "111111",
  },
  {
    id: 1,
    pic: "Chief",
    projNumber: "1",
    projName: "1",
    pcbaPN: "1",
    type: "task",
    name: "1",
    status: "close",
    stage: "MP",
    action: "this is a test line",
    timeModified: "111111",
  },
];

//*******************KHỞI TẠO DỮ LIỆU, KHAI BÁO BIỂN*******************
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
        return `<button class="btn btn-secondary btn-sm me-1" id="btn-edit">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-danger btn-sm" id="btn-delete">
                <i class="fa-solid fa-trash"></i>
                </button>`;
      },
    },
    { data: "id", visible: false },
    { data: "timeModified", visible: false },
  ],
  columnDefs: [{ className: "text-center", targets: "_all" }],
});

//*******************XỬ LÝ SỰ KIỆN CLICK VÀO BUTTON*******************

$("#btn-add-issue").click(function () {
  $("#modal-deleted").modal("show");
});
$(".btn-close").click(function () {
  $("#modal-deleted").modal("hide");
});
