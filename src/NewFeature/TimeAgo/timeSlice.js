import {parseISO, formatDistanceToNow} from 'date-fns'
import { useEffect, useState } from 'react';

export const TimeAgoSlice = ({time, className}) => {
    const [timeAgo, setTimeAgo] = useState(time);

    useEffect(() => {
      if (time) {
        const parsedDate = parseISO(time);
        const intervalId = setInterval(() => {
          setTimeAgo(formatDistanceToNow(parsedDate));
        }, 60000); // Update every minute
  
        return () => clearInterval(intervalId);
      }
    }, [time]);
  

    return (
        <span className={`text-indigo-500 flex items-end text-sm `}>
           {timeAgo.includes('minutes') ? timeAgo: formatDistanceToNow(parseISO(time))} ago
        </span>
    )
}
