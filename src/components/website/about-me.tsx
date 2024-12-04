import { Facebook, Github, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function AboutMe() {
    const profile = {
        name: 'Karthik kumar',
        role: 'Full Stack Developer',
        bio: "I'm passionate about bringing the joy of cricket to everyone through innovative digital experiences. Hand Cricket is my tribute to the game we all love.",
        image: '/images/tanjiro.png',
        socialLinks: {
            facebook: '#',
            twitter: '#',
            github: '#',
        },
    }

    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center lg:justify-start">
                        <Image
                            className="h-64 w-64 rounded-full"
                            src={profile.image}
                            alt={`${profile.name}, ${profile.role}`}
                            width={256}
                            height={256}
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            About Me
                        </h2>
                        <h3 className="mt-1 text-xl font-bold text-gray-700">
                            {profile.name}
                        </h3>
                        <p className="text-lg text-gray-500">{profile.role}</p>
                        <p className="mt-3 max-w-3xl text-lg text-gray-500">
                            {profile.bio}
                        </p>
                        <div className="mt-5 flex space-x-5">
                            <a
                                href={profile.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href={profile.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a
                                href={profile.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <span className="sr-only">GitHub</span>
                                <Github className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
