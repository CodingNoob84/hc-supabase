'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { updateTeam, updateTeamTypes } from '@/queries/user-team'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Edit, Plus } from 'lucide-react'

import { getInitials } from '@/lib/utils'
import { userQuery } from '@/queries/queries'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CreateTeamModal } from './create-team'
import { EditTeamModal } from './edit-team'

export function TeamCard() {
    const supabase = getSupabaseBrowserClient()

    // Fetch the current user
    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })

    // React Query mutation for updating team info
    const mutation = useMutation({
        mutationFn: (data: updateTeamTypes) => updateTeam(data, supabase),
        onSuccess: () => {
            refetch() // Refetch user data after successful update
            console.log('Team updated successfully!')
        },
        onError: (error) => {
            console.error('Error updating team:', error)
        },
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    // Toggle modals
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleTeamUpdate = (newName: string, newDescription: string) => {
        if (user) {
            mutation.mutate({
                userId: user.id,
                teamname: newName,
                teamdescription: newDescription,
            })
        }
    }

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching user data. Please try again later.</div>
    }

    // If no team exists, show the "Create Team" button and modal
    if (!user?.teamname) {
        return (
            <div className="w-full mx-auto max-w-md">
                <Button onClick={toggleModal} className="w-full" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Team
                </Button>
                <CreateTeamModal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    onSubmit={handleTeamUpdate}
                />
            </div>
        )
    }

    // Main card with team info
    return (
        <>
            <Card className="w-full max-w-md mx-auto overflow-hidden">
                <CardHeader className="flex flex-row justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 border-4 border-primary shadow-lg">
                            <AvatarImage
                                src={user.avatar_url ?? ''}
                                alt={user.display_name ?? ''}
                            />
                            <AvatarFallback>
                                {getInitials(user.display_name ?? '')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">
                                {user.display_name}
                            </h2>
                            <p>{user.teamname}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleModal}>
                        <Edit className="h-5 w-5" />
                        <span className="sr-only">Edit team</span>
                    </Button>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <p className="text-muted-foreground">
                        {user.teamdescription}
                    </p>
                </CardContent>
            </Card>

            {/* Modals */}
            <EditTeamModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                onSubmit={handleTeamUpdate}
                initialName={user.teamname ?? ''}
                initialDescription={user.teamdescription ?? ''}
            />
        </>
    )
}
