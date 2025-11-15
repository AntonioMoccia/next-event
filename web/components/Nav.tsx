"use client"
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'

import { Button } from './ui/button'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu'



function Nav() {
    const { useSession, signOut } = authClient
    const { data: session } = useSession()
    const router = useRouter()



    const logout = async () => {
        await signOut()
    }

    useEffect(() => {

    }, [session])

    return (
        <header>
            <nav className='flex px-5 py-4 items-center bg-slate-100 justify-between'>
                <div>
                    <h1>Logo</h1>
                </div>

                <div>
                    {
                        session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="outline-none">
                                    <Avatar className="cursor-pointer w-9 h-9">
                                        {session?.user.image && <AvatarImage src={session?.user.image} alt="Profile" />}
                                        <AvatarFallback className='uppercase'>{session?.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{session?.user.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {session?.user.email}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />
                                    {/* 
                            <DropdownMenuItem onClick={() => console.log("Vai al profilo")}>
                                Profilo
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => console.log("Impostazioni")}>
                                Impostazioni
                            </DropdownMenuItem> */}

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={logout}
                                    >
                                        Esci
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant={'outline'}>
                                <Link href={'/auth/sign-in'}>
                                    Login
                                </Link>
                            </Button>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Nav