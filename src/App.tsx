import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalculatorBody from './components/calculator-body/calculatorBody';
import Constructor from './components/constructor/constructor';
import { DataType, ItemsType } from './types/types';
import { actions } from './redux/constructor-reducer';
import { AppStateType } from './redux/store';
import './styles/styles.scss';


// Не выносил логику калькулятор в Редакс, так как считаю, что будет больше кода
function App() {
  const [showConstructor, setChowConstructor] = useState<boolean>(true)
  const [firstValue, setFirstValue] = useState<string>('')
  const [secontValue, setSecontValue] = useState<string>('')
  const [operation, setOperation] = useState<string>('')
  const [result, setResult] = useState<string | number>('')

  const boards = useSelector((state: AppStateType) => state.constructorReducer.data)
  const calculatorItems = useSelector((state: AppStateType) => state.constructorReducer.calculatorItems)

  const dispatch = useDispatch()

  console.log(firstValue)
  console.log(secontValue)
  console.log(result)

  //Если ответ получается большим
  useEffect(() => {
    if (result !== 'Не определено') {
      if (String(result).length > 10) {
        let whole = Math.trunc(Number(result))
        setResult(Number(result).toFixed(9 - String(whole).length))
      }
    }
    //Если делим на ноль
    if (+result == Infinity) {
      setResult('Не определено')
      document.querySelector('.constructor__panel-result')?.classList.add('small')
    }
    setFirstValue('')
    setSecontValue('')
    setOperation('')
  }, [result])

  useEffect(() => {
    if (!showConstructor) {
      document.querySelector('.constructor__panel')?.setAttribute('draggable', 'false')
      document.querySelector('.constructor__operations')?.setAttribute('draggable', 'false')
      document.querySelector('.constructor__numbers')?.setAttribute('draggable', 'false')
      document.querySelector('.constructor__equals')?.setAttribute('draggable', 'false')
      document.querySelector('.constructor__panel')?.classList.add('cursor')
      document.querySelector('.constructor__operations')?.classList.add('cursor')
      document.querySelector('.constructor__numbers')?.classList.add('cursor')
      document.querySelector('.constructor__equals')?.classList.add('cursor')
    }
    clearAll()
  }, [showConstructor])

  // Получает значение при нажатие на кнопку
  const onClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    if (!showConstructor) {
      const value = (e.target as HTMLElement).textContent
      operation ? setSecontValue((secontValue + value)) : setFirstValue(firstValue + value)
      setResult('');
    }
    if (document.querySelector('.constructor__panel-result')?.classList.contains('small')) {
      document.querySelector('.constructor__panel-result')?.classList.remove('small')
    }

  }



  //Итог вычислений
  const resultValue = () => {
    if (operation === '+') {
      setResult(+firstValue + +secontValue)
    }
    if (operation === '-') {
      setResult(+firstValue - +secontValue)
    }
    if (operation === 'x') {
      setResult(+firstValue * +secontValue)
    }
    if (operation === '/') {
      setResult(+firstValue / +secontValue)
    }
  }

  // Очистка всех форм
  const clearAll = () => {
    setResult('')
    setFirstValue('')
    setSecontValue('')
    setOperation('')
  }

  // Удаление блока
  const deleteBlock = (id: number) => {
    if (showConstructor) {
      dispatch(actions.deleteBlock(id))
    }
  }

  // Свап блоков
  const sortBlock = (a: ItemsType, b: ItemsType) => {
    if (a.order > b.order) return 1
    if (a.order < b.order) return -1
  }

  function dragOverHandler(e: React.DragEvent) {
    if ((e.target as Element).className === 'calculator__info' || (e.target as Element).className === 'calculator__body') {
      document.querySelector('.calculator__body')?.classList.add('drag')
    }
    e.preventDefault()
  }

  function dragStartHandler(e: React.DragEvent, elem: ItemsType) {
    e.dataTransfer.setData('elem', String(elem.id))
    dispatch(actions.setCurrentBlock(elem))
  }

  function dragLeaveHandler(e: React.DragEvent) {
    document.querySelector('.calculator__body')?.classList.remove('drag')
  }

  function dragEndHandler(e: React.DragEvent) {
    document.querySelector('.calculator__body')?.classList.remove('drag')
  }

  function dropHandler(e: React.DragEvent, elem: ItemsType) {
    const newElem = [...e.dataTransfer.getData('elem')] as unknown as number
    let newObj = boards[0].items.find((i: ItemsType) => i.id == newElem)

    if (newObj !== undefined) {
      if (!calculatorItems.includes(newObj) && !calculatorItems.includes(elem)) {
        if (!!calculatorItems?.find((c: ItemsType) => c.id == newObj?.id && c.id == elem.id)) { return }
        dispatch(actions.setCalculatorItems(newObj))
      }
    }

    document.querySelector('.calculator__body')?.classList.remove('drag')
    document.querySelector('.calculator')?.classList.add('constructor-block')

    if (elem == undefined) { return }

    dispatch(actions.swapCalculatorItems(elem))
    e.preventDefault()
  }



  return (
    <div className="app">
      <div className="header">
        <div className="header__buttons">
          <button className={showConstructor
            ? "header__button noactove"
            : "header__button "
          }
            onClick={() => setChowConstructor(false)}>
            <span className={showConstructor ? 'header__icon  _icons-eye' : 'header__icon active _icons-eye'}></span>
            Runtime
          </button>
          <button className={showConstructor
            ? "header__button "
            : "header__button noactove"
          } onClick={() => {
            document.querySelector('.constructor__panel-result')?.classList.remove('small')
            setChowConstructor(true)
          }
          }>
            <span className={showConstructor ? 'header__icon active _icons-arrows' : 'header__icon _icons-arrows'}></span>
            Constructor
          </button>
        </div>
      </div>
      <div className={showConstructor ? "wrapper" : "wrapper flex-end"}>
        <>{boards && boards.map((board: DataType) => {
          if (showConstructor) {
            if (board.id == 1) {
              return <Constructor
                key={board.id}
                board={board}
                dragOverHandler={dragOverHandler}
                dragStartHandler={dragStartHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragEndHandler={dragEndHandler}
                dropHandler={dropHandler}
                deleteBlock={deleteBlock}
                resultValue={resultValue}
                calculatorItems={calculatorItems}
                onClick={onClick}
                setOperation={setOperation}
                result={result}
                firstValue={firstValue}
                secontValue={secontValue}
                showConstructor={showConstructor}
              />
            }
          }
          if (board.id == 2) {
            return <div key={board.id} className={calculatorItems && calculatorItems?.length === 0
              ? "calculator" :
              "calculator constructor-block"
            }
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              // @ts-ignore
              onDrop={dropHandler}
            >
              <CalculatorBody
                board={board}
                dragOverHandler={dragOverHandler}
                dragStartHandler={dragStartHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragEndHandler={dragEndHandler}
                dropHandler={dropHandler}
                deleteBlock={deleteBlock}
                resultValue={resultValue}
                calculatorItems={calculatorItems}
                onClick={onClick}
                setOperation={setOperation}
                result={result}
                firstValue={firstValue}
                secontValue={secontValue}
                showConstructor={showConstructor}
                // @ts-ignore
                sortBlock={sortBlock}
              />
            </div>
          }
        })}</>
      </div>
    </div>
  );
}

export default App;