export function TimeDifference(start:string, end:string) {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    
    const minutes1 = h1 * 60 + m1;
    const minutes2 = h2 * 60 + m2;
    
    let diffMinutes = minutes2 - minutes1;

    if (diffMinutes < 0) {
        diffMinutes += 24 * 60;
    }
    return diffMinutes / 60;
}