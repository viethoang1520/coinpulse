import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createFieldName } from "@/lib/utils"
import { useState } from "react"

const EditTokenDialog = ({
  trigger,
  header,
  description,
  input,
  onCancel,
  onSave
}: DialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values: Record<string, string> = {}
    input?.forEach(({ label }) => {
      const fieldName = createFieldName(label)
      values[fieldName] = formData.get(fieldName) as string
    })
    if (onSave) {
      onSave(values)
    }
    setOpen(false) // Close dialog after saving
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {input?.map(({ label, default: defaultValue }, index) => (
              <div className="grid gap-3" key={index}>
                <Label htmlFor={`input-${index}`}>{label}</Label>
                <Input id={`input-${index}`} name={createFieldName(label)} defaultValue={defaultValue} />
              </div>
            ))}
          </div>
          <DialogFooter>
            {onCancel &&
              <Button className="hover:cursor-pointer" onClick={() => { onCancel(); setOpen(false); }} variant="outline" type="button">Cancel</Button>
            }
            {onSave &&
              <Button className="hover:cursor-pointer" type="submit">Save changes</Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTokenDialog