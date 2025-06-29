import { TimePeriod } from '@/types';

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const periods = [
  { value: 'day' as TimePeriod, label: 'Today' },
  { value: 'week' as TimePeriod, label: 'Week' },
  { value: 'month' as TimePeriod, label: 'Month' },
  { value: 'year' as TimePeriod, label: 'Year' },
];

export const TimePeriodSelector = ({ selectedPeriod, onPeriodChange }: TimePeriodSelectorProps) => {
  return (
    <div className="flex items-center border-2 border-taday-win98-darkGray rounded-none" style={{ borderStyle: 'inset' }}>
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`nav-button rounded-none font-mono ${
            selectedPeriod === period.value ? 'active' : ''
          }`}
          style={{
            border: selectedPeriod === period.value ? '2px inset #c0c0c0' : '2px outset #c0c0c0',
            background: selectedPeriod === period.value 
              ? '#a0a0a0'
              : '#c0c0c0'
          }}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};