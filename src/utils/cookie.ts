const Cookie = {
  get (name: string) {
    const cookieName = encodeURIComponent(name) + '='
    const cookieStart = document.cookie.indexOf(cookieName)
    let cookieValue = null;
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  set (name: string, value: any, expires?: any, path?: string, domain?: string, secure?: any) {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    const Days = expires;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    cookieText += '; expires=' + exp.toUTCString();

    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }

    document.cookie = cookieText;
  },
  unset (name: any, path: any, domain: any, secure: any) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
};

export default Cookie;