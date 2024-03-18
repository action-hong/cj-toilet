import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
import { createCommand } from '@/lib/utils'
import CopyButton from './CopyButton'

const data = [
  {
    label: '默认配置(新协议)',
    value: '1'
  },
  {
    label: '老款协议',
    value: '2',
  }
]

export default function LampConfig() {

  const [type, setType] = useState('1')

  const config = createCommand(
    0x01,
    0x73,
    parseInt(type, 10),
    1
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>灯珠和灯带模式配置</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
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
        </Select>
        <p className='mt-2'>Result:</p>
        <CopyButton text={config.hex} />
        <CopyButton text={config.byte} />
      </CardContent>
    </Card>
  )

}