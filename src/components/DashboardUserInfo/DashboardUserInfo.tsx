import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { currentUserState } from '../../store/atoms/userAtoms';
import { measurementsState } from '../../store/atoms/weightAtoms';
import { Person, ContactMail, AlternateEmail, Scale, QueryBuilder } from '@mui/icons-material';

export const DashboardUserInfo = () => {
  const user = useRecoilValue(currentUserState);
  const measurements = useRecoilValue(measurementsState);

  const style = () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  });

  const flex = () => ({
    display: 'flex',
    alignItems: 'center'
  });

  return (
    <BoxContainer
      style={{
        justifyContent: 'flex-start',
        maxHeight: 210
      }}
    >
      <h3 style={flex()}>
        <Person fontSize="medium" style={{ marginRight: '0.5rem' }} />
        Personal information
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1.1rem',
          marginTop: '1rem',
          width: '100%',
          alignItems: 'flex-start'
        }}
      >
        <div style={style()}>
          <div style={flex()}>
            <ContactMail fontSize="small" style={{ marginRight: '0.5rem' }} />
            Name:
          </div>
          <div>{user.firstName + ' ' + user.lastName}</div>
        </div>
        <div style={style()}>
          <div style={flex()}>
            <AlternateEmail fontSize="small" style={{ marginRight: '0.5rem' }} />
            Email:
          </div>
          <div>{user.email}</div>
        </div>
        <div style={style()}>
          <div style={flex()}>
            <Scale fontSize="small" style={{ marginRight: '0.5rem' }} />
            Last measurement:
          </div>
          <div>
            {measurements[0]?.createdAt
              ? moment(measurements[0].createdAt).format('Do MMM, YYYY')
              : '-'}
          </div>
        </div>
        <div style={style()}>
          <div style={flex()}>
            <QueryBuilder fontSize="small" style={{ marginRight: '0.5rem' }} />
            Registered at:
          </div>
          <div>{moment(user.createdAt).format('Do MMM, YYYY')}</div>
        </div>
      </div>
    </BoxContainer>
  );
};
