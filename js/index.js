function getEle (id) {
    return document.getElementById(id);
}

var dsnv = new DSNV();
getLocalStorage();

nhacNho();

function nhacNho () {
    var loiNhacNho = localStorage.getItem("loiNhacNho");
    if (!loiNhacNho) {
        alert("Em có làm thêm phần quick edit, Mentor cho thêm điểm em nghen!");
        localStorage.setItem("loiNhacNho", true);
    }
}

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

function renderTable (arr) {
    var table = getEle("tableDanhSach");
    var tableInner = "";
    
        arr.forEach(function(item, index) {
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
            <button class="btn btn-primary" onclick="this.remove();quickEditInfo('${item.taiKhoan}', ${index})"><i class="fa-solid fa-pen-to-square"></i></button>
            <br>
            <button class="btn btn-danger" onclick="xoaNhanVien('${item.taiKhoan}', ${index})"><i class="fa-solid fa-trash"></i></button>
        </td>
        </tr>
        `;
    });
    
    table.innerHTML = tableInner;
}

function xoaNhanVien (tk, index) {
    dsnv.xoaNhanVien(tk);
    setLocalStorage();
    getEle("tableDanhSach").rows[index].remove();
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
        <button class="btn btn-success" onclick="quickEdit(${tk}, ${index})"><i class="fa-solid fa-check"></i></button>
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
        table.innerHTML = `
            <tr>
            <td>${editedNhanVien.taiKhoan}</td>
            <td>${editedNhanVien.hoTen}</td>
            <td>${editedNhanVien.email}</td>
            <td>${editedNhanVien.ngayLam}</td>
            <td>${editedNhanVien.chucVu}</td>
            <td>${editedNhanVien.tongLuong}</td>
            <td>${editedNhanVien.loaiNV}</td>
            <td>
                <button class="btn btn-primary" onclick="this.remove();quickEditInfo('${editedNhanVien.taiKhoan}', ${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <br>
                <button class="btn btn-danger" onclick="xoaNhanVien('${editedNhanVien.taiKhoan}')"><i class="fa-solid fa-trash"></i></button>
            </td>
            </tr>
        `;
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
        renderTable(dsnv.arr)
    }
}

getEle("btnThemNV").addEventListener("click", function() {
    var nhanVien = thongTinNV();
    if(dsnv.validation(nhanVien)) {
        dsnv.themNhanVien(nhanVien);
        renderTable(dsnv.arr)
        setLocalStorage();
    }
});

getEle("btnCapNhat").addEventListener("click", function() {
    var capNhatNV = thongTinNV();
    if(dsnv.validation(capNhatNV)) {
        dsnv.edit(capNhatNV);
        renderTable(dsnv.arr)
        setLocalStorage();
    }
});

getEle("btnTimNV").addEventListener("click", function(){
    var seachValue = getEle("searchName").value;
    var sortList = dsnv.sortNV(seachValue);
    renderTable(sortList);
});
