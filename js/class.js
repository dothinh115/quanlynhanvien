//CLASS NHÂN VIÊN
function NhanVien (
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam,
) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    if(_chucVu == 1) {
        this.chucVu = "Nhân viên";
    }
    else if(_chucVu == 2) {
        this.chucVu = "Trưởng phòng";
    }
    else if (_chucVu == 3) {
        this.chucVu = "Sếp";
    }
    else {
        this.chucVu = 0;
    }
    this.gioLam = _gioLam;
    this.luongCoBan = _luongCoBan;
    this.tongLuong = 0;
    if (this.gioLam >= 192) {
        this.loaiNV = "Xuất sắc";
    }
    else if (this.gioLam >= 176) {
        this.loaiNV = "Giỏi";
    }
    else if (this.gioLam >= 160) {
        this.loaiNV = "Khá";
    }
    else{
        this.loaiNV = "Trung bình";
    }

    this.tinhLuong = function () {
        var formatVND = new Intl.NumberFormat("VN-vn");
        this.tongLuong = formatVND.format(this.luongCoBan * _chucVu) + " VNĐ";
    }
}

//KIỂM TRA EMAIL
function emailValid (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function DSNV () {
    this.arr = [];

    this.validation = function (nhanVien) {
        this.arrCheck = [];
        //KIỂM TRA TÊN TÀI KHOẢN
        if(isNaN(nhanVien.taiKhoan) || nhanVien.taiKhoan.length < 4 || nhanVien.taiKhoan.length > 6) {
            getEle("tbTKNV").style.display = "block";
            getEle("tbTKNV").innerText = "Tài khoản chỉ được nhập số, từ 4 - 6 ký tự!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbTKNV").style.display = "none";
            this.arrCheck.push(true);
        }

        //KIỂM TRA TÊN NHÂN VIÊN
        if(!isNaN(nhanVien.hoTen) || nhanVien.hoTen.length === 0) {
            getEle("tbTen").style.display = "block";
            getEle("tbTen").innerText = "Họ tên chỉ được nhập chữ, không để trống!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbTen").style.display = "none";
            this.arrCheck.push(true);
        }

        //KIỂM TRA EMAIL
        if(nhanVien.email.length === 0) {
            getEle("tbEmail").style.display = "block";
            getEle("tbEmail").innerText = "Email không được để trống";
            this.arrCheck.push(false);
        }
        else if(!emailValid(nhanVien.email)) {
            getEle("tbEmail").style.display = "block";
            getEle("tbEmail").innerText = "Email phải đúng định dạng!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbEmail").style.display = "none";
            this.arrCheck.push(true);
        }

        //KIỂM TRA MẬT KHẨU
        
        var kyTuInHoa = 0;
        var kyTuSo = 0;
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        for (var i = 0; i < nhanVien.matKhau.length; i++) {
            var character = nhanVien.matKhau.charAt(i);
            if(!isNaN(character)) {
                kyTuSo++;
            }
            else {
                if(character === character.toUpperCase()) {
                    kyTuInHoa++;
                }
            }
        }

        if(kyTuInHoa == 0 || kyTuSo == 0 || !format.test(nhanVien.matKhau)) {
            getEle("tbMatKhau").style.display = "block";
            getEle("tbMatKhau").innerText = "Mật khẩu phải từ 6 - 10 ký tự, phải có ít nhất 1 số, 1 chữ hoa và 1 ký tự đặc biệt!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbMatKhau").style.display = "none";
            this.arrCheck.push(true);
        }
        

        //KIỂM TRA NGÀY THÁNG
        var dateCheck = nhanVien.ngayLam.split("/");
        var thang = dateCheck[0];
        var ngay = dateCheck[1];
        var nam = dateCheck[2]
        var dateCheckResult = true;
        var notiMess = "Ngày tháng năm phải là số, định dạng mm/dd/yyyy!";
        
        if(dateCheck.length < 3) {
            dateCheckResult = false;
        }
        else if (isNaN(ngay) || isNaN(thang) || isNaN(nam)) {
            dateCheck = false;
        }
        else if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) {
            dateCheckResult = false;
            notiMess = "Nhập ngày tháng cho hợp lý! Định dạng mm/dd/yyyy!";
        }
        else if (thang == 2) {
            if(nam%4 === 0) { //năm nhuận
                ngay > 29 ? dateCheckResult = true : dateCheckResult = false;
            }
            else {
                ngay > 28 ? dateCheckResult = true : dateCheckResult = false;
            }
        }
        if(dateCheckResult) {
            getEle("tbNgay").style.display = "none";
            this.arrCheck.push(true);
        }
        else {
            getEle("tbNgay").style.display = "block";
            getEle("tbNgay").innerText = notiMess;
            this.arrCheck.push(false);
        }

        //KIỂM TRA LƯƠNG CƠ BẢN
        if(isNaN(nhanVien.luongCoBan) || nhanVien.luongCoBan < 1000000 || nhanVien.luongCoBan > 20000000) {
            getEle("tbLuongCB").style.display = "block";
            getEle("tbLuongCB").innerText = "Lương cơ bản phải từ 1.000.000 đến 20.000.000!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbLuongCB").style.display = "none";
            this.arrCheck.push(true);
        }

        //KIỂM TRA CHỨC VỤ
        if (nhanVien.chucVu == 0) {
            getEle("tbChucVu").style.display = "block";
            getEle("tbChucVu").innerText = "Chọn chức vụ!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbChucVu").style.display = "none";
            this.arrCheck.push(true);
        }

        //KIỂM TRA GIỜ LÀM
        if(nhanVien.gioLam < 80 || nhanVien.gioLam > 200) {
            getEle("tbGiolam").style.display = "block";
            getEle("tbGiolam").innerText = "Giờ làm từ 80 - 200 giờ!";
            this.arrCheck.push(false);
        }
        else {
            getEle("tbGiolam").style.display = "none";
            this.arrCheck.push(true);
        }
        
        //KIỂM TRA LẠI TOÀN BỘ QUÁ TRÌNH
        var flag = true;
        this.arrCheck.forEach(function(item) {
            if(item == false) {
                flag = false;
            }
        });

        return flag;
    }

    //HÀM THÊM NHÂN VIÊN
    this.themNhanVien = function (nhanVienArr) {
        var success = false;
        //KIỂM TRA TÀI KHOẢN ĐÃ TỒN TẠI
        var validCheck = this.arr.find(function(sort) {
            return sort.taiKhoan == nhanVienArr.taiKhoan;
        });
        if(validCheck == undefined) {
            this.arr.push(nhanVienArr);
            success = true;
        }
        else {
            getEle("tbTKNV").style.display = "block";
            getEle("tbTKNV").innerText = "Tài khoản đã tồn tại!";
        }
        return success;
    }

    //HÀM XÓA NHÂN VIÊN
    this.xoaNhanVien = function (tkNV) {
        var flag = this.arr.findIndex(function(sort) {
            return sort.taiKhoan == tkNV;
        });
        
        this.arr.splice(flag, 1);
    }

    //HÀM LẤY THÔNG TIN
    this.layThongTinNV = function (tk) {
        var thongTinNV = this.arr.find(function(sort) {
            return sort.taiKhoan == tk;
        });
        return thongTinNV;
    }

    //HÀM SỬA NHANH  
    this.quickEdit = function (taiKhoanCu, editedNhanVien) {
        var editValid = true;
        quickEditIndex = this.arr.findIndex(function(findExample) {
            return findExample.taiKhoan == taiKhoanCu;
        });
        
        var check = 0;
        for (var i = 0; i < this.arr.length; i++) {
            if(i == quickEditIndex) {
                continue;
            }
            else if(this.arr[i].taiKhoan == editedNhanVien.taiKhoan) {
                check++;
            }
        }
        
        //VALIDATION CHO QUICK EDIT
        var date = editedNhanVien.ngayLam.split("/");
        var thang = date[0];
        ngay = date[1];
        nam = date[2];

        if (check > 0) {
            alert("Tài khoản đã tồn tại!");
            editValid = false;
        }
        else if(editedNhanVien.taiKhoan.length === 0 || editedNhanVien.taiKhoan.length < 4 || editedNhanVien.taiKhoan.length > 6) {
            alert("Tài khoản từ 4 - 6 ký tự, không được để trống!");
            editValid = false;
        }
        else if(!emailValid(editedNhanVien.email) || editedNhanVien.email.length === 0) {
            alert("Email phải đúng định dạng và không được bỏ trống!");
            editValid = false;
        }
        else if(editedNhanVien.ngayLam.length === 0) {
            alert("Ngày tháng không được để trống!");
            editValid = false;
        }
        else if(ngay == "" || thang == "" || nam == "") {
            alert("Định dạng mm/dd/yyyy!");
            editValid = false;
        }
        else if(ngay < 1 || ngay > 31 || thang < 0 || thang > 12) {
            alert("Điền ngày tháng cho hợp lý!");
            editValid = false;
        }
        else if(thang == 2) {
            if (nam%4 === 0) {
                if(ngay > 29) {
                    alert("Năm nhuận tháng 2 có 29 ngày thôi!");
                    editValid = false;
                }
            }
            else {
                if(ngay > 28) {
                    alert("Tháng 2 có 28 ngày thôi!");
                    editValid = false;
                }
            }
        }
        else if(editedNhanVien.chucVu == 0) {
            alert("Chọn chức vụ đã!");
            editValid = false;
        }
        
        if(editValid) {
            this.arr[quickEditIndex] = editedNhanVien;
        }
        return editValid;
    }

    //HÀM SỬA
    this.edit = function (editedNhanVien) {
        var index = this.arr.findIndex(function(sort) {
            return sort.taiKhoan == editedNhanVien.taiKhoan;
        });
        if(index != -1) {
            this.arr[index] = editedNhanVien;
        }
        else {
            getEle("tbTKNV").style.display = "block";
            getEle("tbTKNV").innerText = "Không tìm thấy nhân viên này!";
        }
    }

    //HÀM SORT
    this.sortNV = function (value) {
        var filter;
        if(value == 0) {
            filter = this.arr;
        }
        else if(value == 1) {
            filter = this.arr.filter(function(filterExample) {
                return filterExample.gioLam >= 192;
            });
        }
        else if (value == 2) {
            filter = this.arr.filter(function(filterExample) {
                return filterExample.gioLam < 192 && filterExample.gioLam >= 176;
            });
        }
        else if (value == 3) {
            filter = this.arr.filter(function(filterExample) {
                return filterExample.gioLam < 176 && filterExample.gioLam >= 160;
            });
        }
        else if(value == 4) {
            filter = this.arr.filter(function(filterExample) {
                return filterExample.gioLam < 160;
            });
        }
        return filter;
    }

    //HÀM TỰ TẠO TÀI KHOẢN 
    this.autoIDPicker = function () {
        var min = 0;
        var max = 999999;
        //HÀM TẠO SỐ RANDOM TỪ MIN - MAX
        function getRandomID (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
            //KIỂM TRA ĐỘ DÀI CỦA SỐ, NẾU DƯỚI 4 THÌ PHẢI THÊM 0 VÀO CHO ĐỦ 4
            var length = String(randomNumber).length;
            while(length < 4) {
                randomNumber = "0" + randomNumber;
                length = length.length;
            }
            return randomNumber;
        }
        //LẤY SỐ RANDOM
        var newID = getRandomID(min, max);

        //TÌM TRONG MẢNG XEM CÓ TÀI KHOẢN TRÙNG KO
        while (this.layThongTinNV(newID) != undefined) {
            //NẾU CÓ THÌ TIẾP TỤC GỌI RANDOM RA SỐ KHÁC
            newID = getRandomID(min, max);
        }

        return newID;
    }
}