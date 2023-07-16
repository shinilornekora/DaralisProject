import './App.css';
import { useEffect, useState } from "react";
import api from './apis'

function App() {
  const [currentTable, setCurrentTable] = useState('');
  const [tableInfo, setTableInfo] = useState([]);
  useEffect( () => {
      async function fetchData() {
          try {
              if (api[currentTable]) {
                  const result = await api[currentTable].element;
                  setTableInfo(result.data);
              }
          } catch (error) {
              console.log(error);
          }
      }
      fetchData();
  }, [currentTable])
  return (
    <div className="App">
      <select onChange={(event) => setCurrentTable(event.target.value)} name="service" id="entities">
        <option value="character">Персонажи</option>
        <option value="quest">Задания</option>
        <option value="location">Локация</option>
        <option value="item">Вещи</option>
      </select>
      <div className="mainInfo">
        {
          tableInfo?.map((element) => {
            return (
                <div key={element} className="element__container">
                  {Object.entries(element)[0]}
                    <div className="actionButtons">
                        <button className="action__1">Посмотреть</button>
                        <button className="action__2">Удалить</button>
                    </div>
                </div>
            );

          })
        }
      </div>
    </div>
  );
}

export default App;
