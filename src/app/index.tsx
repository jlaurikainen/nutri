import { DailyMacros } from "../components/home/daily-macros";
import { DailyMeals } from "../components/home/daily-meals";
import { Page } from "../components/ui/page";

const Home = () => {
  return (
    <Page>
      <DailyMacros />
      <DailyMeals />
    </Page>
  );
};

export default Home;
