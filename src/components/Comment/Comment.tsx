import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { currentDietUserQuery } from '../../store/atoms/dietAtoms';
import { Comment as _Comment } from '../../types/types';
import { Avatar } from '../Avatar/Avatar';

interface CommentProps {
  comment: _Comment;
}

export const Comment = ({ comment }: CommentProps) => {
  const user = useRecoilValue(currentDietUserQuery(comment.userId));
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
      <Avatar userName={userName} />
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
