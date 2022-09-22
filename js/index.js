function getEle (id) {
    return document.getElementById(id);
}

var dsnv = new DSNV();

getLocalStorage();

nhacNho();

function nhacNho () {
    var loiNhacNho = localStorage.getItem("loiNhacNho");
    if (!loiNhacNho) {
        alert("Em có làm thêm phần quick edit và phân trang, Mentor cho thêm điểm em nghen!");
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

function pageURL () {
    var url = window.location.href;
    var urlData = url.split("?search=")[1];

    if(urlData == undefined) {
        window.location.replace("./?search=0&page=1");
    }
    else {
        urlSearch = urlData.split("&page=")[0];
        var urlPage = urlData.split("&page=")[1];
        if(urlPage == undefined) {
            window.location.replace("./?search=" + urlSearch + "&page=1");
        }
    
    }
    var infoObject = {
        search: urlSearch,
        page: urlPage
    }
    return infoObject;
}

function pagination (arr) {
    var perPage = 5; //hiển thị mỗi trang
    var total = arr.length; //Tổng cộng item
    var page = 0; //Tổng số trang
    var lastPageItem = 0; //Item ở trang cuối cùng
    var paginationInfo = {};
    if (total < perPage) {
        page = 1;
    }
    else {
        if(total%perPage == 0) {
            page = total/perPage;
        }
        else {
            page = parseInt(total/perPage) + 1;
            lastPageItem = total%perPage;
        }
    }
    paginationInfo = {
        perPage,
        total,
        page,
        lastPageItem
    }

    return paginationInfo;
}

function createRow (arr, number, isObject) {
    var row;
    if(isObject) {
        row = `
            <tr>
            <td>${arr[number].taiKhoan}</td>
            <td>${arr[number].hoTen}</td>
            <td>${arr[number].email}</td>
            <td>${arr[number].ngayLam}</td>
            <td>${arr[number].chucVu}</td>
            <td>${arr[number].tongLuong}</td>
            <td>${arr[number].loaiNV}</td>
            <td>
                <button 
                class="btn btn-primary" 
                onclick="this.remove();quickEditInfo('${arr[number].taiKhoan}', ${number})">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <br>
                <button 
                class="btn btn-danger" 
                onclick="xoaNhanVien('${arr[number].taiKhoan}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
    } 
    else {
        row = `
            <tr>
            <td>${arr.taiKhoan}</td>
            <td>${arr.hoTen}</td>
            <td>${arr.email}</td>
            <td>${arr.ngayLam}</td>
            <td>${arr.chucVu}</td>
            <td>${arr.tongLuong}</td>
            <td>${arr.loaiNV}</td>
            <td>
                <button 
                class="btn btn-primary" 
                onclick="this.remove();quickEditInfo('${arr.taiKhoan}', ${number})">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <br>
                <button 
                class="btn btn-danger" 
                onclick="xoaNhanVien('${arr.taiKhoan}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
    }
    
    return row;
}

function renderTable (arr, urlData) {
    var table = getEle("tableDanhSach");
    var tableInner = "";
    var pagiInfo = pagination(arr);
    var pagi = getEle("ulPhanTrang");
    var pagiInner = "";
    var url = pageURL();

    if(url.page == 1) {
        if(pagiInfo.page == 1) {
            pagiInner += `
                <li class="page-item">1</li>
            `;
            for(var i = 1; i <= pagiInfo.total; i++) {
                var j = i - 1;
                tableInner += createRow(arr, j, true);
            }
        } 
        else {  
            for(var i = 1; i <= pagiInfo.page; i++) {
                var active = "";
                if (i == 1) {
                    active = "active";
                }
                pagiInner += `<li class="page-item ${active}">`;
                pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${i}">`;
                pagiInner += `${i}</a></li>`;
            }
            for (var j = 1; j <= pagiInfo.perPage; j++) {
                var k = j - 1;
                tableInner += createRow(arr, k, true);
            }
        }
    }
    else {
        for(var k = 1; k <= pagiInfo.page; k++) {
            var active = "";
            if (k == url.page) {
                active = "active";
            }
            pagiInner += `<li class="page-item ${active}">`;
            pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${k}">`;pagiInner +=`${k}</a></li>`;
        }
        if(url.page == pagiInfo.page) {
            for (var i = (url.page * pagiInfo.perPage) - 4; i <= pagiInfo.total; i++) {
                var j = i - 1;
                tableInner += createRow(arr, j, true);
            }
        }
        else {
            for (var i = (url.page * pagiInfo.perPage) - 4; i <= url.page * pagiInfo.perPage; i++) {
                var j = i - 1;
                tableInner += createRow(arr, j, true);
            }
        }
    }

    pagi.innerHTML = pagiInner;
    
    table.innerHTML = tableInner;
}

function xoaNhanVien (tk) {
    dsnv.xoaNhanVien(tk);
    setLocalStorage();
    var url = pageURL();
    var paGi = pagination(dsnv.sortNV(url.search));
    if(paGi.total%paGi.perPage === 0) {
        window.location.replace("./?search=" + url.search + "&page=" + paGi.page);
    }
    else {
        renderTable(dsnv.sortNV(url.search), url.search);
    }
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
        table.innerHTML = createRow(editedNhanVien, index, false);
    }
}

function setLocalStorage () {
    var dataToString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataToString);
}

function getLocalStorage () {
    var data = localStorage.getItem("DSNV");
    if(data) {
        var dataToJSON = JSON.parse(data);
        dsnv.arr = dataToJSON;
        var url = pageURL();
        renderTable(dsnv.sortNV(url.search), url.search);
        getEle("searchName").querySelectorAll("option")[url.search].setAttribute("selected", "selected");
    }
}

getEle("btnThemNV").addEventListener("click", function() {
    var nhanVien = thongTinNV();
    if(dsnv.validation(nhanVien)) {
        dsnv.themNhanVien(nhanVien);
        var url = pageURL();
        renderTable(dsnv.sortNV(url.search), url.search);
        setLocalStorage();
    }
});

getEle("btnCapNhat").addEventListener("click", function() {
    var capNhatNV = thongTinNV();
    if(dsnv.validation(capNhatNV)) {
        dsnv.edit(capNhatNV);
        var url = pageURL();
        renderTable(dsnv.sortNV(url.search), url.search);
        setLocalStorage();
    }
});

getEle("btnTimNV").addEventListener("click", function(){
    var searchValue = getEle("searchName").value;
    window.location.replace("./?search=" + searchValue + "&page=1");
});
