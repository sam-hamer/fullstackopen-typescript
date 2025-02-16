import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
  });

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        console.log(response.data);
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
      });
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, date: event.target.value });
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewEntry({ ...newEntry, visibility: event.target.value as Visibility });
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, weather: event.target.value as Weather });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, comment: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", newEntry)
      .then((response) => {
        setEntries([...entries, response.data]);
        setNewEntry({
          date: "",
          weather: Weather.Sunny,
          visibility: Visibility.Great,
          comment: "",
        });
      })
      .catch((error) => {
        console.error("Error adding entry:", error);
      });
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Visibility</label>
          <div>
            {Object.values(Visibility).map((visibility) => (
              <div key={visibility}>
                <input
                  type="radio"
                  id={`visibility-${visibility}`}
                  name="visibility"
                  value={visibility}
                  checked={newEntry.visibility === visibility}
                  onChange={handleVisibilityChange}
                />
                <label htmlFor={`visibility-${visibility}`}>{visibility}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Weather</label>
          <div>
            {Object.values(Weather).map((weather) => (
              <div key={weather}>
                <input
                  type="radio"
                  id={`weather-${weather}`}
                  name="weather"
                  value={weather}
                  checked={newEntry.weather === weather}
                  onChange={handleWeatherChange}
                />
                <label htmlFor={`weather-${weather}`}>{weather}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            value={newEntry.comment}
            onChange={handleCommentChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <h1>Diary Entries</h1>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>weather: {entry.weather}</p>
            <p>visibility: {entry.visibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
