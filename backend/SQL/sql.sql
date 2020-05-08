-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 08, 2020 lúc 02:52 AM
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
(1, '123434}', '028100024343', 'Nguyen Van A', 'VCB'),
(2, '123434}', '028100024343', 'Nguyen Van A', 'VCB');

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
  `MatKhau` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='test';

--
-- Đang đổ dữ liệu cho bảng `khach_hang`
--

INSERT INTO `khach_hang` (`Id`, `MaKhachHang`, `Ten`, `DiaChi`, `Role`, `TenDangNhap`, `MatKhau`, `Email`, `Phone`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'quocquoc42@gmail.com', '0984344343'),
(2, '202033235546', 'Trần Anh Khoa', 'Bình Thạnh', '', 'khoatq', '123', '0947232743', 'trananhkhoa@gmail.co'),
(3, '202033235546', 'Trần Anh Khoa', 'Bình Thạnh', '', 'khoatq', '123', '0947232743', 'trananhkhoa@gmail.co'),
(4, '202033235754', 'Trần Anh Khoa', 'Bình Thạnh', '', 'khoatq', '123', '0947232743', 'trananhkhoa@gmail.co');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_su_giao_dich`
--

CREATE TABLE `lich_su_giao_dich` (
  `ID` bigint(20) NOT NULL,
  `SO_TAI_KHOAN_NGUOI_GUI` varchar(20) NOT NULL,
  `SO_TAI_KHOAN_NGUOI_NHAN` varchar(20) NOT NULL,
  `THOIGIAN` varchar(20) NOT NULL,
  `LOAIGIAODICH` varchar(20) NOT NULL,
  `SOTIEN` varchar(20) NOT NULL,
  `GHICHU` varchar(20) NOT NULL,
  `HINH_THUC_THANH_TOAN` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'private_key', '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXQIBAAKBgQCCgHEPIosqHMB2q4KkNeaLIufg35P1r3WVYDZuOZkk2z2aimYC\r\nXW7sK/AIDjYxznr7a+s/JYD+kFd5BCgpLnu9Vv0+ykafKdSaOBrpza3vjXA6KdtQ\r\neKY39SkIUHM4h7wQKwuX96HiPCCh0aMw7QnrFtZ8wxPcajaEjzfHs9J04QIDAQAB\r\nAoGAArPAI40Wjper0Ik6mkXXcTgWzwwyFxs79wzX865TonS7sNB+zju7CT7bqH8K\r\n1jstRrl0VIllQ2Afv4y7fCbPPxOMuysvPdPI1HQ5gL359cxUhKd3sfF+EPzYw/p2\r\nEGRSXJ24+bzSqT+Q4kfkosmYr6UhYhdI3wzHPYRls1dhSjUCQQDwG0kNOHzLXRSV\r\ndEqBSgJWo0pLDe/zn0GBU6k67Xv2gwx9DUgx63+l5xtJnQTQSiBe5zBghE/j6IaC\r\nF8NTTyfnAkEAiyPaNheQiVr9m32ApX1v5Q4GUpF/PARrbslUqlxC0Heoi4wXNwRI\r\n4ytn0r7sHZpksVOegtPHEptIow/XpsLD9wJBAL7iklMmY2Ax4dlnmIvs0KscKkY9\r\nEFS4eZVdc57bir/SM61/T7QQK20zrGf7owYMyGtqlPVGe1UPWVA3oButRGUCQA82\r\nxl9vyDAcsOpVmMF/q8KB/BL/MchgO1cL0KQoHm4pB1bq5Ibxgv7D+kBC/BJolWYG\r\nXKi1e2j/bbvWuZ/UYBUCQQDHbk/zpyD1ZOhUGXSnDkiEEXaITr/bpYg5124XcBmb\r\nPmKX45O0MZTZ2+2TJyp+RkHuR3NjPdQWHhNg/LbJEU+Q\r\n-----END RSA PRIVATE KEY-----'),
(2, 'public_key', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCgHEPIosqHMB2q4KkNeaLIufg\r\n35P1r3WVYDZuOZkk2z2aimYCXW7sK/AIDjYxznr7a+s/JYD+kFd5BCgpLnu9Vv0+\r\nykafKdSaOBrpza3vjXA6KdtQeKY39SkIUHM4h7wQKwuX96HiPCCh0aMw7QnrFtZ8\r\nwxPcajaEjzfHs9J04QIDAQAB\r\n-----END PUBLIC KEY-----');

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
(1, '1', 'admin', '02810002324343', '1', '300000'),
(2, '3', 'admin', '0281434', '2', '1100000'),
(3, '12033235754', '202033235754', '0281202033235754', '0', '0');

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
  `NOIDUNG` varchar(20) DEFAULT NULL,
  `TAIKHOANNO` varchar(20) NOT NULL,
  `SOTIEN` varchar(20) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `TAI_KHOAN_DOI_NO` varchar(20) NOT NULL,
  `PhanHoi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_no`
--

INSERT INTO `thong_tin_no` (`ID`, `NOIDUNG`, `TAIKHOANNO`, `SOTIEN`, `TRANG_THAI`, `TAI_KHOAN_DOI_NO`, `PhanHoi`) VALUES
(4, 'Tien dien', 'user01', '9000000', '0', 'admin', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userrefreshtokenext`
--

CREATE TABLE `userrefreshtokenext` (
  `ID` int(20) NOT NULL,
  `refreshToken` varchar(20) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `userrefreshtokenext`
--

INSERT INTO `userrefreshtokenext` (`ID`, `refreshToken`, `Date`) VALUES
(1, 'jxziFiDhDGozSoTih4fV', '2020-04-04');

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
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

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
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
