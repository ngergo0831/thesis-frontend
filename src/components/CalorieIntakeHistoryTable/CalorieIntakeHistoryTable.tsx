import {
  Toolbar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Link
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { intakesState } from '../../store/atoms/intakeAtoms';
import { Intake } from '../../types/types';

interface CalorieIntakeHistoryTableProps {
  intakes: Intake[];
}

interface Column {
  id: 'createdAt' | 'calorie' | 'fat' | 'carbs' | 'protein' | 'link';
  label: string;
  minWidth?: number;
  align?: 'center' | 'right' | 'left';
  format?: (value: Date) => string;
}

const columns: readonly Column[] = [
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 70,
    align: 'left',
    format: (value: Date) => moment(value).format('YYYY-MM-DD HH:mm')
  },
  { id: 'calorie', label: 'Calories', minWidth: 50, align: 'center' },
  { id: 'fat', label: 'Fats', minWidth: 50, align: 'center' },
  { id: 'carbs', label: 'Carbs', minWidth: 50, align: 'center' },
  { id: 'protein', label: 'Protein', minWidth: 50, align: 'center' },
  {
    id: 'link',
    label: 'Action',
    align: 'center',
    minWidth: 100
  }
];

export const CalorieIntakeHistoryTable = ({ intakes }: CalorieIntakeHistoryTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedIntake, setSelectedIntake] = useState<Intake | null>(null);

  const setIntakes = useSetRecoilState(intakesState);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <BoxContainer>
      <Toolbar sx={{ width: '100%' }}>
        <Typography sx={{ justifySelf: 'flex-start' }} variant="h6" id="tableTitle" component="div">
          Intake history
        </Typography>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 326 }}>
        <Table stickyHeader aria-label="Intakes">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {intakes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                  {columns.map((column) => {
                    const value =
                      column.id === 'link' ? (
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setSelectedIntake(row);
                          }}
                        >
                          Link to diet
                        </Link>
                      ) : (
                        row[column.id]
                      );
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value as Date) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100, { label: 'All', value: -1 }]}
        component="div"
        count={intakes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </BoxContainer>
  );
};
