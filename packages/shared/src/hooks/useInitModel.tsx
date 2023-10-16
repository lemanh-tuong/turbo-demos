import { message } from 'antd';
import { useState } from 'react';
import { useInitService } from './useInitService';
import { chuanHoaObject } from '../utils/utils';

type TExportField = any;
type TFilter<T> = any;
type TImportHeader = any;
type TImportResponse = any;
/**
 *
 * @param url path api
 * @param fieldNameCondtion condition | cond
 * @param initCondition initConditionValue
 * @param upService Ip của dịch vụ bên thứ 3
 * @returns
 */
export const useInitModel = <T,>(
	url: string,
	fieldNameCondtion?: 'condition' | 'cond',
	initCondition?: Partial<T>,
	ipService?: string,
	initSort?: { [k in keyof T]?: 1 | -1 },
) => {
	const [danhSach, setDanhSach] = useState<T[]>([]);
	const [record, setRecord] = useState<T>();
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [loading, setLoading] = useState<boolean>(false);
	const [formSubmiting, setFormSubmiting] = useState<boolean>(false);
	const [filters, setFilters] = useState<TFilter<T>[]>();
	const [condition, setCondition] = useState<{ [k in keyof T]?: any } | any>(initCondition);
	const [sort, setSort] = useState<{ [k in keyof T]?: 1 | -1 } | undefined>(initSort);
	const [edit, setEdit] = useState<boolean>(false);
	const [isView, setIsView] = useState<boolean>(true);
	const [visibleForm, setVisibleForm] = useState<boolean>(false);
	const [total, setTotal] = useState<number>(0);
	const [importHeaders, setImportHeaders] = useState<TImportHeader[]>([]); // Import Headers lấy từ API

	const {
		getAllService,
		postService,
		putService,
		deleteService,
		getService,
		getByIdService,
		getImportHeaders,
		getImportTemplate,
		postExecuteImport,
		postValidateImport,
		getExportFields,
		postExport,
	} = useInitService(url, ipService);

	/**
	 * Get Pageable Model
	 * @date 2023-04-05
	 * @param {any} paramCondition Condition khác
	 * @param {any} filterParams Các filters khác
	 * @param {any} sortParam Sort khác
	 * @param {any} paramPage Page khác
	 * @param {any} paramLimit Limit khác
	 * @param {any} path Đường dẫn (mặc định là `page`)
	 * @param {any} otherQuery Truy vấn thêm vào query
	 * @returns {any} Các IRecord
	 */
	const getModel = async (
		paramCondition?: Partial<T>,
		filterParams?: TFilter<T>[],
		sortParam?: { [k in keyof T]?: 1 | -1 },
		paramPage?: number,
		paramLimit?: number,
		path?: string,
		otherQuery?: Record<string, any>,
		isSetDanhSach?: boolean,
		isAbsolutePath?: boolean,
	): Promise<T[]> => {
		setLoading(true);
		const payload = {
			page: paramPage || page,
			limit: paramLimit || limit,
			sort: sortParam || sort,
			[fieldNameCondtion ?? 'condition']: {
				...condition,
				...paramCondition,
			},
			filters: [
				...(filters?.filter((item) => item.active)?.map(({ active, ...item }) => item) || []),
				...(filterParams || []),
			],
			...(otherQuery ?? {}),
		};

		try {
			const response = await getService(payload, path ?? 'page', isAbsolutePath ?? false);
			const tempData: T[] = response?.data?.data?.result ?? [];
			const tempTotal: number = response?.data?.data?.total ?? 0;

			if (tempData.length === 0 && tempTotal) {
				const maxPage = Math.ceil(tempTotal / payload.limit) || 1;
				setPage(maxPage);
				return Promise.reject('Invalid page');
			} else {
				if (isSetDanhSach !== false) setDanhSach(tempData);
				setTotal(tempTotal);
				return tempData;
			}
		} catch (er) {
			return Promise.reject(er);
		} finally {
			setLoading(false);
		}
	};

	const getAllModel = async (
		isSetRecord?: boolean,
		sortParam?: { [k in keyof T]?: 1 | -1 },
		conditionParam?: Partial<T>,
		filterParam?: TFilter<T>[],
		pathParam?: string,
		isSetDanhSach?: boolean,
	): Promise<T[]> => {
		setLoading(true);
		try {
			const payload = {
				[fieldNameCondtion ?? 'condition']: conditionParam,
				sort: sortParam,
				filters: filterParam,
			};
			const response = await getAllService(payload, pathParam);
			const data: T[] = response?.data?.data ?? [];
			// if (sortParam) data.sort(sortParam);
			if (isSetDanhSach !== false) setDanhSach(data);
			if (isSetRecord) setRecord(data?.[0]);

			return data;
		} catch (er) {
			return Promise.reject(er);
		} finally {
			setLoading(false);
		}
	};

	const getByIdModel = async (id: string | number, isSetRecord?: boolean): Promise<T> => {
		if (!id) return Promise.reject();
		setLoading(true);
		try {
			const response = await getByIdService(id);
			if (isSetRecord !== false) setRecord(response?.data?.data ?? null);
			return response?.data?.data;
		} catch (er) {
			return Promise.reject(er);
		} finally {
			setLoading(false);
		}
	};

	const postModel = async (payload: T, getData?: any, closeModal?: boolean): Promise<T> => {
		if (formSubmiting) Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await postService(chuanHoaObject(payload));
			message.success('Thêm mới thành công');
			setLoading(false);
			if (getData) getData();
			else getModel();
			if (closeModal !== false) setVisibleForm(false);

			return res.data?.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};

	const putModel = async (
		id: string | number,
		payload: T,
		getData?: any,
		notGet?: boolean,
		closeModal?: boolean,
	): Promise<T> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await putService(id, chuanHoaObject(payload));
			message.success('Lưu thành công');
			setLoading(false);
			if (getData) getData();
			else if (!notGet) getModel();
			if (closeModal !== false) setVisibleForm(false);

			return res.data?.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};

	const deleteModel = async (id: string | number, getData?: any): Promise<any> => {
		setLoading(true);
		try {
			const res = await deleteService(id);
			message.success('Xóa thành công');

			const maxPage = Math.ceil((total - 1) / limit) || 1;
			let newPage = page;
			if (newPage > maxPage) {
				newPage = maxPage;
				setPage(newPage);
			} else if (getData) getData();
			else getModel(undefined, undefined, undefined, newPage);

			return res.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(true);
		setIsView(false);
		setVisibleForm(true);
	};

	const handleView = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(false);
		setIsView(true);
		setVisibleForm(true);
	};

	//#region BASE IMPORT
	/**
	 * Lấy header cho chức năng import
	 * @returns {any}
	 */
	const getImportHeaderModel = async (): Promise<TImportHeader[]> => {
		try {
			const res = await getImportHeaders();
			setImportHeaders(res.data?.data ?? []);
			return res.data?.data ?? [];
		} catch (err) {
			return Promise.reject(err);
		}
	};

	/**
	 * Lấy file excel mẫu cho chức năng import
	 * @returns {any}
	 */
	const getImportTemplateModel = async (): Promise<any> => {
		try {
			const res = await getImportTemplate();
			return res.data;
		} catch (err) {
			return Promise.reject(err);
		}
	};

	/**
	 * Validate dữ liệu cần import
	 * @returns {any}
	 */
	const postValidateModel = async (payload: any[], params?: Record<any, any>): Promise<TImportResponse> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await postValidateImport({ rows: payload }, params);
			message.success('Đã kiểm tra dữ liệu');
			return res.data?.data ?? [];
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};

	/**
	 * Thực thi import dữ liệu
	 * @returns {any}
	 */
	const postExecuteImpotModel = async (payload: any[], params?: Record<any, any>): Promise<TImportResponse> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await postExecuteImport({ rows: payload }, params);
			message.success('Đã nhập dữ liệu');
			return res.data?.data ?? [];
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};
	//#endregion

	//#region BASE EXPORT
	/**
	 * Lấy fields cho chức năng export
	 * @returns {any}
	 */
	const getExportFieldsModel = async (): Promise<TExportField[]> => {
		const genIdField = (data?: TExportField[], prefix?: string): TExportField[] | undefined => {
			if (!data?.length) return undefined;
			return data?.map((f, index) => ({
				...f,
				_id: [prefix ?? '0', index].join('-'),
				children: genIdField(f.children, [prefix ?? '0', index].join('-')),
			}));
		};

		try {
			const res = await getExportFields();
			const fields = genIdField(res.data?.data) ?? [];

			return fields;
		} catch (err) {
			return Promise.reject(err);
		}
	};

	/**
	 * Thực thi export
	 * @returns {any}
	 */
	const postExportModel = async (
		payload: { ids?: string[]; definitions: TExportField[] },
		paramCondition?: Partial<T>,
		paramFilters?: TFilter<T>[],
	): Promise<Blob> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await postExport(payload, {
				condition: { ...condition, ...paramCondition },
				filters: [
					...(filters?.filter((item) => item.active)?.map(({ active, ...item }) => item) || []),
					...(paramFilters ?? []),
				],
			});
			return res.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};
	//#endregion

	return {
		sort,
		setSort,
		getByIdModel,
		getModel,
		deleteModel,
		putModel,
		postModel,
		getAllModel,
		page,
		setPage,
		limit,
		setLimit,
		loading,
		setLoading,
		filters,
		setFilters,
		condition,
		setCondition,
		edit,
		setEdit,
		isView,
		setIsView,
		visibleForm,
		setVisibleForm,
		total,
		setTotal,
		formSubmiting,
		setFormSubmiting,
		danhSach,
		setDanhSach,
		record,
		setRecord,
		importHeaders,
		setImportHeaders,
		handleEdit,
		handleView,
		getImportHeaderModel,
		getImportTemplateModel,
		postExecuteImpotModel,
		postValidateModel,
		getByIdService,
		getService,
		getAllService,
		postService,
		putService,
		getExportFieldsModel,
		postExportModel,
	};
};
