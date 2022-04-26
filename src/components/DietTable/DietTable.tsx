import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { Period } from '../../enums/enums';
import { Comment, Diet } from '../../types/types';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Data {
  calorie: number;
  carbs: number;
  fat: number;
  protein: number;
  createdAt: Date;
  period: Period;
  likedBy: any[];
  comments: Comment[];
  action: any;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a: any, b: any, orderBy: keyof any) {
  if (
    orderBy !== 'createdAt' &&
    orderBy !== 'period' &&
    orderBy !== 'likedBy' &&
    orderBy !== 'comments'
  ) {
    if (b.intake[orderBy] < a.intake[orderBy]) {
      return -1;
    }
    if (b.intake[orderBy] > a.intake[orderBy]) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'CreatedAt'
  },
  { id: 'period', numeric: false, disablePadding: false, label: 'Period' },
  {
    id: 'calorie',
    numeric: true,
    disablePadding: false,
    label: 'Calories'
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)'
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)'
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)'
  },
  {
    id: 'likedBy',
    numeric: true,
    disablePadding: false,
    label: 'Likes'
  },
  {
    id: 'comments',
    numeric: true,
    disablePadding: false,
    label: 'Comments'
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  toolbarText: string;
}

const EnhancedTableToolbar = ({ toolbarText }: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {toolbarText}
      </Typography>
    </Toolbar>
  );
};

interface DietTableProps {
  diets: Diet[];
  toolbarText?: string;
}

export const DietTable = ({ diets, toolbarText = 'Diet List' }: DietTableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty diets.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - diets.length) : 0;

  return (
    <Paper
      sx={{
        width: '100%',
        boxShadow:
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        borderRadius: '20px',
        border: '1px solid #e0e0e0'
      }}
    >
      <EnhancedTableToolbar toolbarText={toolbarText} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {diets
              .slice()
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.createdAt.toString()}>
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      {moment(row.createdAt).format('YYYY MMMM Do, HH:mm')}
                    </TableCell>
                    <TableCell align="left">{row.period}</TableCell>
                    <TableCell align="left">{row.intake.calorie}</TableCell>
                    <TableCell align="left">{row.intake.fat}</TableCell>
                    <TableCell align="left">{row.intake.carbs}</TableCell>
                    <TableCell align="left">{row.intake.protein}</TableCell>
                    <TableCell align="left">{row.likedBy.length}</TableCell>
                    <TableCell align="left">{row.comments.length}</TableCell>
                    <TableCell align="left">
                      <Link to={`/diets/${row.id}`} key={index * Math.random()}>
                        <Typography variant="inherit" color="#349eff">
                          View
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={diets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
