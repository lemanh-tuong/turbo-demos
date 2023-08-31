import { type DanToc, useInitModel } from 'shared';

export default () => {
	const objInit = useInitModel<DanToc.IRecord>('dm-dantoc');

	return {
		...objInit,
	};
};
