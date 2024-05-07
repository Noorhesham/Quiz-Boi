export function formatCreatedAt(createdAt:any) {
    // Convert createdAt string to Date object
    const createdDate = new Date(createdAt);

    // Get current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = +currentDate - +createdDate;

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 28) {
        const months = Math.floor(days / 28);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days >= 7) {
        const weeks = Math.floor(days / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}

