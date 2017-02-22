  static omitEmail(email) {
    let c = email.split("@");
    let c1 = c[0].substr(3);
    let xing = "";
    for (let i = 0; i < c1.length; i++) {
      xing += "*";
    }
    return c[0].substr(0, 3) + xing + c[1];
  }
