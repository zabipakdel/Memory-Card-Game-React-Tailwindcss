import { useState } from 'react'
import clsx from 'clsx'
import { useEffect } from 'react'

function Card({item, id, handleClick}){
  const itemClass = item.stat ? " active " + item.stat : ""

  return (
      <div className={`bg-white p-2 rounded flex flex-auto items-center justify-center
      ${clsx({
        " bg-white scale-100 ":(itemClass == " active active"),
        " bg-red-500 ":(itemClass == " active wrong"),
        " bg-white ":(itemClass == " active correct"),
        "bg-white": (itemClass == "" || itemClass == " active")
      })}`} onClick={() => handleClick(id)}>
          <img className={`object-contain h-40 ${clsx({' scale-1 ' : !!itemClass.match(" active "), " scale-0 " : itemClass == ""})}`} src={item.img} alt="" />
      </div>
  )
}

const tiles = [
  { id: 1, img: '/img/html.png', stat: " active " },
  { id: 1, img: '/img/html.png', stat: " active " },
  { id: 2, img: '/img/css.png', stat: " active " },
  { id: 2, img: '/img/css.png', stat: " active " },
  { id: 3, img: '/img/js.png', stat: " active " },
  { id: 3, img: '/img/js.png', stat: " active " },
  { id: 4, img: '/img/scss.png', stat: " active " },
  { id: 4, img: '/img/scss.png', stat: " active " },
  { id: 5, img: '/img/react.png', stat: " active " },
  { id: 5, img: '/img/react.png', stat: " active " },
  { id: 6, img: '/img/vue.png', stat: " active " },
  { id: 6, img: '/img/vue.png', stat: " active " },
  { id: 7, img: '/img/angular.png', stat: " active " },
  { id: 7, img: '/img/angular.png', stat: " active " },
  { id: 8, img: '/img/nodejs.png', stat: " active " },
  { id: 8, img: '/img/nodejs.png', stat: " active " }
]

function Cards(){
  const [correctCount, setCorrectCount] = useState(0)
    const [items, setItems] = useState([])

    const shuffle = () => {
      setItems(tiles.sort(() => Math.random() - 0.5))
      setCorrectCount(0)
      setTimeout(() => {
        hideImages()
      },1000 * 2)
    }

    const hideImages = () => {
        setItems(old => old.map((e) => {return {...e, stat : ""}})) 
    }

    const [prev, setPrev] = useState(-1)

    useEffect(() => {
      shuffle()
    }, [])

    function check(current){
        if(items[current].id == items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
            setCorrectCount(oldCount => oldCount + 1)
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 150)
        }
    }

    function handleClick(id){
        if(prev == -1){
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }

    return (
      <div className='h-screen container w-3/5 content-center mx-auto '>
        <div className='justify-center flex w-full'>
          <span>{correctCount} / 8</span>
          <button 
          className='ml-5 rounded-md border border-gray-300 bg-green-300 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
           onClick={shuffle}
           >
            Reset
           </button>
        </div>
        <div className=" grid gap-4 grid-cols-4">
            {items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            )) }
        </div>
      </div>
    )
}

export default Cards