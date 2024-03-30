// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
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

// const data = [
//   {
//     label: '默认配置(新协议)',
//     value: '1'
//   },
//   {
//     label: '老款协议',
//     value: '2',
//   }
// ]

export default function LampConfig() {

  const [type, setType] = useState('1')

  const config = createCommand(
    0x01,
    0x73,
    parseInt(type || '0', 10),
    1
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, min, max } = e.target;
    const v = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setType(`${v}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>灯珠和灯带模式配置</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <Select
          value={type}
          onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {
              data.map(item => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))
            }
          </SelectContent>
        </Select> */}
        <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
          <Label htmlFor="type" className='my-2'>模式配置</Label>
          <Input id="type" type='number' placeholder="type" min={0} max={255} value={type} onChange={handleInputChange}/>
        </div>
        <p className='mt-2'>Result:</p>
        <CopyButton text={config.hex}>
          {

          }
        </CopyButton>
        <CopyButton text={config.byte} />
      </CardContent>
    </Card>
  )

}