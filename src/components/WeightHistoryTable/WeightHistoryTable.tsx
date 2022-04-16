import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Measurement } from '../../types/types';
import { BoxContainer } from '../../GlobalStyles';
import { useState } from 'react';
import { Link, Toolbar, Typography } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { measurementsState } from '../../store/atoms/weightAtoms';
import { WeightHistoryModal } from '../WeightHistoryModal/WeightHistoryModal';
import { modifyMeasurement } from '../../api/api';
import moment from 'moment';

interface WeightHistoryTableProps {
  measurements: Measurement[];
}

interface Column {
  id: 'createdAt' | 'weight' | 'link';
  label: string;
  minWidth?: number;
  align?: 'center' | 'right' | 'left';
  format?: (value: Date) => string;
}

const columns: readonly Column[] = [
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 200,
    align: 'left',
    format: (value: Date) => moment(value).format('YYYY-MM-DD HH:mm')
  },
  { id: 'weight', label: 'Weight', minWidth: 150, align: 'center' },
  {
    id: 'link',
    label: 'Action',
    align: 'center',
    minWidth: 100
  }
];

export const WeightHistoryTable = ({ measurements }: WeightHistoryTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement>();
  const [weight, setWeight] = useState(0);

  const setMeasurements = useSetRecoilState(measurementsState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    setOpen(false);
    setSelectedMeasurement(undefined);
    setWeight(0);
  };

  const handleSave = async () => {
    await modifyMeasurement({ ...selectedMeasurement, weight });
    editMeasurementState(weight);
    handleCancel();
  };

  const editMeasurementState = (weight: number) => {
    const index = measurements.indexOf(selectedMeasurement);
    const modifiedMeasurements = replaceItemAtIndex(measurements, index, {
      ...selectedMeasurement,
      weight
    });

    setMeasurements(modifiedMeasurements);
  };

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
          Measurement history
        </Typography>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Measurements">
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
            {measurements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                  {columns.map((column) => {
                    const value =
                      column.id === 'link' ? (
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setSelectedMeasurement(row);
                            handleOpen();
                          }}
                        >
                          Edit
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
        count={measurements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {open && (
        <WeightHistoryModal
          onClose={handleClose}
          open={open}
          selectedMeasurement={selectedMeasurement}
          handleCancel={handleCancel}
          handleSave={handleSave}
          setWeight={setWeight}
        />
      )}
    </BoxContainer>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
