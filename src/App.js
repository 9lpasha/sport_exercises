import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

let dataset = require('./assets/dataset_sorted.json');

console.log(dataset.filter(item => item.bodyPart === 'cardio'))

const gpt_func = (pycharm_line) => {
    const num_s = pycharm_line + 1
    const num_f = num_s + 100
    const res = "Can you estimate the difficulty from 1 to 10 of sports exercises for average 20 years male and return the resulting dataset in csv format: " +
        dataset.slice(num_s, num_f)
}

/*console.log("I need to assess the difficulty and energy consumption of sports exercises, let's say that the exercises are performed by 20-year-old young people of average build. Can you estimate the difficulty from 1 to 10 and energy from 1 to 10 of sports exercises and return the resulting dataset in csv format: " +
    JSON.stringify(dataset.sort((a, b) => a < b ? 1 : -1).map(i => i.name)));*/

function App() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(dataset.slice(0, 20));

    useEffect(() => {
        setData(dataset.slice((page - 1) * 20, page * 20));
    }, [page]);

    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://185.225.35.213:3000/',
            withCredentials: true,
        });

        instance.post('auth/in', {
            email: '131313pasha@mail.ru',
            password: '1234'
        })
    }, []);

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
                                <div>Difficulty: <b>{item.difficulty}</b></div>
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
