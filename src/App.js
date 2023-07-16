import './App.css';
import { useEffect, useState } from "react";
import api from './apis'

function App() {
    const [currentTable, setCurrentTable] = useState('');
    const [tableInfo, setTableInfo] = useState([]);
    useEffect( () => {
        async function fetchData() {
            try {
                if (currentTable !== 'no-value') {
                    const result = await api.table.element(currentTable);
                    switch(currentTable) {
                        case 'character':
                            setTableInfo(result.data.map((e) => {
                                console.log(e.name);
                                return e.name
                            }));
                            break;
                        case 'quest':
                            setTableInfo(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        case 'location':
                            setTableInfo(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        case 'item':
                            setTableInfo(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        default:
                          setTableInfo([]);
                    }
                }
            } catch (error) {
                console.log(error);
                setTableInfo([]);
            }
        }
        fetchData();
    }, [currentTable])

    function deleteQuery(params) {
      try {
          api.table.delete(currentTable, params);
      } catch (error) {
          console.log(error)
      }
    }

  return (
      <div className="App">
           <div className="input__field">
               <select onChange={(event) => setCurrentTable(event.target.value)} name="service" id="entities">
                   <option value="no-value" defaultValue></option>
                   <option value="character">Персонажи</option>
                   <option value="quest">Задания</option>
                   <option value="location">Локация</option>
                   <option value="item">Вещи</option>
               </select>
               <div className="mainInfo">
                   { tableInfo.length ?
                       tableInfo.map((element) => {
                           return (
                               <div key={element} className="element__container">
                                   {element}
                                   <div className="actionButtons">
                                       <button className="action__1">Посмотреть</button>
                                       <button onClick={() => deleteQuery({key: element})}  className="action__2">Удалить</button>
                                   </div>
                               </div>
                           );
                            }) : 'Информации нет.'
                   }
               </div>
           </div>
       </div>
  );
}

export default App;
