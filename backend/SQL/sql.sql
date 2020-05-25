-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 26, 2020 lúc 01:51 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ib-hn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_sach_nguoi_nhan`
--

CREATE TABLE `danh_sach_nguoi_nhan` (
  `ID` bigint(20) NOT NULL,
  `TEN_DANG_NHAP` varchar(20) NOT NULL,
  `SO_TAI_KHOAN_NGUOI_NHAN` varchar(20) NOT NULL,
  `TEN_GOI_NHO` varchar(20) NOT NULL,
  `NGAN_HANG` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `danh_sach_nguoi_nhan`
--

INSERT INTO `danh_sach_nguoi_nhan` (`ID`, `TEN_DANG_NHAP`, `SO_TAI_KHOAN_NGUOI_NHAN`, `TEN_GOI_NHO`, `NGAN_HANG`) VALUES
(1, 'ABC', '4343', 'ABDS', 'VCB'),
(19, 'admin', '02810002324343', 'admin', 'VCB');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

CREATE TABLE `khach_hang` (
  `Id` bigint(20) NOT NULL,
  `MaKhachHang` varchar(20) NOT NULL,
  `Ten` varchar(20) NOT NULL,
  `DiaChi` varchar(20) NOT NULL,
  `Role` varchar(20) NOT NULL,
  `TenDangNhap` varchar(20) NOT NULL,
  `MatKhau` varchar(2000) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='test';

--
-- Đang đổ dữ liệu cho bảng `khach_hang`
--

INSERT INTO `khach_hang` (`Id`, `MaKhachHang`, `Ten`, `DiaChi`, `Role`, `TenDangNhap`, `MatKhau`, `Email`, `Phone`) VALUES
(2, '202033235546', 'Trần Anh Khoa', 'Bình Thạnh', 'admin', 'khoatq', '123', '0947232743', 'trananhkhoa@gmail.co'),
(3, '202033235546', 'Trần Anh Khoa', 'Bình Thạnh', 'nhanvien', 'khoatq1', '123', '0947232743', 'trananhkhoa@gmail.co'),
(4, '202033235754', 'Trần Anh Khoa', 'Bình Thạnh', 'nhanvien', 'khoatqa2', '$2b$12$qiMHFMi.QLXpF0CAzzXSZeSDSvmwhzyJd6cuQsVTzbNsoK0ft//7a', 'quocquoc42@gmail.com', '09434343'),
(11, '20204023230', 'Administrator', 'Bình Thạnh', '', 'admin', '$2b$12$73cEAfw5C7jWqgheoM6VxuN47xBt.X9PQGT3bfCQMukKqlc20lJqa', '0947232743', 'trananhkhoa@gmail.co');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_su_giao_dich`
--

CREATE TABLE `lich_su_giao_dich` (
  `ID` bigint(20) NOT NULL,
  `SO_TAI_KHOAN_NGUOI_GUI` varchar(20) NOT NULL,
  `TEN_TAI_KHOAN_NGUOI_GUI` varchar(200) NOT NULL,
  `SO_TAI_KHOAN_NGUOI_NHAN` varchar(20) NOT NULL,
  `TEN_TAI_KHOAN_NGUOI_NHAN` varchar(200) NOT NULL,
  `THOIGIAN` date NOT NULL,
  `LOAIGIAODICH` varchar(20) NOT NULL,
  `SOTIEN` varchar(20) NOT NULL,
  `GHICHU` varchar(2000) NOT NULL,
  `HINH_THUC_THANH_TOAN` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lich_su_giao_dich`
--

INSERT INTO `lich_su_giao_dich` (`ID`, `SO_TAI_KHOAN_NGUOI_GUI`, `TEN_TAI_KHOAN_NGUOI_GUI`, `SO_TAI_KHOAN_NGUOI_NHAN`, `TEN_TAI_KHOAN_NGUOI_NHAN`, `THOIGIAN`, `LOAIGIAODICH`, `SOTIEN`, `GHICHU`, `HINH_THUC_THANH_TOAN`) VALUES
(9, '02810002324343', 'Tran Van A', '0281202040225727', 'Tran Van B', '2020-05-26', '', '100000', 'thanh toan tien dien dot 1', ''),
(10, '02810002324343', 'Tran Van A', '0281202040225727', 'Tran Van B', '2020-05-26', '', '100000', 'thanh toan tien dien dot 2', ''),
(11, '02810002324343', 'Tran Van A', '0281202040225727', 'Tran Van B', '2020-05-26', '', '100000', 'thanh toan tien dien dot 3', ''),
(12, '02810002324343', 'Tran Van A', '0281202040225727', 'Tran Van B', '2020-05-26', '', '100000', 'thanh toan tien dien dot 4', ''),
(13, '02810002324343', 'Tran Van A', '0281202040225727', 'Tran Van B', '2020-05-26', '', '100000', 'thanh toan tien dien dot 5', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ngan_hang_thu_huong`
--

CREATE TABLE `ngan_hang_thu_huong` (
  `ID` bigint(20) NOT NULL,
  `MA_NGAN_HANG` varchar(20) NOT NULL,
  `TEN_NGAN_HANG` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `ngan_hang_thu_huong`
--

INSERT INTO `ngan_hang_thu_huong` (`ID`, `MA_NGAN_HANG`, `TEN_NGAN_HANG`) VALUES
(1, 'abc', 'Ngân Hàng ABC');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otp`
--

CREATE TABLE `otp` (
  `Id` bigint(20) NOT NULL,
  `TenDangNhap` varchar(20) NOT NULL,
  `OtpCode` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `otp`
--

INSERT INTO `otp` (`Id`, `TenDangNhap`, `OtpCode`) VALUES
(1, 'admin', 1234),
(22, 'khoatq}', 5215572);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `system_config`
--

CREATE TABLE `system_config` (
  `Id` bigint(20) NOT NULL,
  `KeyValue` varchar(20) NOT NULL,
  `Value` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `system_config`
--

INSERT INTO `system_config` (`Id`, `KeyValue`, `Value`) VALUES
(1, 'private_key', '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCFY/7R0ap4a1Bl+Bg9g9Y6MHa7yNVkGxdPHeFR9tICa4kQSFYQ\r\nfa++hEHBGNX/7tmmmJnInEmFHUoybcXxiFRO79d586o2kHBZv9jMkaDcYGFdMM1r\r\ne0I/aL7EwHub3MWMYJEkaoRbM6Rj9gjOom5bpcQEVTWuNZ2FodcIGYPqZwIDAQAB\r\nAoGAPc2n+lVX07V9KdG6gX39GzbrPHSAEoLO2PRyOoTOpxpmBipN3hQuAmrLAIne\r\nVVe4do0L67wmAEwi3Zyo8xEEZmcLByidqeT+ER8/R4mJfWJguMcVb+J1Yz1gof1p\r\nTp5agsWsWqExQw9/H8adAv+ET1WmiIW/p7QHMaituCVxkOECQQDDpiv8Yyl9geb5\r\n9/jOKQE6BAXBe4pR8Fq9AaTuCVho8RzpoeA9Jll1n5aXEjyNt/eiqTX7eOt3UAt2\r\nCmDnqDqRAkEArol0cmkH+eruhoJe7FcclQR2kj8li07tnAQ3wbEho7lQBlUVAKSY\r\nbWCCfby6/9XWsjIh7Botmx0P4I09CIQhdwJAWot669EQkI8f0Cucr/x2Ht1htIty\r\nFj3AIJy0MZ2NlvOPR+ismGA5IqB61uuPrp6nMlZRL1Jk1tDqnPRsqIlIoQJAdNgs\r\njtNltZfjq0ToC0yeI9zjDDEeD079ny7rrM3KeXL78eFPuCh4qvCrK0YH4nHj01Pg\r\nhdFYqrkgAfJL48GhLQJBAIQmEtNDt4DTACNr4x1elWumek+z8S0uEZjvLsyu4H5A\r\nyp1eSf0/UmIkXFgQiqsXbEf9um+vwMcsVSmxM9YDg2w=\r\n-----END RSA PRIVATE KEY-----'),
(2, 'public_key', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCFY/7R0ap4a1Bl+Bg9g9Y6MHa7\r\nyNVkGxdPHeFR9tICa4kQSFYQfa++hEHBGNX/7tmmmJnInEmFHUoybcXxiFRO79d5\r\n86o2kHBZv9jMkaDcYGFdMM1re0I/aL7EwHub3MWMYJEkaoRbM6Rj9gjOom5bpcQE\r\nVTWuNZ2FodcIGYPqZwIDAQAB\r\n-----END PUBLIC KEY-----'),
(3, 'key_NM', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNdjzB5D42fbkMeM9GDIqyUfEf\r\n3rJNolSj9loyDiFmeBeiGt2ulBiOmOf0SKs3C+DO99VooDPC4AMqmrhEMT+NVVYa\r\ncelIPu1MccTCS6x0ySZXny2JkSmpjHreQ5Q66SH+T+8D+9O4leNJek2Vtw8YWJuJ\r\nhQPuZfaPfZaht1mxlQIDAQAB\r\n-----END PUBLIC KEY-----');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `Id` bigint(20) NOT NULL,
  `MaTaiKhoan` varchar(20) NOT NULL,
  `MaKhachHang` varchar(20) NOT NULL,
  `SoTaiKhoan` varchar(20) NOT NULL,
  `LoaiTaiKhoan` varchar(20) NOT NULL,
  `SoTien` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`Id`, `MaTaiKhoan`, `MaKhachHang`, `SoTaiKhoan`, `LoaiTaiKhoan`, `SoTien`) VALUES
(1, '1', 'admin', '02810002324343', '1', '-900000'),
(2, '3', 'admin', '0281434', '2', '1100000'),
(3, '12033235754', '202033235754', '0281202033235754', '0', '300000'),
(4, '12040165755', 'admin', '028112040165755', '0', '100000'),
(5, '12040165913', 'admin', '028112040165913', '0', '100000'),
(6, '12040225323', '202040225323', '0281202040225323', '0', '-200000'),
(7, '12040225415', '202040225415', '0281202040225415', '0', '200000'),
(8, '12040225526', '202040225526', '0281202040225526', '0', '0'),
(9, '1204022575', '20204022575', '028120204022575', '0', '0'),
(10, '12040225727', '202040225727', '0281202040225727', '0', '1200000'),
(11, '1204023230', '20204023230', '028120204023230', '0', '0'),
(12, '1204023615', '20204023615', '028120204023615', '0', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_bao`
--

CREATE TABLE `thong_bao` (
  `Id` bigint(20) NOT NULL,
  `USER_NHAN` varchar(20) NOT NULL,
  `NOI_DUNG` varchar(50) NOT NULL,
  `TRANG_THAI` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_tin_no`
--

CREATE TABLE `thong_tin_no` (
  `ID` bigint(20) NOT NULL,
  `TEN_NGUOI_DOI` varchar(200) NOT NULL,
  `SO_TAI_KHOAN_DOI` varchar(200) NOT NULL,
  `NOIDUNG` varchar(20) DEFAULT NULL,
  `SOTIEN` varchar(20) NOT NULL,
  `TEN_NGUOI_BI_DOI` varchar(200) NOT NULL,
  `SO_TAI_KHOAN_BI_DOI` varchar(200) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `PhanHoi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_no`
--

INSERT INTO `thong_tin_no` (`ID`, `TEN_NGUOI_DOI`, `SO_TAI_KHOAN_DOI`, `NOIDUNG`, `SOTIEN`, `TEN_NGUOI_BI_DOI`, `SO_TAI_KHOAN_BI_DOI`, `TRANG_THAI`, `PhanHoi`) VALUES
(4, '', '', 'Tien dien 2', '12000000', '', '', '0', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userrefreshtokenext`
--

CREATE TABLE `userrefreshtokenext` (
  `ID` int(20) NOT NULL,
  `refreshToken` varchar(2000) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `userrefreshtokenext`
--

INSERT INTO `userrefreshtokenext` (`ID`, `refreshToken`, `Date`) VALUES
(2, 'Yoa2UPM0lc0kCBhjInwJ', '2020-05-08'),
(1, 'rYD7VRSOu78gP2CuY9lflmNx3m9BJtgMu3XtiYmbFOaXHVMR1GzA5AFfYnoTkuJhzvj05Fo9OKnhTTAl', '2020-05-24'),
(11, 'lLs9PpIVDEmuF5IkJbWBDBSeHihBDygZA7MVtfXdbgqG8P6sCF870r7UJ1mycVxbZ40Ayeg6VTzEu7B4', '2020-05-25');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `danh_sach_nguoi_nhan`
--
ALTER TABLE `danh_sach_nguoi_nhan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `ngan_hang_thu_huong`
--
ALTER TABLE `ngan_hang_thu_huong`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Chỉ mục cho bảng `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`);

--
-- Chỉ mục cho bảng `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `thong_tin_no`
--
ALTER TABLE `thong_tin_no`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `danh_sach_nguoi_nhan`
--
ALTER TABLE `danh_sach_nguoi_nhan`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `ngan_hang_thu_huong`
--
ALTER TABLE `ngan_hang_thu_huong`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `otp`
--
ALTER TABLE `otp`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `system_config`
--
ALTER TABLE `system_config`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thong_tin_no`
--
ALTER TABLE `thong_tin_no`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
