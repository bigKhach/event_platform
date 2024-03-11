import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Collection from '@/components/shared/Collection'
import { auth } from '@clerk/nextjs'
import { getEventsByUser } from '@/lib/actions/event.actions'


const profilePage = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    const organizedEvents = await getEventsByUser({ userId, page: 1, })
  return (
    <>
        {/* EVENTS ATTENDING */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">
                    Events I'm attending
                </h3>
                <Button asChild size='lg' className='button hidden sm:flex'>
                    <Link href='/#events'>
                        Explore More Events
                    </Link>
                </Button>
            </div>
        </section>

        {/* <section className="wrapper my-8">
            <Collection 
            data={events?.data}
            emptyTitle='No event tickets purchased yet'
            emptyStateSubtext="No worries, plenty of exciting events to explore!"
            collectionType="My_Tickets"
            page={1}
            limit={3}
            totalPages={2}
            urlParamName='ordersPage'
            />
        </section> */}

        {/* EVENTS ORGANIZED */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">
                    Events organized
                </h3>
                <Button asChild size='lg' className='button hidden sm:flex'>
                    <Link href='/events/create'>
                        Create New Event
                    </Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
            data={organizedEvents?.data}
            emptyTitle='No events have been created'
            emptyStateSubtext="Go create some now!"
            collectionType="Events_Organized"
            page={1}
            limit={6}
            totalPages={2}
            urlParamName='eventsPage'
            />
        </section> 
    </>
  )
}

export default profilePage