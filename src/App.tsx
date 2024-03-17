import './App.css'
import { data } from './toilet'
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

function App() {

  const [items, setItems] = useState(data.map(item => ({
    ...item,
    checked: false
  })))

  function updateValue(item: typeof items[0]) {
    setItems(_items => _items.map(_item => {
      if (_item.label === item.label) {
        return {
          ..._item,
          checked: !_item.checked
        }
      }
      return _item
    }))
  }

  function checkAll() {
    setItems(_items => _items.map(_item => ({ ..._item, checked: true })))
  }

  function checkToggle() {
    setItems(_items => _items.map(_item => ({ ..._item, checked: !_item.checked })))
  }

  const result = items.reduce((acc, item) => {
    if (item.checked) {
      let [hi, lo] = acc
      if (item.no < 4) {
        lo |= (1 << (item.no * 8 + item.bit))
        lo = lo >>> 0
      } else {
        hi |= (1 << ((item.no - 4) * 8 + item.bit))
        hi = hi >>> 0
      }

      return [hi, lo]
    }
    return acc
  }, [0, 0])

  const binaryArr: Array<{ color: string, value: string }> = []
  const binary = result.map((n, index) => n.toString(2).padStart(index === 0 ? 16 : 32, '0')).join('')

  for (let i = 0; i < 48; i += 8) {
    binaryArr.push({
      color: `hsl(${i * 360 / 48}, 50%, 50%)`,
      value: binary.slice(i, i + 8)
    })
  }

  return (
    <div className='p-4'>
      <h1>马桶 UI 值生成</h1>
      <div className='flex flex-wrap'>
        {
          items.map(item => (<div
            className='flex m-4 bg-slate-50 shadow-sm'
            key={item.label}>
            <Checkbox id={item.label} checked={item.checked} onCheckedChange={() => updateValue(item)} />
            <label
              htmlFor={item.label}
              className="ml-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {item.label}
            </label>
          </div>))
        }
      </div>
      <Button className='m-2' onClick={checkAll}>全选</Button>
      <Button onClick={checkToggle}>反选</Button>
      <p>Result: </p>
      <p>整数：{parseInt(binary, 2)}</p>
      <p>HEX: {parseInt(binary, 2).toString(16)}</p>
      <p>
        BINARY: 
        {binaryArr.map((item, index) => (<span style={{ color: item.color }} key={index}>{item.value}</span>))}
      </p>
    </div>
  )
}

export default App
