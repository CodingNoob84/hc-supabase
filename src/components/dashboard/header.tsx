'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

import { userQuery } from '@/queries/queries'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { Hand } from 'lucide-react'
import Link from 'next/link'
import { LogOutButton } from '../auth/log-out-button'

export default function Header() {
    //const queryClient = useQueryClient()
    const supabase = getSupabaseBrowserClient()
    const { data: user } = useQuery({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })
    //console.log(data, data)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Hand className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">
                            Hand Cricket
                        </span>
                    </Link>
                    {user && (
                        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={user?.avatar_url ?? ''}
                                            alt={user?.display_name ?? 'image'}
                                        />
                                        <AvatarFallback>
                                            {user.display_name?.charAt(0) ?? ''}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.display_name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <LogOutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    )
}
