import { Button, CircularProgress } from '@mui/material';
import moment from 'moment';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { getDietById, getUserByIdQuery } from '../../store/atoms/dietAtoms';
import { Intake, Comment as CommentType } from '../../types/types';
import { Comment } from '../Comment/Comment';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart';
import { CommentForm } from '../CommentForm/CommentForm';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { likeDiet, saveDiet } from '../../api/api';

export const DietDetails = () => {
  const { dietId } = useParams<{ dietId: string }>();
  const diet = useRecoilValue(getDietById(dietId));
  const user = useRecoilValue(getUserByIdQuery(diet.creatorId));

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [likes, setLikes] = useState(diet.likedBy?.length ?? 0);

  const userName = user.email.substring(0, user.email.lastIndexOf('@'));

  useEffect(() => {
    if (!diet.comments.length) {
      return;
    }

    setComments(
      diet.comments
        .map((comment) => comment)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    );
  }, []);

  useEffect(() => {
    if (!diet.likedBy.length) {
      return;
    }

    setAlreadyLiked(diet.likedBy.some(({ id }) => id == user.id));
  }, []);

  useEffect(() => {
    if (!diet.savedBy.length) {
      return;
    }

    setAlreadySaved(diet.savedBy.some(({ id }) => id == user.id));
  }, []);

  const handleLike = async () => {
    await likeDiet(user.id, dietId);

    setLikes((prev) => (alreadyLiked ? prev - 1 : prev + 1));

    setAlreadyLiked((prev) => !prev);
  };

  const handleSave = async () => {
    await saveDiet(user.id, dietId);

    setAlreadySaved((prev) => !prev);
  };

  const likeButton = alreadyLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />;
  const saveButton = alreadySaved ? <GradeIcon /> : <GradeOutlinedIcon />;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2
          className="page-header"
          style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
        >
          <div>{`${userName}'s Diet`}</div>
          <div style={{ fontSize: '1rem', marginLeft: '1rem' }}>{`(${likes} ${
            likes > 1 ? 'likes' : 'like'
          })`}</div>
        </h2>
        <div style={{ display: 'flex' }}>
          <Button
            sx={{ height: 'fit-content', borderRadius: '10px' }}
            variant="text"
            startIcon={likeButton}
            onClick={handleLike}
          >
            Like
          </Button>
          <Button
            sx={{ height: 'fit-content', borderRadius: '10px' }}
            variant="text"
            startIcon={saveButton}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      <div
        className="page-header"
        style={{ marginTop: '-30px', fontSize: '0.8rem', textTransform: 'none' }}
      >
        Created at {moment(diet.createdAt).format('Do MMM YYYY, HH:mm')}
      </div>
      <div style={{ display: 'flex' }}>
        <BoxContainer style={{ maxWidth: '30%' }}>
          <h3>Intake</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h5 style={{ margin: '2rem 1rem' }}>Total: {diet.intake.calorie} kcal</h5>
            <DoughnutChart data={diet.intake as Intake} />
          </div>
        </BoxContainer>
        <BoxContainer style={{ justifyContent: 'flex-start' }}>
          <h3>Comments</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              minWidth: '500px',
              maxHeight: '450px',
              overflowY: 'scroll'
            }}
          >
            {comments.length ? (
              comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })
            ) : (
              <div style={{ margin: '1rem' }}>No comments yet</div>
            )}
          </div>
        </BoxContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Add comment</h3>
        <CommentForm dietId={dietId} setComments={setComments} />
      </div>
    </>
  );
};

export const DietDetailsPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DietDetails />
    </Suspense>
  );
};
