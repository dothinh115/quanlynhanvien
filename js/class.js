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
        this.tongLuong = this.luongCoBan * _chucVu;
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
            notiMess = "Nhập ngày tháng cho hợp lý!";
        }
        else if (thang == 2) {
            if(nam%4 === 0) { //năm nhuận
                ngay > 29 ? dateCheckResult = true : dateCheckResult = false;
            }
            else {
                ngay > 28 ? dateCheckResult = true : dateCheckResult = false;
            }
            notiMess = "Nhập ngày tháng cho hợp lý!";
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
        //KIỂM TRA TÀI KHOẢN ĐÃ TỒN TẠI
        var validCheck = true;
        this.arr.forEach(function(item, index) {
            if(nhanVienArr.taiKhoan === item.taiKhoan) {
                validCheck = false;
            }
        });
        if(validCheck) {
            this.arr.push(nhanVienArr);
        }
        else {
            getEle("tbTKNV").style.display = "block";
            getEle("tbTKNV").innerText = "Tài khoản đã tồn tại!";
        }
    }

    //HÀM XÓA NHÂN VIÊN
    this.xoaNhanVien = function (tkNV) {
        var flag = -1;
        this.arr.forEach(function(item, index) {
            if(tkNV === item.taiKhoan) {
                flag = index;
            }
        });
        
        if(flag != -1) {
            this.arr.splice(flag, 1);
        }
    }

    //HÀM LẤY THÔNG TIN
    this.layThongTinNV = function (tk) {
        var i = 0;
        this.arr.forEach(function(item, index) {
            if(tk === item.taiKhoan) {
                i = index;
            }
        });
        return this.arr[i];
    }

    //HÀM SỬA NHANH  
    this.quickEdit = function (taiKhoanCu, editedNhanVien) {
        var editValid = true;
        var quickEditIndex = -1;
        this.arr.forEach(function(item, index) {
            if(taiKhoanCu == item.taiKhoan) {
                quickEditIndex = index;
            }
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
        
        if (check > 0) {
            alert("Tài khoản đã tồn tại!");
            editValid = false;
        }
        else if(!emailValid(editedNhanVien.email)) {
            alert("Email phải đúng định dạng!");
            editValid = false;
        }
        else {
            this.arr[quickEditIndex] = editedNhanVien;
        }
        return editValid;
    }

    //HÀM SỬA
    this.edit = function (editedNhanVien) {
        var i = 0;
        this.arr.forEach(function(item, index) {
            if(item.taiKhoan === editedNhanVien.taiKhoan) {
                i = index;
            }
        });
        this.arr[i] = editedNhanVien;
    }
}