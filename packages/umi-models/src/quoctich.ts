import { useInitModel, type QuocTich } from 'shared';

export default () => {
	const objInit = useInitModel<QuocTich.IRecord>('dm-quoc-tich');

	return {
		...objInit,
	};
};
