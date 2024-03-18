import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
import { createCommand } from '@/lib/utils'
import CopyButton from './CopyButton'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ModelConfig() {

  const [model, setModel] = useState('mxc.toilet.toilet')
  const [pid, setPid] = useState(19273)

  const config = createCommand(
    0x01,
    0x71,
    [
      pid >> 8 & 0xff,
      pid & 0xff,
      ...model.split('').map(c => c.charCodeAt(0)),
    ],
    2 + model.length
  )

  function handleChangeModel(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value
    value = value.replace(/[^a-z0-9.]/g, '')
    setModel(value)
  }

  function handleChangePID(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value
    if (value === '') {
      value = '0'
    }
    setPid(parseInt(value, 10))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model & PID</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
          <Label htmlFor="model" className='my-2'>Model</Label>
          <Input id="model" placeholder="model" value={model} onChange={handleChangeModel}/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
          <Label htmlFor="pid" className='my-2'>PID</Label>
          <Input id="pid" placeholder="pid" value={pid} onChange={handleChangePID}/>
        </div>
        <p className='mt-2'>Result:</p>
        <CopyButton text={config.hex} />
        <CopyButton text={config.byte} />
      </CardContent>
    </Card>
  )

}