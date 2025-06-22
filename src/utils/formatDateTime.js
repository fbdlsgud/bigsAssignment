

export const formatDateTime = (time) => {
    if(!time) return;

    const date = new Date(time);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    })
}