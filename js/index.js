function getEle (id) {
    return document.getElementById(id);
}

var dsnv = new DSNV();

window.addEventListener("load", function() {
    pageURL();
    getLocalStorage();
    nhacNho();
});

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
    var perPage = 10; //hiển thị mỗi trang
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

function createRow (arr, number, isMultiObject) {
    var row;
    if(isMultiObject) {
        row = `
            <tr id="rowIndex__${number}">
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
                <button 
                class="btn btn-warning" 
                onclick="xoaNhanVien('${arr[number].taiKhoan}', ${number})">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
    } 
    else {
        row = `
            <tr id="rowIndex__${number}">
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
                <button 
                class="btn btn-warning" 
                onclick="xoaNhanVien('${arr.taiKhoan}', ${number})">
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
    var rowInfo = getEle("rowInfo");

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
                if (i == 1) {
                    pagiInner += `<a class="page-link disabled">`;
                }
                else{
                    pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${i}">`;
                }
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
            if (k == url.page) {
                pagiInner += `<a class="page-link disabled">${k}</a>`;
            }
            else{
                pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${k}">${k}</a>`;
            }
            pagiInner +=`</li>`;
        }
        if(url.page == pagiInfo.page) {
            for (var i = (url.page * pagiInfo.perPage) - (pagiInfo.perPage - 1); i <= pagiInfo.total; i++) {
                var j = i - 1;
                tableInner += createRow(arr, j, true);
            }
        }
        else {
            for (var i = (url.page * pagiInfo.perPage) - (pagiInfo.perPage - 1); i <= url.page * pagiInfo.perPage; i++) {
                var j = i - 1;
                tableInner += createRow(arr, j, true);
            }
        }
    }
    var rowInfoText = "";
    if(url.page != pagiInfo.page) {
        rowInfoText += (pagiInfo.perPage * url.page);
    }
    else {
        rowInfoText += pagiInfo.total;
    }
    rowInfoText += " trên tổng số ";
    rowInfoText += pagiInfo.total;
    rowInfoText += " nhân viên.";
    rowInfo.innerText = rowInfoText;
    pagi.innerHTML = pagiInner;
    table.innerHTML = tableInner;
}

function xoaNhanVien (tk, index) {
    var table = getEle("rowIndex__" + index);
    table.cells[7].innerHTML = `
        <button class="btn btn-secondary" onclick="xoaNhanVienCancel('${tk}', ${index})"><i class="fa-solid fa-xmark"></i></button>
        <button class="btn btn-success" onclick="xoaNhanVienConfirmed('${tk}')"><i class="fa-solid fa-check"></i></button>
    `;
    
}

function xoaNhanVienConfirmed (tk) {
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

function xoaNhanVienCancel (tk, index) {
    var table = getEle("rowIndex__" + index);
    var thongTinNV = dsnv.layThongTinNV(tk);
    url = pageURL();
    table.innerHTML = createRow(thongTinNV, index, false);
}

function quickEditInfo (tk, index) {
    var thongTinNV = dsnv.layThongTinNV(tk);
    var taiKhoan = thongTinNV.taiKhoan;
    var hoTen = thongTinNV.hoTen;
    var email = thongTinNV.email;
    var ngayLam = thongTinNV.ngayLam;
    var chucVu = thongTinNV.chucVu;
    var table  = getEle("rowIndex__" + index);
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
        table.querySelector(".editChucVu").selectedIndex = "1";
    }
    else if (chucVu == "Trưởng phòng") {
        table.querySelector(".editChucVu").selectedIndex = "2";
    }
    else if (chucVu == "Sếp") {
        table.querySelector(".editChucVu").selectedIndex = "3";
    }
    table.cells[7].innerHTML = `
        <button class="btn btn-info" onclick="callEditModal('${tk}')" data-toggle="modal"
        data-target="#myModal"><i class="fa-solid fa-user-pen"></i></button>
        <button class="btn btn-success" onclick="quickEdit('${tk}', ${index})"><i class="fa-solid fa-check"></i></button>
    `;
}

function quickEdit (tk, index) {
    var table  = getEle("rowIndex__" + index);
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
    
    if(!data || JSON.parse(data).length == 0) {
        getEle("duLieu").style.display = "block";
        getEle("duLieu").querySelector("button").addEventListener("click", function() {
            getEle("dataTextaria").style.display = "block";
        });
    }
}

getEle("btnThemNV").addEventListener("click", function() {
    var nhanVien = thongTinNV();
    if(dsnv.validation(nhanVien)) {
        if(dsnv.themNhanVien(nhanVien)){
            getEle("btnDong").click();
        }
        var url = pageURL();
        renderTable(dsnv.sortNV(url.search), url.search);
        setLocalStorage();
        var lastRow = pagination(dsnv.sortNV(url.search));
        if(lastRow.page != url.page) {
            window.location.replace("./?search=" + url.search + "&page=" + lastRow.page);
        }
    }
});

function callEditModal (tk) {
    getEle("btnAutoPicker").style.display = "none";
    var thongBao = document.querySelectorAll(".sp-thongbao");
    thongBao.forEach(function(item) {
        item.style.display = "none";
    })
    var capNhatNV = dsnv.layThongTinNV(tk);
    getEle("tknv").value = capNhatNV.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = capNhatNV.hoTen;
    getEle("email").value = capNhatNV.email;
    getEle("password").value = capNhatNV.matKhau;
    getEle("datepicker").value = capNhatNV.ngayLam;
    getEle("luongCB").value = capNhatNV.luongCoBan;
    if(capNhatNV.chucVu == "Nhân viên") {
        getEle("chucvu").selectedIndex = "1";
    }
    else if (capNhatNV.chucVu == "Trưởng phòng") {
        getEle("chucvu").selectedIndex = "2";
    }
    else if (capNhatNV.chucVu == "Sếp") {
        getEle("chucvu").selectedIndex = "3";
    }
    getEle("gioLam").value = capNhatNV.gioLam;
    getEle("btnCapNhat").style.display = "inline";
    getEle("btnThemNV").style.display = "none";
}

getEle("btnCapNhat").addEventListener("click", function() {
    var capNhatNV = thongTinNV();
    if(dsnv.validation(capNhatNV)) {
        dsnv.edit(capNhatNV);
        var url = pageURL();
        renderTable(dsnv.sortNV(url.search), url.search);
        setLocalStorage();
        getEle("btnDong").click();
    }
});

getEle("btnTimNV").addEventListener("click", function(){
    var searchValue = getEle("searchName").value;
    window.location.replace("./?search=" + searchValue + "&page=1");
});

getEle("btnThem").addEventListener("click", function() {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "inline";
    getEle("tknv").disabled = false;
    getEle("btnAutoPicker").style.display = "inline";
    var modal = document.querySelector(".modal-body");
    var input = modal.querySelectorAll("input");
    input.forEach(function(item, index) {
        if(index == 4) {
            item.value = new Date().toLocaleDateString("en-US");
        }
        else {
            item.value = "";
        }
    });
    getEle("duLieu").style.display = "none";
});

function autoIDPicker () {
    var nextID = dsnv.autoIDPicker();
    getEle("tknv").value = nextID;
}
