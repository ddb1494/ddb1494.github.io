import ReactDOM from 'react-dom/client';

import Theme from '@src/Theme';
import Query from '@src/Query';
import Routes from '@src/Routes';
// import Progress from '@src/Progress';


import '@src/main.scss';

const Main = () => {
  return (
    <Theme>
      <Query>
        <Routes />
      </Query>
      {/* <Progress /> */}
    </Theme>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />,
);
