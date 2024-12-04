'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface EditTeamModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (name: string, description: string) => void
    initialName: string
    initialDescription: string
}

export function EditTeamModal({
    isOpen,
    onClose,
    onSubmit,
    initialName,
    initialDescription,
}: EditTeamModalProps) {
    const [name, setName] = useState(initialName)
    const [description, setDescription] = useState(initialDescription)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(name, description)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Edit Team
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="team-name" className="text-lg">
                                Team Name
                            </Label>
                            <Input
                                id="team-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoFocus={false}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="team-description"
                                className="text-lg"
                            >
                                Team Description
                            </Label>
                            <Textarea
                                id="team-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                autoFocus={false}
                                className="mt-1 min-h-[100px]"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
