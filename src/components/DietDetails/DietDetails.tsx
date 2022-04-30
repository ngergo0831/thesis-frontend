import { Button, CircularProgress } from '@mui/material';
import moment from 'moment';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { Intake, Comment as CommentType } from '../../types/types';
import { Comment } from '../Comment/Comment';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart';
import { CommentForm } from '../CommentForm/CommentForm';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { likeDiet, saveDiet } from '../../api/api';
import { currentDietState, currentDietUserQuery, dietsState } from '../../store/atoms/dietAtoms';
import { DietPeriodBadge } from '../DietPeriodBadge/DietPeriodBadge';
import { currentUserState } from '../../store/atoms/userAtoms';
import { currentPageState } from '../../store/atoms/pageAtoms';

export const DietDetails = () => {
  const { dietId } = useParams<{ dietId: string }>();
  const diet = useRecoilValue(currentDietState(dietId));
  const setDietsState = useSetRecoilState(dietsState);
  const creator = useRecoilValue(currentDietUserQuery(diet?.creatorId));
  const currentUser = useRecoilValue(currentUserState);

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const userName = creator?.email.substring(0, creator?.email.lastIndexOf('@'));

  const likeButton = alreadyLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />;
  const saveButton = alreadySaved ? <GradeIcon /> : <GradeOutlinedIcon />;

  const ownDiet = diet?.creatorId === currentUser?.id;

  useEffect(() => {
    if (!diet?.comments.length) {
      return;
    }

    setComments(diet.comments);
  }, [diet]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (diet?.likedBy.some((user) => user.id === currentUser.id)) {
      setAlreadyLiked(true);
    }

    if (diet?.savedBy.some((user) => user.id === currentUser.id)) {
      setAlreadySaved(true);
    }
  }, [currentUser]);

  const handleComments = (comment: CommentType) => {
    setComments((prev) => [comment, ...prev]);
    setDietsState((myDiets) => {
      return [...myDiets].map((_diet) => {
        if (_diet.id === dietId) {
          return { ..._diet, comments: [comment, ...comments] };
        }
        return _diet;
      });
    });
  };

  const handleLike = async () => {
    await likeDiet(currentUser.id, dietId);

    if (alreadyLiked) {
      setDietsState((myDiets) => {
        return [...myDiets].map((_diet) => {
          if (_diet.id === dietId) {
            const updatedLikedBy = _diet.likedBy.filter(({ id }) => id !== currentUser.id);
            return { ..._diet, likedBy: updatedLikedBy };
          }
          return _diet;
        });
      });
    } else {
      setDietsState((myDiets) => {
        return [...myDiets].map((_diet) => {
          if (_diet.id === dietId) {
            return { ..._diet, likedBy: [..._diet.likedBy, currentUser] };
          }
          return _diet;
        });
      });
    }

    setAlreadyLiked((prev) => !prev);
  };

  const handleSave = async () => {
    await saveDiet(currentUser.id, dietId);

    if (alreadySaved) {
      setDietsState((myDiets) => {
        return [...myDiets].map((_diet) => {
          if (_diet.id === dietId) {
            const updatedSavedBy = _diet.savedBy.filter(({ id }) => id !== currentUser.id);
            return { ..._diet, savedBy: updatedSavedBy };
          }
          return _diet;
        });
      });
    } else {
      setDietsState((myDiets) => {
        return [...myDiets].map((_diet) => {
          if (_diet.id === dietId) {
            return { ..._diet, savedBy: [..._diet.savedBy, currentUser] };
          }
          return _diet;
        });
      });
    }

    setAlreadySaved((prev) => !prev);
  };

  return diet ? (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2
          className="page-header"
          style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
        >
          <div>{currentUser.id === diet.creatorId ? 'My Diet' : `${userName}'s Diet`}</div>
          <div style={{ fontSize: '1rem', marginLeft: '1rem' }}>{`(${diet.likedBy.length} ${
            diet.likedBy.length > 1 ? 'likes' : 'like'
          })`}</div>
          <DietPeriodBadge label={diet.period} />
        </h2>
        <div style={{ display: 'flex' }}>
          <Button
            sx={{ height: 'fit-content', borderRadius: '10px' }}
            variant="text"
            startIcon={likeButton}
            onClick={handleLike}
            disabled={ownDiet}
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
              maxHeight: '400px',
              overflowY: 'scroll'
            }}
          >
            {comments.length ? (
              comments
                .map((comment) => comment)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((comment) => {
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
        <CommentForm dietId={dietId} setComments={handleComments} />
      </div>
    </>
  ) : (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70vh'
      }}
    >
      <CircularProgress />
    </div>
  );
};

export const DietDetailsPage = () => {
  const setPageHeader = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPageHeader('Diet Details');
  }, []);

  return (
    <Suspense fallback={<CircularProgress />}>
      <DietDetails />
    </Suspense>
  );
};
