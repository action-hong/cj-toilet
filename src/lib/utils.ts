import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createCommand(
  from: number,
  command: number,
  data: number | string | number[],
  len: number, // 字节长度
) {
  const arr = [0xeb, 0xfa, len, from, command]

  const temp = []
  if (Array.isArray(data)) {
    temp.push(...data)
  } else {
    // 小端
    let hex = data
    if (typeof hex === 'number') {
      hex = hex.toString(16).padStart(len * 2, '0')
    }
    
    for (let i = 0; i < len; i++) {
      temp.push(parseInt(hex.slice(i * 2, i * 2 + 2), 16))
    }
    temp.reverse()
  }
  arr.push(...temp)

  const check = arr.reduce((a, b) => a + b, 0x7f)
  arr.push(check & 0xff)
  arr.push(0x1b)

  return {
    hex: arr.map((i) => i.toString(16).padStart(2, '0')).join(' '),
    byte: arr.map((i) => `0x${i.toString(16).padStart(2, '0')}`).join(', '),
  }
}