import { Button } from "@/01-shared/ui/button"
import { Input } from "@/01-shared/ui/input"
import { Label } from "@/01-shared/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/01-shared/ui/popover"
import { ScrollArea } from "@/01-shared/ui/scroll-area"
import { Separator } from "@/01-shared/ui/separator"

interface IDetailsPopoverProps {
  title?: string
  value: any
  onChangeValue?: any
}

export const DetailsPopover = ({ title, value, onChangeValue }: IDetailsPopoverProps) => {
  const keys = Object.keys(value)

  const handleChange = () => {}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{keys.length} fields</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" onChange={handleChange}>
        <div className="grid gap-4">
          <div className="space-y-2">
            {title && <h4 className="font-medium leading-none">{title}</h4>}
            <p className="text-sm text-muted-foreground">Set values.</p>
          </div>
          <ScrollArea className="h-48">
            {keys.length === 0 ? (
              <span className="text-sm font-medium leading-none text-muted-foreground">There&apos;s nothing here</span>
            ) : (
              keys.map((item) => (
                <div key={item}>
                  <div className="grid grid-cols-3 items-center gap-4 m-3">
                    <Label htmlFor={item}>{item}</Label>
                    <Input id={item} value={value[item] ?? ""} onChange={onChangeValue} className="col-span-2 h-8" />
                  </div>
                  <Separator className="my-2" />
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
