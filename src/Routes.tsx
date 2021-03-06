import { Redirect, Route, Switch } from 'react-router-dom';
import { WeightTracker } from './pages/WeightTracker';
import { CalorieIntake } from './pages/CalorieIntake';
import { Dashboard } from './pages/Dashboard';
import { MyDiets } from './pages/MyDiets';
import { SavedDiets } from './pages/SavedDiets';
import { BrowseDiets } from './pages/BrowseDiets';
import { PersonalRecommendations } from './pages/PersonalRecommendations';
import { MyProfile } from './pages/MyProfile';
import { DietDetailsPage } from './components/DietDetails/DietDetails';
import { LayoutSwitch } from './layouts/LayoutSwitch';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/calorie-intake" component={CalorieIntake} />
      <Route path="/weight-tracker" component={WeightTracker} />
      <Route path="/diets/:dietId" component={DietDetailsPage} />
      <Route path="/my-diets" component={MyDiets} />
      <Route path="/saved-diets" component={SavedDiets} />
      <Route path="/browse-diets" component={BrowseDiets} />
      <Route path="/personal-recommendations" component={PersonalRecommendations} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/logout" component={LayoutSwitch} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
