export function convertDate(date) {  
    return  new Date((date.getTime() - date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
}

