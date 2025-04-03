import { useEffect, useState } from 'react';
import { Panel } from '../base-panel/base-panel';
import { LineChart } from '@mui/x-charts';
import { TipJar } from '@phosphor-icons/react';
import { addDays, format } from 'date-fns';

type DataEntry = {
  value: number;
  date: number;
};

type Props = {
  data: DataEntry[];
};

export function LineProfitChartPanel({ data, gridSpan }: Props) {
  const [temperature, setTemperature] = useState('N/A');

  useEffect(() => {
    // const asyncFunc = async () => {
    //     const result = await fetch('http://localhost:3000/api/environment/temperature');
    //     const json = await result.json();
    //     if (json.ok === true) {
    //         setTemperature(json.data);
    //     }
    // }
    // asyncFunc();
  }, []);

  return (
    <Panel header='Guadagni ultimi 15 giorni' headerIcon={TipJar} className='col-span-2 lg:col-span-4 2xl:col-span-3'>
      <LineChart
        dataset={data}
        height={200}
        series={[
          {
            dataKey: 'value'
          }
        ]}
        xAxis={[
          {
            dataKey: 'date',

            valueFormatter: x => format(addDays(new Date(), x), 'dd MMM')
          }
        ]}
      />
    </Panel>
  );
}
