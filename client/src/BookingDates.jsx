import { format,differenceInCalendarDays } from "date-fns"

const BookingDates = ({ booking,className }) => {
    return (
        <div>
            <div className={"flex gap-2"+className}>
                <div className="flex"><img src="/calendar.svg" alt="" /></div>
                {format(new Date(booking.checkIn),'yyyy-MM-dd')} &rarr; 
                <div><img src="/calendar.svg" alt="" /></div>
                {format(new Date(booking.checkOut),'yyyy-MM-dd')}
            </div>
            <div className="flex text-xl gap-2">
                <div className="flex gap-1">
                    {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} Nights
                    <img src="/moon.svg" alt="" />
                </div>
                
            </div>
        </div>
    )
}

export default BookingDates
