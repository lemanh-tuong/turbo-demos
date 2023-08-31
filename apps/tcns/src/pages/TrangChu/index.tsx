import { Card } from 'antd';
import { useEffect } from 'react';
import { ColumnChart, inputFormat } from 'shared';
import { useModel } from 'umi';

enum EChatLuongNhanSu {
  GIAO_SU = 'Giáo sư',
  PHO_GIAO_SU = 'Phó giáo sư',
  TIEN_SI = 'Tiến sĩ',
  THAC_SY = 'Thạc sĩ',
  DAI_HOC_CAO_DANG = 'Đại học/ Cao đẳng',
  KHAC = 'Khác',
}

const TrangChu = () => {
  const model2 = useModel('@@initialState');
  const model3 = useModel('core.dantoc');

  useEffect(() => {
    console.log(model2, model3);
  });

  return (
    <Card bodyStyle={{ height: '100%' }}>
      <ColumnChart
        xAxis={Object.values(EChatLuongNhanSu)}
        yAxis={[[1, 2, 3, 4]]}
        yLabel={['']}
        height={280}
        formatY={(val) => inputFormat(val ?? 0)}
      />
      <div className="home-welcome">
        <h1 className="title">PHÂN HỆ TỔ CHỨC NHÂN SỰ</h1>
        <h2 className="sub-title">
          HỆ THỐNG PHẦN MỀM CHỈ ĐẠO, ĐIỀU HÀNH - HỌC VIỆN PHỤ NỮ VIỆT NAM
        </h2>
      </div>
    </Card>
  );
};

export default TrangChu;
