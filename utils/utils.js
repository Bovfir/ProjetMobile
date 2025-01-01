import Toast from "react-native-toast-message";


function formatDateToDayMonth(dateString) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateString);  
  const day = date.getDate();         
  const month = months[date.getMonth()];  
  return `${day} ${month}`;
}

export const formatDate = (date) => {
  const isoString = date.toISOString(); 
  const [datePart, timePart] = isoString.split('T');
  const [hour, minute] = timePart.split(':'); 
  return `${datePart} ${hour}:${minute}`; 
};


const keywordToIcon = {
    music: 'music-note',
    festival: 'festival',
    conference: 'school',
    party: 'party-mode',
    sport: 'sports-soccer',
    art: 'palette',
    cinema: 'movie',
    book: 'book',
    technology: 'computer',
    "Video Games": 'videogame-asset',
    food: 'fastfood',
    education: 'school',
    environment: 'nature',
};

const findIconForCategory = (category) => {
    const lowercasedCategory = category.toLowerCase();
    for (const [keyword, iconName] of Object.entries(keywordToIcon)) {
      if (lowercasedCategory.includes(keyword)) {
        return iconName; 
      }
    }
    return 'help'; 
};

export const removeNullValues = (obj) => {
  return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== null)
  );
};

export const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};
    

export const formatLastMessageDate = (lastMessageDate) => {
    const date = new Date(lastMessageDate); 
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToMonday);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}h${minutes}`;


    const shortYear = date.getFullYear().toString().slice(-2);

    if (date >= today) {
        return `Today, at ${timeString}`;
    } else if (date >= yesterday) {
        return `Yesterday, at ${timeString}`;
    } else if (date >= startOfWeek) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return `${daysOfWeek[date.getDay()]}, at ${timeString}`;
    } else {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${shortYear} at ${timeString}`;
    }
};

export const formatDateToReadable = (dateString) => {
  const date = new Date(dateString);
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export const formatTimeRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${formattedHours}.${formattedMinutes} ${period}`;
  };

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const isDifferentDay = start.toDateString() !== end.toDateString();

  if (isDifferentDay) {
      const readableEndDate = formatDateToReadable(endDate);
      return `${startTime} - ${endTime} (${readableEndDate})`;
  }

  return `${startTime} - ${endTime}`;
}


export {formatDateToDayMonth,findIconForCategory};