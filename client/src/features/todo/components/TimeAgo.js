import React from 'react'
import {parseISO, formatDistanceToNow} from 'date-fns'
const TimeAgo = ({time}) => {
  return (
    <div> <span>{formatDistanceToNow(parseISO(date))}</span></div>
  )
}

export default TimeAgo