import './App.css';
import {useEffect, useState} from "react";

const dataset = require('./assets/csvjson.json');
console.log(dataset)

function App() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(dataset.slice(0, 20));

    useEffect(() => {
        setData(dataset.slice((page - 1) * 20, page * 20));
    }, [page]);

    return (
        <div className="App">
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '20px'}}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>
                <div>{page}</div>
                <button disabled={page === 67} onClick={() => setPage(page + 1)}>{">"}</button>
                Всего 67 страниц
            </div>
            <div>
                {
                    data.map((item, index) => (
                        <div style={{
                            border: '2px solid black', padding: '5px', margin: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: 'fit-content'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    fontSize: '30px',
                                    fontWeight: 600,
                                    top: '50px',
                                    left: '200px'
                                }}>{(page - 1) * 20 + index + 1}</div>
                                <div>ID: <b>{item.id}</b></div>
                                <div>Name: <b>{item.name}</b></div>
                                <div>Target: <b>{item.target}</b></div>
                                <div>Body part: <b>{item.bodyPart}</b></div>
                                <div>Equipment: <b>{item.equipment}</b></div>
                            </div>
                            <img src={item.gifUrl} alt=""/>
                        </div>
                    ))
                }
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '20px'}}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>
                <div>{page}</div>
                <button disabled={page === 67} onClick={() => setPage(page + 1)}>{">"}</button>
                Всего 67 страниц
            </div>
        </div>
    );
}

export default App;
