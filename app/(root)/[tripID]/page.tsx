import React from 'react'

interface TripPageProps {
    params: { tripID: string }
}
const TripPage: React.FC<TripPageProps> = ({ params }) => {
    return (
        <div>TripPage</div>
    )
}

export default TripPage