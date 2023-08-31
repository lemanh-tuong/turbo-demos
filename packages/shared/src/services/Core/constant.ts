export enum ECapHanhChinh {
	CAP_1 = 1,
	CAP_2 = 2,
	CAP_3 = 3,
}

export enum ETrangThaiXuLy {
	CHO_XU_LY = 'Chờ xử lý',
	DUYET = 'Duyệt',
	TU_CHOI = 'Từ chối',
	YEU_CAU_CHINH_SUA = 'Yêu cầu chỉnh sửa',
}

export enum ETrangThaiHopdong {
	CO_HIEU_LUC = 'Có hiệu lực',
	HET_HIEU_LUC = 'Hết hiệu lực',
	VO_HIEU_LUC = 'Vô hiệu lực',
}

export enum ELoaiLuong {
	SO_TIEN = 'Số tiền',
	THEO_NGACH = 'Theo ngạch',
}
export enum ELyDo {
	NGHI_HUU = 'Nghỉ hưu',
	NGHI_VIEC = 'Nghỉ việc',
	THOI_VIEC = 'Thôi việc',
	BO_VIEC = 'Bỏ việc',
	CHUYEN_CONG_TAC = 'Chuyển công tác',
	KEO_DAI_CONG_TAC = 'Kéo dài công tác',
}

export enum ELoaiCanBoKhac {
	// CAN_BO = 'Cán bộ',
	// THINH_GIANG = 'Thỉnh giảng',
	CHUYEN_GIA = 'Chuyên gia',
	CONG_TAC_VIEN = 'Cộng tác viên',
	TINH_NGUYEN_VIEN = 'Tình nguyện viên',
}

export enum ELoaiNhanSu {
	CAN_BO = 'Cán bộ',
	THINH_GIANG = 'Thỉnh giảng',
	CHUYEN_GIA = 'Chuyên gia',
	CONG_TAC_VIEN = 'Cộng tác viên',
	TINH_NGUYEN_VIEN = 'Tình nguyện viên',
}

export enum ELoaiNhanSuDonus {
	CAN_BO = 'Cán bộ cơ hữu',
	THINH_GIANG = 'Thỉnh giảng',
	CHUYEN_GIA = 'Chuyên gia',
	CONG_TAC_VIEN = 'Cộng tác viên',
	TINH_NGUYEN_VIEN = 'Tình nguyện viên',
}

export const ColorLoaiNhanSu = ['#007eb9', '#84C318', '#20B2AA', '#F6AF65', '#800000'];
export const ColorTrangThaiNhanSu = [
	'#007eb9',
	'#84C318',
	'#20B2AA',
	'#F6AF65',
	'#800000',
	'#FF6F6F',
	'#8B008B',
	'#4B0082',
	'#7FFF00',
	'#0000FF',
	'#B8860B',
];

export enum ETrangThaiChinhSua {
	BAN_NHAP = 'Bản nháp', //
	BAN_NHAP_CHUYEN_VIEN = 'Bản nháp chuyên viên', //
	CHO_XU_LY = 'Chờ xử lý', //
	DUYET = 'Duyệt',
	DUYET_DANG_AP_DUNG = 'Duyệt - đang áp dụng',
	KHONG_DUYET = 'Không duyệt',
	YEU_CAU_CHINH_SUA = 'Yêu cầu chỉnh sửa', //
}

export const ColorTrangThaiChinhSua: Record<ETrangThaiChinhSua, string> = {
	[ETrangThaiChinhSua.BAN_NHAP_CHUYEN_VIEN]: 'default',
	[ETrangThaiChinhSua.BAN_NHAP]: 'default',
	[ETrangThaiChinhSua.CHO_XU_LY]: 'yellow',
	[ETrangThaiChinhSua.DUYET_DANG_AP_DUNG]: 'green',
	[ETrangThaiChinhSua.DUYET]: 'blue',
	[ETrangThaiChinhSua.KHONG_DUYET]: 'red',
	[ETrangThaiChinhSua.YEU_CAU_CHINH_SUA]: 'volcano',
};
