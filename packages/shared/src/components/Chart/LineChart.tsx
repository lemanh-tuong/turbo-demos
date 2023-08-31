import { type DataChartType } from '.';
import { ColumnChart } from './ColumnChart';

export const LineChart = (props: DataChartType) => {
	return <ColumnChart {...props} type='area' />;
};
