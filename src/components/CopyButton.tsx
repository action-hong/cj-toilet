import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CopyButton ({
  text,
  children,
}: {
  text: string,
  children?: React.ReactNode
}) {
  const { toast } = useToast()

  const copy = () => {
    // navigator.clipboard.writeText(text)

    const textare = document.createElement('textarea')
    textare.value = text
    document.body.appendChild(textare)
    textare.select()
    document.execCommand('copy')
    document.body.removeChild(textare)

    toast({
      title: "复制成功",
      description: text,
    })
  }
  return (
    <div className='flex items-center'>
      <Button className='m-2' onClick={copy}>点击复制</Button>
      {
        children || <span>{text}</span>
      }
    </div>
  )
}