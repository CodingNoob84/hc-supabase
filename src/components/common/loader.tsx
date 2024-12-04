import { Loader2 } from 'lucide-react'

export const Loader = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Loader2 className="animate-spin" />
        </div>
    )
}
