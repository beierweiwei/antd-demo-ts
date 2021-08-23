export default function formatDateTime(timestr:string, format:string) {
  const time = new Date(timestr)
  const o = {
    "M+": time.getMonth() + 1, // month
    "d+": time.getDate(), // day
    "h+": time.getHours(), // hour
    "m+": time.getMinutes(), // minute
    "s+": time.getSeconds() // second
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}