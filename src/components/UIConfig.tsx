import { createCommand } from '@/lib/utils'
import { data } from '@/toilet'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import CopyButton from './CopyButton'

export default function UIConfig() {

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
  const funcNumber = parseInt(binary, 2)

  for (let i = 0; i < 48; i += 8) {
    binaryArr.push({
      color: `hsl(${i * 360 / 48}, 50%, 50%)`,
      value: binary.slice(i, i + 8)
    })
  }

  binaryArr.reverse()

  const group = items.reduce<Array<Array<typeof items[0]>>>((acc, item) => {
    const key = item.no
    if (acc[key]) {
      acc[key].push(item)
    } else {
      acc[key] = [item]
    }
    return acc
  }, [])

  const ui = createCommand(
    0x01,
    0x72,
    parseInt(binary, 2),
    6
  )

  return (
    <Card>
        <CardHeader>
          <CardTitle>插件功能配置</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {
              group.map((items, index) => (
                <div key={index}>
                  <h2 className='font-bold my-2'>Byte {index}</h2>
                  <div className='flex flex-wrap border'>
                    {
                      items.map(item => (<div
                        className='flex m-4'
                        key={item.label}>
                        <Checkbox id={item.label} checked={item.checked} onCheckedChange={() => updateValue(item)} />
                        <label
                          htmlFor={item.label}
                          className="ml-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {item.label}({item.no},{item.bit})
                        </label>
                      </div>))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <Button className='m-2' onClick={checkAll}>全选</Button>
          <Button onClick={checkToggle}>反选</Button>
          <p>UI Result: </p>
          <CopyButton text={ui.hex}>
            { ui.raw.map((item, index) => (<span key={index} style={{ color: item.color }} className='whitespace-pre'>{item.hex} </span>)) }
          </CopyButton>
          <CopyButton text={ui.byte}>
            { ui.raw.map((item, index) => (<span key={index} style={{ color: item.color }} className='whitespace-pre'>{item.byte} </span>)) }
          </CopyButton>
          <p>
            Number: {funcNumber}
          </p>
          <p className='break-words'>
            {binaryArr.map((item, index) => (<span style={{ color: item.color }} key={index}>{item.value}</span>))}
          </p>
        </CardContent>
      </Card>
  )
}