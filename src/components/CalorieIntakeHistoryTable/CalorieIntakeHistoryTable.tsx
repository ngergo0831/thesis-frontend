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
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createDiet } from '../../api/api';
import { Period } from '../../enums/enums';
import { BoxContainer } from '../../GlobalStyles';
import { currentUserIdState } from '../../store/atoms/userAtoms';
import { intakesState } from '../../store/atoms/intakeAtoms';
import { Intake } from '../../types/types';
import { dietsState } from '../../store/atoms/dietAtoms';

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

  const userId = useRecoilValue(currentUserIdState);
  const setIntakes = useSetRecoilState(intakesState);
  const setDiets = useSetRecoilState(dietsState);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dietAlreadyCreated = (intake) => {
    return intake.diet;
  };

  useEffect(() => {
    if (selectedIntake) {
      const { id } = selectedIntake;
      createDiet(userId, selectedIntake.id, Period.Daily).then((createdDiet) => {
        setSelectedIntake(null);
        setDiets((diets) => [...diets, createdDiet]);
      });
      setIntakes((_intakes) =>
        _intakes.map((intake) => (intake.id === id ? { ...intake, diet: true } : intake))
      );
    }
  }, [selectedIntake]);

  return (
    <BoxContainer style={{ minHeight: 476, justifyContent: 'flex-start' }}>
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
                        dietAlreadyCreated(row) ? (
                          <div style={{ opacity: '0.4' }}>Diet already created</div>
                        ) : (
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                              setSelectedIntake(row);
                            }}
                          >
                            Create diet
                          </Link>
                        )
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
        rowsPerPageOptions={[5, 10, 25, 100]}
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
