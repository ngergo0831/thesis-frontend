import { CircularProgress } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { dietsState } from '../../store/atoms/dietAtoms';
import { currentUserIdState } from '../../store/atoms/userAtoms';
import { Comment as CommentType } from '../../types/types';
import { Comment } from '../Comment/Comment';

export const DashboardComments = () => {
  const diets = useRecoilValue(dietsState);
  const [comments, setComments] = useState<CommentType[]>([]);
  const currentUserId = useRecoilValue(currentUserIdState);

  useEffect(() => {
    if (!diets?.length) {
      return;
    }

    const dietsComments = diets
      .map((diet) => {
        return diet.comments;
      })
      .flat();

    setComments(dietsComments);
  }, [diets]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minWidth: '500px',
        maxHeight: '400px',
        overflowY: 'scroll'
      }}
    >
      {comments.length ? (
        comments
          .map((comment) => comment)
          .filter((comment) => comment.userId !== currentUserId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })
      ) : (
        <div style={{ margin: '1rem' }}>No comments yet</div>
      )}
    </div>
  );
};

export const DashboardCommentsContainer = () => {
  return (
    <BoxContainer style={{ width: '66%' }}>
      <h3>Latest comments</h3>
      <Suspense fallback={<CircularProgress />}>
        <DashboardComments />
      </Suspense>
    </BoxContainer>
  );
};
