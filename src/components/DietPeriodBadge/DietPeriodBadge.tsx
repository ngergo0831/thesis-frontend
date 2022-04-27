import { Chip } from '@mui/material';

interface DietPeriodBadgeProps {
  label: string;
}

export const DietPeriodBadge = ({ label }: DietPeriodBadgeProps) => {
  const generateColor = (_label: string) => {
    switch (_label) {
      case 'Daily':
        return 'primary';
      case 'Weekly':
        return 'secondary';
      case 'Monthly':
        return 'success';
      case 'Yearly':
        return 'warning';
      default:
        return 'primary';
    }
  };
  return (
    <Chip color={generateColor(label)} label={label} size="small" style={{ marginLeft: '1rem' }} />
  );
};
