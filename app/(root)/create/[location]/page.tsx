import Destinations from '@/app/(root)/create/[location]/components/destinations'
import prismadb from '@/lib/prismadb'

interface LocationPageProps {
    params: { location: string, cityID: string }
}

const Location: React.FC<LocationPageProps> = async ({ params }) => {

    const destinationsFilter = await prismadb.destination.findMany({
        where: {
            continent: params.location
        }
    })

    return (
        <div>
            <Destinations destinations={destinationsFilter} location={params.location} />
        </div>
    )
}

export default Location