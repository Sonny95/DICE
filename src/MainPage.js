import defaultDice from '../src/resources/img/defaultDice.png'

import dice1 from '../src/resources/img/dice1.png'
import dice2 from '../src/resources/img/dice2.png'
import dice3 from '../src/resources/img/dice3.png'
import dice4 from '../src/resources/img/dice4.png'
import dice5 from '../src/resources/img/dice5.png'
import dice6 from '../src/resources/img/dice6.png'
import {Button, Select} from 'antd';
import {useState} from "react";

const {Option} = Select;

const MainPage = () => {


    const [page, setPage] = useState('main');

    const [dice, setDice] = useState(0);
    const [checked, setChecked] = useState([]);


    function handleChange(value) {
        setChecked([])
        setDice(value.value)
    }

    const clickDice = (param) => {
        const getValue = getRandomInt(6) + 1;


        const copyChecked = [...checked];
        copyChecked.push({dice: param, dot: getValue});
        setChecked(copyChecked);
    }
    const displayRandomDice = (result) => {


        let bowl = <></>
        switch (result[0].dot) {
            case 1 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice1} alt=""/></div>
                break;
            case 2 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice2} alt=""/></div>
                break;
            case 3 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice3} alt=""/></div>
                break;
            case 4 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice4} alt=""/></div>
                break;
            case 5 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice5} alt=""/></div>
                break;
            case 6 :
                bowl = <div style={{width: '100%'}}><img style={{width: 80}} src={dice6} alt=""/></div>
                break;

        }
        return bowl
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const displayDice = (diceNumb, checkList) => {


        let imageTag = [];

        for (let i = 0; i < diceNumb; i++) {
            imageTag.push(<div style={{width: '100%'}}><img style={{cursor: 'pointer'}} onClick={() => clickDice(i)}
                                                            src={defaultDice} width={100} alt=""/></div>)
        }


        return imageTag.map((value, idx) => {
            console.log('안타진다!!!');

            const result = checkList.filter(src => src.dice === idx);
            if (result.length) {
                return displayRandomDice(result);
            } else {
                return value
            }
        })
    }

    const reward = (diceList) => {

        const dotList = diceList.map(value => {
            return value.dot
        })

        const duplicateDot = dotList.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1
            return acc;
        }, {});

        // duplicateDot :=> 중복값 확인을 위한 정제
        const valueList = Object.keys(duplicateDot).map(value => {
            return duplicateDot[value];
        })

        // 몇개의 눈이 중복되어 있는지 체크
        const maxDice = Math.max(...valueList)

        // 주사위 눈
        const maxDot = Object.keys(duplicateDot).find(value => duplicateDot[value] === maxDice)


        let resultCost = 0;
        switch (maxDice) {

            case 1:
                resultCost = maxDot * 1000;
                break;
            case 2:
                resultCost = maxDot * 2000;
                break;
            case 3:
                resultCost = maxDot * 4000;
                break;
            case 4:
                resultCost = maxDot * 6000;
                break;
            case 5:
                resultCost = maxDot * 8000;
                break;
            case 6:
                resultCost = maxDot * 10000;
                break;
        }

        console.log(resultCost, '::::')
    }


    return (
        <div>
            {page === 'main' ? <>
                    주사위 갯수
                    <div>select box
                        <Select
                            labelInValue
                            placeholder={'choose your dice'}
                            style={{width: 200}}
                            onChange={handleChange}>
                            <Option value={1}>Dice1</Option>
                            <Option value={2}>Dice2</Option>
                            <Option value={3}>Dice3</Option>
                            <Option value={4}>Dice4</Option>
                            <Option value={5}>Dice5</Option>
                            <Option value={6}>Dice6</Option>
                        </Select>,
                    </div>


                    <div>
                        {displayDice(dice, checked)}

                    </div>
                    {dice && dice === checked.length ?
                        <Button onClick={() => setPage('reward')}>보상 페이지 이동 </Button> : <></>}

                </>

                :


                <div>
                    {reward(checked)}

                    <Button onClick={() => {
                        setDice(0);
                        setChecked([])
                        setPage('main')
                    }}>게임 화면으로 이동</Button>
                </div>}
        </div>
    )
}

export default MainPage