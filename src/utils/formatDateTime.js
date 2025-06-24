
// 날짜 & 시간을 헌국어 형식으로 포맷
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