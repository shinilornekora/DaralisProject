import './App.css';
import { useEffect, useState } from "react";
import api from './apis'

function App() {
    const [currentTable, setCurrentTable] = useState('');
    const [tableFullInfo, setTableFullInfo] = useState([]);
    const [tablePrimaryKey, setTablePrimaryKey] = useState([]);
    const [selectedElement, setSelectedElement] = useState({});
    const [currentMode, setCurrentMode] = useState('');
    const formData = {};
    useEffect( () => {
        async function fetchData() {
            try {
                if (currentTable !== 'no-value') {
                    const result = await api.table.element(currentTable);
                    setTableFullInfo(result.data);
                    switch(currentTable) {
                        case 'character':
                            setTablePrimaryKey(result.data.map((e) => {
                                return e.name
                            }));
                            break;
                        case 'quest':
                            setTablePrimaryKey(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        case 'location':
                            setTablePrimaryKey(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        case 'item':
                            setTablePrimaryKey(result.data.map((e) => {
                                return e.name;
                            }))
                            break;
                        default:
                          setTablePrimaryKey([]);
                    }
                }
            } catch (error) {
                console.log(error);
                setTablePrimaryKey([]);
            }
        }
        fetchData().then(r => r);
    }, [currentTable])

    function deleteQuery(params) {
      try {
          api.table.delete(currentTable, params).then(r => r);
      } catch (error) {
          console.log(error)
      }
    }

    function handleSelection(primary) {
        for (let i = 0; i < tableFullInfo.length; i++) {
            if (tableFullInfo[i]['name'] === primary) {
                setSelectedElement(tableFullInfo[i])
                setCurrentMode('view');
                return;
            }
        }
        setSelectedElement({});
    }

    function handleRedaction(primary) {
        setCurrentMode('edit')
        for (let i = 0; i < tableFullInfo.length; i++) {
            if (tableFullInfo[i]['name'] === primary) {
                setSelectedElement(tableFullInfo[i])
                return;
            }
        }
        setSelectedElement({});
    }

    function convertToNumber(str) {
        const num = Number(str);
        return isNaN(num) ? str : num;
    }

    function sendRedactionRequest() {
        const formInputs = document.forms["viewItem"].getElementsByTagName("input");
        for (let i = 0; i < formInputs.length; i++) {
            let input = formInputs[i];
            if (input.value) {
                formData[input.name.replace(/"/g, '')] = convertToNumber(input.value);
            }
        }
        api.table.update(currentTable, formData).then(r => r).catch((e) => e);
        Object.keys(formData).forEach(key => delete formData[key]);
    }

    function sendAddRequest() {
        const formInputs = document.forms["viewItem"].getElementsByTagName("input");
        for (let i = 0; i < formInputs.length; i++) {
            let input = formInputs[i];
            if (input.value) {
                formData[input.name.replace(/"/g, '')] = convertToNumber(input.value);
            }
        }
        api.table.add(currentTable, formData).then(r => r);
        Object.keys(formData).forEach(key => delete formData[key]);
    }

  return (
      <div className="App">
           <div className="input__field">
               {
                   currentTable ? (
                       <button onClick={() => setCurrentMode('add')}>
                        Добавить
                       </button>
                   ) : null
               }
               <select onChange={(event) => {
                   setCurrentTable(event.target.value)
                   setSelectedElement({});
               }} name="service" id="entities">
                   <option value="no-value" defaultValue></option>
                   <option value="character">Персонажи</option>
                   <option value="quest">Задания</option>
                   <option value="location">Локация</option>
                   <option value="item">Вещи</option>
               </select>
               <div className="mainInfo">
                   { tablePrimaryKey.length ?
                       tablePrimaryKey.map((element) => {
                           return (
                               <div key={element} className="element__container">
                                   {element}
                                   <div className="actionButtons">
                                       <button onClick={() => handleSelection(element)} className="action__1">Посмотреть</button>
                                       <button onClick={() => handleRedaction(element)} className="action__1">Редактировать</button>
                                       <button onClick={() => deleteQuery({key: element})}  className="action__2">Удалить</button>
                                   </div>
                               </div>
                           );
                            }) : 'Информации нет.'
                   }
               </div>
           </div>

          { selectedElement.name && currentMode === 'view' ? (
              <div className="viewItem">
                  {Object.entries(selectedElement ?? []).map((element) =>
                      <section className="viewItemField">
                          <div className="viewItemFieldLabel">
                              {JSON.stringify(element[0])}:
                          </div>
                          <div className="viewItemFieldValue">
                              {JSON.stringify(element[1])}
                          </div>
                      </section>
                  )
                  }
              </div>
          ) : null
          }

          { selectedElement.name && currentMode === 'edit' ? (
              <form className="viewItem" id="viewItem" onSubmit={(event) => event.preventDefault()}>
                  {Object.entries(selectedElement ?? []).map((element) =>
                      <section className="viewItemField">
                          <div className="viewItemFieldLabel">
                              {JSON.stringify(element[0])}:
                          </div>
                          <input name={JSON.stringify(element[0])} className="viewItemFieldValue" defaultValue={JSON.stringify(element[1])}/>
                      </section>
                  )
                  }
                  <button onClick={() => sendRedactionRequest()}>Изменить</button>
              </form>
          ) : null
          }

          { selectedElement.name && currentMode === 'add' ? (
              <form className="viewItem" id="viewItem" onSubmit={(event) => event.preventDefault()}>
                  {Object.entries(selectedElement ?? []).map((element) =>
                      <section className="viewItemField">
                          <div className="viewItemFieldLabel">
                              {JSON.stringify(element[0])}:
                          </div>
                          <input name={JSON.stringify(element[0])} className="viewItemFieldValue"/>
                      </section>
                  )
                  }
                  <button onClick={() => sendAddRequest()}>Добавить</button>
              </form>
          ) : null
          }
       </div>
  );
}

export default App;
