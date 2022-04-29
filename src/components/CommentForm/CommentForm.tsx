import { Button, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { createComment } from '../../api/api';
import { currentUserState } from '../../store/atoms/userAtoms';
import { Comment } from '../../types/types';
import { Avatar } from '../Avatar/Avatar';

interface CommentFormProps {
  dietId: string;
  setComments: (comment: Comment) => void;
}

export const CommentForm = ({ dietId, setComments }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const user = useRecoilValue(currentUserState);
  const userName = user.firstName + ' ' + user.lastName;

  const handleCreateComment = async () => {
    const newComment = await createComment(user.id, dietId, comment);
    setComments(newComment);
    setComment('');
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar userName={userName} />
        <TextareaAutosize
          maxRows={4}
          minRows={4}
          placeholder="Add comment..."
          maxLength={100}
          style={{ width: '100%', marginLeft: '1rem' }}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <div
        style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateComment}
          disabled={comment.length < 2}
        >
          Add comment
        </Button>
      </div>
    </>
  );
};
