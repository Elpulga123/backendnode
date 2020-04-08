import nodeMailer from 'nodemailer';

let adminMailer = process.env.MAILER_EMAIL;
let adminPassword = process.env.MAILER_PASSWORD;
let adminHost = process.env.MAILER_HOST;
let adminPort = process.env.MAILER_PORT;

let sendMailAdmin = (email, subject, template) => {

    let transporter = nodeMailer.createTransport({
        host: adminHost,
        port: adminPort,
        secure: true, //ẻ use SSL - TLS.
        auth: {
            user: adminMailer, // Điền Email của Admin.
            pass: adminPassword // Password email của admin.
        },
        tls: {
            // từ chối nhận diện
            rejectUnauthorized: false,
        }
    });

    let options = {
        from: email,
        to: email,
        subject: subject,
        html: template
    };

    // thông tin gửi mail     
     return transporter.sendMail(options); // trả về 1 promise.
}

export { sendMailAdmin }