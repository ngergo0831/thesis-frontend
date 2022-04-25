import { Button, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { createComment } from '../../api/api';
import { getUserByIdQuery } from '../../store/atoms/dietAtoms';
import { Avatar } from '../Avatar/Avatar';

interface CommentFormProps {
  dietId: string;
  setComments: (e) => void;
}

export const CommentForm = ({ dietId, setComments }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const userId = '8ecaeef8-5cec-479f-83c7-0b3a884df8c0';
  const user = useRecoilValue(getUserByIdQuery(userId));
  const userName = user.firstName + ' ' + user.lastName;

  const handleCreateComment = async () => {
    const newComment = await createComment(userId, dietId, comment);
    setComments((prev) => [newComment, ...prev]);
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
