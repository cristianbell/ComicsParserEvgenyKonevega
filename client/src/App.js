import './App.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function App() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/feed')
      .then(res => res.json())
      .then(
        (result) => {
          setFeed(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  const renderFeed = feed.map(({ id, title, description, date, url, link }) => {
    const comicDate = dayjs(date).format('MM-DD-YYYY');
    return (
      <div key={id} className="container">

        <div className="container-header">

          <a href={link} target="_blank" rel="noreferrer" className="container-header-title">#{id} {title}</a>
          <span className="container-header-date">{comicDate}</span>
        </div>

        <img className="container-image" src={url} alt="comic"/>

        <div className="container-description">
          <p>{description}</p>
        </div>

      </div>);
  });

  return (
    <div className="App">
      {renderFeed}
    </div>
  );
}

export default App;
