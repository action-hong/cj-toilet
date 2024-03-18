import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CopyButton ({
  text,
}: {
  text: string
}) {
  const { toast } = useToast()

  const copy = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: "复制成功",
      description: text,
    })
  }
  return (
    <div className='flex items-center'>
      <span>{ text }</span>
      <Button className='m-2' onClick={copy}>点击复制</Button>
      <span></span>
    </div>
  )
}