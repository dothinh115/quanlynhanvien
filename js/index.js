function getEle (id) {
    return document.getElementById(id);
}

var dsnv = new DSNV();
getLocalStorage();
function thongTinNV () {
    var chucVuOption = getEle("chucvu").querySelectorAll("option");
    chucVuOption.forEach(function(item, index) {
        getEle("chucvu").querySelectorAll("option")[index].setAttribute("value",index);
    });

    var _taiKhoan = getEle("tknv").value;
    var _hoTen = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    var nhanVien = new NhanVien(
        _taiKhoan,
        _hoTen,
        _email,
        _matKhau,
        _ngayLam,
        _luongCoBan,
        _chucVu,
        _gioLam
    );
    nhanVien.tinhLuong();
    return nhanVien;
}

function renderTable () {
    var table = getEle("tableDanhSach");
    var tableInner = "";
    dsnv.arr.forEach(function(item, index) {
        tableInner += `
        <tr>
        <td>${item.taiKhoan}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.ngayLam}</td>
        <td>${item.chucVu}</td>
        <td>${item.tongLuong}</td>
        <td>${item.loaiNV}</td>
        <td>
            <button class="btn btn-primary" onclick="this.remove();quickEditInfo('${item.taiKhoan}', ${index})">Sửa</button>
            <br>
            <br>
            <button class="btn btn-danger" onclick="xoaNhanVien('${item.taiKhoan}')">Xóa</button>
        </td>
        </tr>
        `;
    });
    table.innerHTML = tableInner;
}

function xoaNhanVien (tk) {
    dsnv.xoaNhanVien(tk);
    setLocalStorage();
    renderTable();
}

function quickEditInfo (tk, index) {
    var thongTinNV = dsnv.layThongTinNV(tk);
    var taiKhoan = thongTinNV.taiKhoan;
    var hoTen = thongTinNV.hoTen;
    var email = thongTinNV.email;
    var ngayLam = thongTinNV.ngayLam;
    var chucVu = thongTinNV.chucVu;
    var table  = getEle("tableDanhSach").rows[index];
    table.cells[0].innerHTML = `<input class="form-control input-sm"
    value="${taiKhoan}">`;
    table.cells[1].innerHTML = `<input class="form-control input-sm"
    value="${hoTen}">`;
    table.cells[2].innerHTML = `<input type="email" class="form-control input-sm"
    value="${email}">`;
    table.cells[3].innerHTML = `<input class="form-control input-sm"
    value="${ngayLam}">`;
    table.cells[4].innerHTML = `
    <select class="form-control editChucVu">
        <option value="0">Chọn chức vụ</option>
        <option value="1">Nhân viên</option>
        <option value="2">Trưởng phòng</option>
        <option value="3">Sếp</option>
    </select>
    `;

    if(chucVu == "Nhân viên") {
        table.querySelectorAll(".editChucVu option")[1].setAttribute("selected", "selected");
    }
    else if (chucVu == "Trưởng phòng") {
        table.querySelectorAll(".editChucVu option")[2].setAttribute("selected", "selected");
    }
    else if (chucVu == "Sếp") {
        table.querySelectorAll(".editChucVu option")[3].setAttribute("selected", "selected");
    }
    table.cells[7].innerHTML = `
        <button class="btn btn-success" onclick="quickEdit(${tk}, ${index})">Xong</button>
    `;
}

function quickEdit (tk, index) {
    var table  = getEle("tableDanhSach").rows[index];
    var thongTinNV = dsnv.layThongTinNV(tk);
    var editedTaiKhoan = table.cells[0].querySelectorAll("input")[0].value;
    var editedHoTen = table.cells[1].querySelectorAll("input")[0].value;
    var editedEmail = table.cells[2].querySelectorAll("input")[0].value;
    var editedMatKhau = thongTinNV.matKhau;
    var editNgayLam = table.cells[3].querySelectorAll("input")[0].value;
    var editedLuongCoBan = thongTinNV.luongCoBan;
    var editedChucVu = table.cells[4].querySelectorAll("select")[0].value;
    var editedGioLam = thongTinNV.gioLam;
    
    var editedNhanVien = new NhanVien (
        editedTaiKhoan,
        editedHoTen,
        editedEmail,
        editedMatKhau,
        editNgayLam,
        editedLuongCoBan,
        editedChucVu,
        editedGioLam
    )
    editedNhanVien.tinhLuong();
    if(dsnv.quickEdit(tk, editedNhanVien)) {
        setLocalStorage();
        renderTable();
    }
}

function setLocalStorage () {
    var dataToString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataToString);
}

function getLocalStorage () {
    var data = localStorage.getItem("DSNV");
    var dataToJSON = JSON.parse(data);
    dsnv.arr = dataToJSON;
    if (data) {
        renderTable();
    }
}

getEle("btnThemNV").addEventListener("click", function() {
    var nhanVien = thongTinNV();
    if(dsnv.validation(nhanVien)) {
        dsnv.themNhanVien(nhanVien);
        renderTable();
        setLocalStorage();
    }
});

getEle("btnCapNhat").addEventListener("click", function() {
    var capNhatNV = thongTinNV();
    if(dsnv.validation(capNhatNV)) {
        dsnv.edit(capNhatNV);
        renderTable();
        setLocalStorage();
    }
});
