import Image from 'next/image'

interface ReviewType {
    name: string
    quote: string
    image: string
}

const reviews: ReviewType[] = [
    {
        name: 'Virat Kohli',
        quote: "Hand cricket brings back childhood memories. It's a fantastic way to enjoy the spirit of cricket anywhere!",
        image: '/images/virat.jpg',
    },
    {
        name: 'MS Dhoni',
        quote: 'This digital version of hand cricket is innovative and fun. Great for quick games during breaks!',
        image: '/images/dhoni.jpg',
    },
    {
        name: 'Ellyse Perry',
        quote: 'Hand cricket is a clever way to introduce cricket basics to newcomers. This online version makes it even more accessible!',
        image: '/images/ellyperry.jpg',
    },
    {
        name: 'Krishnamachari Srikkanth',
        quote: 'Hand cricket is a clever way to introduce cricket basics to newcomers. This online version makes it even more accessible!',
        image: '/images/srikanth.jpg',
    },
]

export default function Reviews() {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    What Cricketers Say About Hand Cricket
                </h2>
                <div className="w-full bg-gray-100 dark:bg-gray-800 pt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 md:px-6">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ReviewCard = ({ review }: { review: ReviewType }) => {
    return (
        <div className="relative flex flex-col gap-4 p-6 border border-gray-300 rounded-lg bg-white shadow-lg dark:bg-gray-900 m-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                    className="w-[6rem] h-[6rem] rounded-full outline outline-offset-2 outline-1 outline-blue-400 shadow-lg"
                    src={review.image}
                    alt={`${review.name} profile`}
                    width={96}
                    height={96}
                />
            </div>
            <div className="mt-12 text-center">
                <div
                    className="absolute left-0 top-0 bottom-0 w-2 bg-primary"
                    aria-hidden="true"
                />
                <div className="flex flex-col h-full pl-4">
                    <blockquote className="text-lg text-gray-800 mb-4">
                        {`"${review.quote}"`}
                    </blockquote>
                    <footer className="mt-auto text-right">
                        <cite className="text-sm text-gray-600 not-italic">
                            — {review.name}
                        </cite>
                    </footer>
                </div>
            </div>
        </div>
    )
}
