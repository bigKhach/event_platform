import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Collection from '@/components/shared/Collection'
import { auth } from '@clerk/nextjs'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'


const profilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    const ordersPage = Number(searchParams?.ordersPage) || 1
    const eventsPage = Number(searchParams?.eventsPage) || 1

    const orders = await getOrdersByUser({ userId, page: ordersPage })
    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage, })

    console.log({orderedEvents})
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

        <section className="wrapper my-8">
            <Collection 
            data={orderedEvents}
            emptyTitle='No event tickets purchased yet'
            emptyStateSubtext="No worries, plenty of exciting events to explore!"
            collectionType="My_Tickets"
            page={ordersPage}
            limit={3}
            totalPages={orders?.totalPages}
            urlParamName='ordersPage'
            />
        </section> 

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
            page={eventsPage}
            limit={6}
            totalPages={organizedEvents?.totalPages}
            urlParamName='eventsPage'
            />
        </section> 
    </>
  )
}

export default profilePage