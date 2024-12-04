import { Hammer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const UnderDevelopment = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-green-800">
                        Coming Soon
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <Hammer className="w-24 h-24 text-green-600" />
                        <div className="absolute top-0 left-0 w-full h-full animate-ping bg-green-400 rounded-full opacity-20"></div>
                    </div>
                    <p className="text-lg font-semibold text-green-700">
                        Under Development
                    </p>
                    <p className="text-center text-gray-600">
                        {` We're working hard to bring you exciting new features.
                        Check back soon!`}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
