import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>random data</h3>
            </div>
            <div className="card__body"></div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>random data2</h3>
            </div>
            <div className="card__body"></div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
