import Bar from './Bar';
import PollChoice from '../../../Types/PollChoice';

interface BarChartProps {
    values: PollChoice[],
}

export default function BarChart({ values }: BarChartProps) {
    return (
        <div className="flex flex-row justify-center h-36 mt-8 mb-4 select-none">
            {values.map((v, i) => <Bar values={values} index={i}/>)}
        </div>
    );
}