'use strict';
const mailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

class MailerUtil {
  constructor(options) {
    this.options = Object.assign({}, {
      host: '',
      port: '',
      authUser: '',
      authPass: ''
    }, options);

    if(!this.options.host || !this.options.port || !this.options.authUser || !this.options.authPass){
      throw new Error('The lack of instance the parameters!');
    }

    this.transporter = mailer.createTransport(smtpTransport({
      host: this.options.host,
      port: this.options.port,
      auth: {
        user: this.options.authUser,
        pass: this.options.authPass
      }
    }));
  }

  //发送邮件
  send(data) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(data, (err, res) => {
        if(err){
          return reject(err);
        }

        resolve(res);

      });
    })
  }
}

export default MailerUtil
