import { Avatar } from '@mui/material';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { getUserByIdQuery } from '../../store/atoms/dietAtoms';
import { Comment as _Comment } from '../../types/types';

interface CommentProps {
  comment: _Comment;
}

export const Comment = ({ comment }: CommentProps) => {
  const user = useRecoilValue(getUserByIdQuery(comment.userId));
  const userName = user.firstName + ' ' + user.lastName;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        marginTop: '1rem',
        marginBottom: '1rem'
      }}
    >
      <Avatar {...stringAvatar(userName)} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            marginLeft: '2rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            wordBreak: 'break-word'
          }}
        >
          {comment.comment}
        </div>
        <div style={{ opacity: '0.7', minWidth: '165px' }}>
          {moment(comment.createdAt).format('Do MMM YYYY, HH:mm')}
        </div>
      </div>
    </div>
  );
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}
