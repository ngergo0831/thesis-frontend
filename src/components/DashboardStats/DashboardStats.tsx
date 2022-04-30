import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { currentUserIdState } from '../../store/atoms/userAtoms';
import {
  countDietsLikedByOthers,
  countDietsSavedByOthers,
  countMyLikes,
  myDietsState,
  savedDietsState
} from '../../store/atoms/dietAtoms';
import {
  BarChart,
  MenuBook,
  BookmarkAdded,
  Bookmarks,
  ThumbUp,
  Recommend
} from '@mui/icons-material';

export const DashboardStats = () => {
  const userId = useRecoilValue(currentUserIdState);
  const myDiets = useRecoilValue(myDietsState(userId));
  const userSavedDiets = useRecoilValue(savedDietsState(userId));
  const countOthersSavedMyDiets = useRecoilValue(countDietsSavedByOthers(userId));
  const countOthersLikedMyDiets = useRecoilValue(countDietsLikedByOthers(userId));
  const countMyLikesNumber = useRecoilValue(countMyLikes(userId));

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    fontWeight: '500'
  };

  const flex = () => ({
    display: 'flex',
    alignItems: 'center'
  });

  return (
    <BoxContainer style={{ justifyContent: 'flex-start', maxHeight: 210 }}>
      <h3 style={flex()}>
        <BarChart fontSize="medium" style={{ marginRight: '0.5rem' }} />
        Statistics
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1rem',
          width: '100%',
          alignItems: 'flex-start'
        }}
      >
        <div style={style}>
          <div style={flex()}>
            <MenuBook fontSize="medium" style={{ marginRight: '0.5rem' }} />
            My diets:
          </div>
          <div>{myDiets?.length ?? 0}</div>
        </div>
        <div style={style}>
          <div style={flex()}>
            <BookmarkAdded fontSize="medium" style={{ marginRight: '0.5rem' }} />
            Saved diets:
          </div>
          <div>{userSavedDiets?.length ?? 0}</div>
        </div>
        <div style={style}>
          <div style={flex()}>
            <Bookmarks fontSize="medium" style={{ marginRight: '0.5rem' }} />
            Saved by others:
          </div>
          <div>{countOthersSavedMyDiets ?? 0}</div>
        </div>
        <div style={style}>
          <div style={flex()}>
            <ThumbUp fontSize="medium" style={{ marginRight: '0.5rem' }} />
            Likes:
          </div>
          <div>{countMyLikesNumber ?? 0}</div>
        </div>
        <div style={style}>
          <div style={flex()}>
            <Recommend fontSize="medium" style={{ marginRight: '0.5rem' }} />
            Liked by others:
          </div>
          <div>{countOthersLikedMyDiets ?? 0}</div>
        </div>
      </div>
    </BoxContainer>
  );
};
