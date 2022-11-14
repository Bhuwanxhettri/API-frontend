import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import interactionPlugin from "@fullcalendar/interaction";
const Event = () => {
  const renderEventContent = (eventInfo)=> {
    return (
      <div>
      <p>{eventInfo.event.title}</p>
      <img className="eventimage" src={eventInfo.event.url} />
      </div>
    )
  }
  return (
    <>	
      <div className="maincontainer">
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
         eventContent={renderEventContent}
        events={[
          { title: 'event 1', date: '2022-09-13', url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg" },
          { title: 'event 2', date: '2020-08-15', url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg" }
        ]}
      />
</div>
    </>
  )
}

export default Event