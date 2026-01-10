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
const EditTokenDialog = ({
  trigger,
  header,
  description,
  input,
  onCancel,
  onSave
}: DialogProps) => {
  return (
    <Dialog>
      <form >
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
          <div className="grid gap-4">
            {input?.map(({ label, default: defaultValue }, index) => (
              <div className="grid gap-3" key={index}>
                <Label htmlFor={`input-${index}`}>{label}</Label>
                <Input id={`input-${index}`} name={label.toLowerCase()} defaultValue={defaultValue} />
              </div>
            ))}
          </div>
          <DialogFooter>
            {onCancel &&
              <DialogClose asChild>
                <Button onClick={onCancel} variant="outline">Cancel</Button>
              </DialogClose>
            }
            {onSave &&
              <Button onClick={() => onSave} type="submit">Save changes</Button>
            }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default EditTokenDialog