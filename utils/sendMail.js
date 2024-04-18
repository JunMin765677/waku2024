const nodemailer = require('nodemailer')
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.USER_MAIL,
    pass: config.USER_PASSWORD
  }
})

function sendMail (email, subject, html) {
  const mailOptions = {
    from: `"SpotsMap" <${config.USER_MAIL}>`,
    to: email,
    subject,
    html
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

function orderMail (order, status, msg) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="width=mobile-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" name="viewport" />
      <meta content="IE=9; IE=8; IE=7; IE=EDGE;" http-equiv="X-UA-Compatible" />
      <title>Your title</title>
      <!-- GOOGLE WEB FONT -->
      <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
      <style type="text/css">
      /**This is to overwrite Outlook.com’s Embedded CSS************/
      table {
          border-collapse: separate;
      }
  
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #488dc6
      }
  
      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #333333 !important
      }
  
      p {
          margin-bottom: 0
      }
  
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%
      }
  
      /**This is to center your email in Outlook.com************/
      .ExternalClass {
          width: 100%;
      }
  
      /* General Resets */
      #outlook a {
          padding: 0;
      }
  
      body,
      #body-table {
          height: 100% !important;
          width: 100% !important;
          margin: 0 auto;
          padding: 0;
          line-height: 100%;
           !important;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
      }
  
      img,
      a img {
          border: 0;
          outline: none;
          text-decoration: none;
      }
  
      .image-fix {
          display: block;
      }
  
      table,
      td {
          border-collapse: collapse;
      }
  
      /* Client Specific Resets */
      .ReadMsgBody {
          width: 100%;
      }
  
      .ExternalClass {
          width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100% !important;
      }
  
      .ExternalClass * {
          line-height: 100% !important;
      }
  
      table,
      td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
      }
  
      img {
          outline: none;
          border: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
      }
  
      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }
  
      body.outlook img {
          width: auto !important;
          max-width: none !important;
      }
  
      /* Start Template Styles */
      /* Main */
      body {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
      }
  
      body,
      #body-table {
          background-color: #e8e8e8 margin:0 auto !important;
          ;
          margin: 0 auto !important;
          text-align: center !important;
      }
  
      p {
          padding: 0;
          margin: 0;
          line-height: 24px;
          font-family: Arial, Helvetica, sans-serif;
      }
  
      a,
      a:link {
          color: #1c344d;
          text-decoration: none !important;
      }
  
      .footer-link a,
      .nav-link a {
          color: #fff6e5;
      }
  
      /* Yahoo Mail */
      .thread-item.expanded .thread-body {
          background-color: #edf6ea !important;
      }
  
      .thread-item.expanded .thread-body .body,
      .msg-body {
          display: block !important;
      }
  
      #body-table .undoreset table {
          display: table !important;
          table-layout: fixed !important;
      }
  
      /* Start Media Queries */
      @media only screen and (max-width: 640px) {
  
          a[href^="tel"],
          a[href^="sms"] {
              text-decoration: none;
              pointer-events: none;
              cursor: default;
          }
  
          .mobile_link a[href^="tel"],
          .mobile_link a[href^="sms"] {
              text-decoration: default;
              pointer-events: auto;
              cursor: default;
          }
  
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 440px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 360px !important;
          }
  
          *[class].content-width-menu {
              width: 360px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
  
          *[class].block {
              display: block !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].emailImage {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
      }
  
      @media only screen and (max-width: 480px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 320px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].content-width-menu {
              width: 320px !important;
          }
  
          *[class].navlink {
              font-size: 13px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].navlink {
              width: 600px !important;
              border: none !important;
          }
  
          *[class].footer_link {
              display: block !important;
              margin-bottom: 5px !important;
          }
  
          *[class].hide {
              display: none !important;
          }
      }
  
      @media only screen and (max-width: 320px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 100% !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 30px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 30px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
      }
      </style>
      <!--[if mso]>
  <style>
  .font_fix{font-family:Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  </head>
  
  <body>
      <!-- Start of banner -->
      <table id="body-table" align="center" width="100%" bgcolor="#e6e5e7" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
          <tbody>
              <tr>
                  <td>
                      <!-- Start Space -->
                      <table width="100%" bgcolor="#e8e8e8" cellspacing="0" cellpadding="0" border="0" class="full-width">
                          <tbody>
                              <tr>
                                  <td height="28" align="center" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#7f8c8d;"><a href="#" style="color:#00c1f1; text-decoration:underline !important;">Click here</a> if you don't read correctly the email.</td>
                              </tr>
                          </tbody>
                      </table>
                      <!-- End Space -->
                  </td>
              </tr>
              <tr>
                  <td valign="top" bgcolor="#e8e8e8" align="center">
                      <table width="600" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                          <tbody>
                              <tr>
                                  <td valign="top" bgcolor="#ffffff" align="center">
                                      <!-- Start Space -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="26">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space -->
                                      <!-- Section 1 Starts / Logo social ================  -->
                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                          <tbody>
                                              <tr>
                                                  <td height="25" valign="middle" align="left">
                                                      <!-- Start Logo -->
                                                      <table width="160" align="left" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="middle" align="center" class="center-stack"><a href="#"><img src="https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/spots-bg.png" width="160" height="34" alt="" /></a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Logo -->
                                                      <!-- Start Social -->
                                                      <!-- <table align="right" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="bottom" align="right" class="center">
                                                                      <a style="text-decoration: none; border:0;" href="#"><img src="img/fb_bt.jpg" width="27" height="27" alt="Facebook" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/Instagram_bt.png" width="27" height="27" alt="Google plus" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/twitter_bt.jpg" width="27" height="27" alt="Youtube" /></a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- End Social -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- Section 1 End / Logo social =========================-->
                                      <!-- Start Space====================== -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="25">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space==================== -->
                                      <!-- Section presentazione=============== -->
                                      <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td align="center"><img src="img/skateboard.png" width="58" height="38" alt="Image" /></td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td height="10" style="font-size:10px; mso-line-height-rule:exactly; line-height:10px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#555555; font-weight:bold; font-family: 'Montserrat', sans-serif;" align="center"><strong style="font-size:20px; text-transform:uppercase;">感謝您</strong><br />
                                                                                      您的SpotsMap Store交易已成功。</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="line-height:20px; "></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="font-size:14px; mso-line-height-rule:exactly; line-height:18px; color:#95a5a6; font-weight:normal; font-family: Arial, Helvetica, sans-serif;" align="center">有關訂單的查詢或要聯絡滑板地圖 SpotsMap，<br /> 請登入以下連結。</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="font-size:20px; mso-line-height-rule:exactly; line-height:20px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td align="center">
                                                                                      <table cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td align="center" style="border-radius:3px; color:#ffffff; display:block; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:12px; text-align:center; text-decoration:none; padding-top: 10px; padding-bottom: 10px; width:110px; -webkit-text-size-adjust:none; background-color:#daa04b"><a style="color:#ffffff;font-family: Arial, Helvetica, sans-serif; font-size:15px; text-decoration:none !important" href="http://localhost:5001/skateboard.map.spot/order/${order.id}">訂單連結</a></td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Section presentazione ==================-->
                                      <!-- Start 訂單詳情 =============== -->
                                      <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width" bgcolor="#ffffff">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Space -->
                                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" class="font_fix" bgcolor="#8E8E8E" style="color:#ffffff;font-weight:bold; font-family: 'Montserrat', sans-serif; font-size:18px; text-transform:uppercase; padding-top:10px; padding-bottom:10px">- 訂單詳情 -</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Space -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" bgcolor="#ffffff">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="left">
                                                                      <!-- Start prodotto -->
                                                                      <table width="550" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" style="border-bottom:1px solid #ddd;">
                                                                          <tbody>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                              <tr>
                                                                                  <td align="left">
                                                                                      <!-- Start Space -->
                                                                                      <table align="left" cellspacing="0" width="15" cellpadding="0" border="0" class="full-width">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td width="15" height="25" style="font-size: 15px; line-height: 15px;">&nbsp;
                                                                                                  </td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                      <!-- End Space -->
                                                                                      <!-- Start Column 1 -->
                                                                                      <table width="415" align="left" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                                                          <tbody>
                                                                                              <!-- <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:18px"><a href="#" style="color:#2c3e50; text-decoration:none !important">PARK HYATT Hotel</a></td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="26" align="left"><img src="img/green_line.jpg" width="30" height="2" alt="Image" /></td>
                                                                                              </tr> -->
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">收件門市：7-11 ${order.address}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂單總額：NT$ ${order.amount}元</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂購人：${order.name}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂購人電話：${order.phone}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂單狀態：${status}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">備註：${msg}</td>
                                                                                              </tr>
  
                                                                                              <tr>
                                                                                                  <td height="20" style="font-size:20px; line-height:20px;">&nbsp;</td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                          </tbody>
                                                                      </table><!-- End prodotto-->
                                                                      <!-- Start prodotto -->
                                                                      <table width="550" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" style="border-bottom:1px solid #ddd;">
                                                                          <tbody>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                          </tbody>
                                                                      </table><!-- End prodotto-->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End 訂單詳情 ======================= -->
                                      <!-- Start footer ================= -->
                                      <table width="600" bgcolor="#BB5E00" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="top" align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table align="center" cellspacing="0" cellpadding="0" border="0" class="full-width" width="100%">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:14px; height:20px; color:#ffffff; font-weight:normal; font-family: 'Montserrat', sans-serif;" align="center">聯絡我們</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td class="font_fix" style="font-family: 'Montserrat', sans-serif; font-size:28px;mso-line-height-rule:exactly; line-height:28px; font-weight:bold; color:#ffffff;text-decoration:none !important; " align="center">waku.helper@gmail.com</td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:12px; font-family: 'Montserrat', sans-serif; line-height:14px; color:#ffffff; font-weight:bold; padding-top:5px" align="center"><a href="#" style="color:#ffffff;text-decoration:none !important; ">waku.helper@gmail.com</a></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
  
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                      <!-- Section img footer -->
                                                      <!-- <table bgcolor="#e04f67" width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="bottom" align="left" height="71"><img src="img/bg_footer.png" class="emailImage" alt="Main banner" border="0" width="600" height="71" /></td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- Section img footer  -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table> 
                                      <!-- End footer ==================-->
                                      <!-- Start second footer ============ -->
                                      <table width="600" bgcolor="#464646" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Space -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" valign="middle" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#cccccc; padding-top:10px; padding-bottom:10px"><strong>Copyright © 2024 SposMap</strong><br />
                                                                      If you wont to unsubscribe please <a href="#" style="color:#ffffff; text-decoration:underline">click here</a>.</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Space -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Second footer =========== -->
                                  </td>
                              </tr>
                          </tbody>
                      </table><!-- End main table white containe -->
                  </td>
              </tr>
          </tbody>
      </table>
  </body>
  
  </html>  `
}

function payMail (order, status, msg) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="width=mobile-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" name="viewport" />
      <meta content="IE=9; IE=8; IE=7; IE=EDGE;" http-equiv="X-UA-Compatible" />
      <title>Your title</title>
      <!-- GOOGLE WEB FONT -->
      <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
      <style type="text/css">
      /**This is to overwrite Outlook.com’s Embedded CSS************/
      table {
          border-collapse: separate;
      }
  
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #488dc6
      }
  
      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #333333 !important
      }
  
      p {
          margin-bottom: 0
      }
  
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%
      }
  
      /**This is to center your email in Outlook.com************/
      .ExternalClass {
          width: 100%;
      }
  
      /* General Resets */
      #outlook a {
          padding: 0;
      }
  
      body,
      #body-table {
          height: 100% !important;
          width: 100% !important;
          margin: 0 auto;
          padding: 0;
          line-height: 100%;
           !important;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
      }
  
      img,
      a img {
          border: 0;
          outline: none;
          text-decoration: none;
      }
  
      .image-fix {
          display: block;
      }
  
      table,
      td {
          border-collapse: collapse;
      }
  
      /* Client Specific Resets */
      .ReadMsgBody {
          width: 100%;
      }
  
      .ExternalClass {
          width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100% !important;
      }
  
      .ExternalClass * {
          line-height: 100% !important;
      }
  
      table,
      td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
      }
  
      img {
          outline: none;
          border: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
      }
  
      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }
  
      body.outlook img {
          width: auto !important;
          max-width: none !important;
      }
  
      /* Start Template Styles */
      /* Main */
      body {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
      }
  
      body,
      #body-table {
          background-color: #e8e8e8 margin:0 auto !important;
          ;
          margin: 0 auto !important;
          text-align: center !important;
      }
  
      p {
          padding: 0;
          margin: 0;
          line-height: 24px;
          font-family: Arial, Helvetica, sans-serif;
      }
  
      a,
      a:link {
          color: #1c344d;
          text-decoration: none !important;
      }
  
      .footer-link a,
      .nav-link a {
          color: #fff6e5;
      }
  
      /* Yahoo Mail */
      .thread-item.expanded .thread-body {
          background-color: #edf6ea !important;
      }
  
      .thread-item.expanded .thread-body .body,
      .msg-body {
          display: block !important;
      }
  
      #body-table .undoreset table {
          display: table !important;
          table-layout: fixed !important;
      }
  
      /* Start Media Queries */
      @media only screen and (max-width: 640px) {
  
          a[href^="tel"],
          a[href^="sms"] {
              text-decoration: none;
              pointer-events: none;
              cursor: default;
          }
  
          .mobile_link a[href^="tel"],
          .mobile_link a[href^="sms"] {
              text-decoration: default;
              pointer-events: auto;
              cursor: default;
          }
  
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 440px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 360px !important;
          }
  
          *[class].content-width-menu {
              width: 360px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
  
          *[class].block {
              display: block !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].emailImage {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
      }
  
      @media only screen and (max-width: 480px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 320px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].content-width-menu {
              width: 320px !important;
          }
  
          *[class].navlink {
              font-size: 13px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].navlink {
              width: 600px !important;
              border: none !important;
          }
  
          *[class].footer_link {
              display: block !important;
              margin-bottom: 5px !important;
          }
  
          *[class].hide {
              display: none !important;
          }
      }
  
      @media only screen and (max-width: 320px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 100% !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 30px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 30px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
      }
      </style>
      <!--[if mso]>
  <style>
  .font_fix{font-family:Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  </head>
  
  <body>
      <!-- Start of banner -->
      <table id="body-table" align="center" width="100%" bgcolor="#e6e5e7" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
          <tbody>
              <tr>
                  <td>
                      <!-- Start Space -->
                      <table width="100%" bgcolor="#e8e8e8" cellspacing="0" cellpadding="0" border="0" class="full-width">
                          <tbody>
                              <tr>
                                  <td height="28" align="center" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#7f8c8d;"><a href="#" style="color:#00c1f1; text-decoration:underline !important;">Click here</a> if you don't read correctly the email.</td>
                              </tr>
                          </tbody>
                      </table>
                      <!-- End Space -->
                  </td>
              </tr>
              <tr>
                  <td valign="top" bgcolor="#e8e8e8" align="center">
                      <table width="600" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                          <tbody>
                              <tr>
                                  <td valign="top" bgcolor="#ffffff" align="center">
                                      <!-- Start Space -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="26">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space -->
                                      <!-- Section 1 Starts / Logo social ================  -->
                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                          <tbody>
                                              <tr>
                                                  <td height="25" valign="middle" align="left">
                                                      <!-- Start Logo -->
                                                      <table width="160" align="left" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="middle" align="center" class="center-stack"><a href="#"><img src="https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/spots-bg.png" width="160" height="34" alt="" /></a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Logo -->
                                                      <!-- Start Social -->
                                                      <!-- <table align="right" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="bottom" align="right" class="center">
                                                                      <a style="text-decoration: none; border:0;" href="#"><img src="img/fb_bt.jpg" width="27" height="27" alt="Facebook" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/Instagram_bt.png" width="27" height="27" alt="Google plus" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/twitter_bt.jpg" width="27" height="27" alt="Youtube" /></a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- End Social -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- Section 1 End / Logo social =========================-->
                                      <!-- Start Space====================== -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="25">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space==================== -->
                                      <!-- Section presentazione=============== -->
                                      <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td align="center"><img src="img/skateboard.png" width="58" height="38" alt="Image" /></td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td height="10" style="font-size:10px; mso-line-height-rule:exactly; line-height:10px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#555555; font-weight:bold; font-family: 'Montserrat', sans-serif;" align="center"><strong style="font-size:20px; text-transform:uppercase;">商品已出貨</strong><br />
                                                                                      您在滑板地圖 SpotsMap訂購的商品正在寄送中。</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="line-height:20px; "></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="font-size:14px; mso-line-height-rule:exactly; line-height:18px; color:#95a5a6; font-weight:normal; font-family: Arial, Helvetica, sans-serif;" align="center">取貨編號可查詢配送進度，<br /> 點此前往7-11貨態查詢系統。</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="font-size:20px; mso-line-height-rule:exactly; line-height:20px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td align="center">
                                                                                      <table cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td align="center" style="border-radius:3px; color:#ffffff; display:block; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:12px; text-align:center; text-decoration:none; padding-top: 10px; padding-bottom: 10px; width:110px; -webkit-text-size-adjust:none; background-color:#daa04b"><a style="color:#ffffff;font-family: Arial, Helvetica, sans-serif; font-size:15px; text-decoration:none !important" href="https://tracking.shopmore.com.tw/" target="_blank">查配送進度</a></td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Section presentazione ==================-->
                                      <!-- Start 訂單詳情 =============== -->
                                      <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width" bgcolor="#ffffff">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Space -->
                                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" class="font_fix" bgcolor="#8E8E8E" style="color:#ffffff;font-weight:bold; font-family: 'Montserrat', sans-serif; font-size:18px; text-transform:uppercase; padding-top:10px; padding-bottom:10px">- 訂單詳情 -</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Space -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" bgcolor="#ffffff">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="left">
                                                                      <!-- Start prodotto -->
                                                                      <table width="550" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" style="border-bottom:1px solid #ddd;">
                                                                          <tbody>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                              <tr>
                                                                                  <td align="left">
                                                                                      <!-- Start Space -->
                                                                                      <table align="left" cellspacing="0" width="15" cellpadding="0" border="0" class="full-width">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td width="15" height="25" style="font-size: 15px; line-height: 15px;">&nbsp;
                                                                                                  </td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                      <!-- End Space -->
                                                                                      <!-- Start Column 1 -->
                                                                                      <table width="415" align="left" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                                                          <tbody>
                                                                                              <!-- <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:18px"><a href="#" style="color:#2c3e50; text-decoration:none !important">PARK HYATT Hotel</a></td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="26" align="left"><img src="img/green_line.jpg" width="30" height="2" alt="Image" /></td>
                                                                                              </tr> -->
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">取貨編號：${order.pickUpCode}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">收件門市：7-11 ${order.address}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂單總額：NT$ ${order.amount}元</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂購人：${order.name}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂購人電話：${order.phone}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">訂單狀態：${status}</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td align="left" class="font_fix" style="font-size:16px; color:#2c3e50; font-weight:bold; font-family: 'Montserrat', sans-serif; line-height:35px">備註：${msg}</td>
                                                                                              </tr>
  
                                                                                              <tr>
                                                                                                  <td height="20" style="font-size:20px; line-height:20px;">&nbsp;</td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                          </tbody>
                                                                      </table><!-- End prodotto-->
                                                                      <!-- Start prodotto -->
                                                                      <table width="550" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width" style="border-bottom:1px solid #ddd;">
                                                                          <tbody>
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                              <!-- Start Space -->
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- End Space -->
                                                                          </tbody>
                                                                      </table><!-- End prodotto-->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End 訂單詳情 ======================= -->
                                      <!-- Start footer ================= -->
                                      <table width="600" bgcolor="#BB5E00" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="top" align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table align="center" cellspacing="0" cellpadding="0" border="0" class="full-width" width="100%">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:14px; height:20px; color:#ffffff; font-weight:normal; font-family: 'Montserrat', sans-serif;" align="center">聯絡我們</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td class="font_fix" style="font-family: 'Montserrat', sans-serif; font-size:28px;mso-line-height-rule:exactly; line-height:28px; font-weight:bold; color:#ffffff;text-decoration:none !important; " align="center">waku.helper@gmail.com</td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:12px; font-family: 'Montserrat', sans-serif; line-height:14px; color:#ffffff; font-weight:bold; padding-top:5px" align="center"><a href="#" style="color:#ffffff;text-decoration:none !important; ">waku.helper@gmail.com</a></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
  
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                      <!-- Section img footer -->
                                                      <!-- <table bgcolor="#e04f67" width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="bottom" align="left" height="71"><img src="img/bg_footer.png" class="emailImage" alt="Main banner" border="0" width="600" height="71" /></td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- Section img footer  -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table> 
                                      <!-- End footer ==================-->
                                      <!-- Start second footer ============ -->
                                      <table width="600" bgcolor="#464646" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Space -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" valign="middle" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#cccccc; padding-top:10px; padding-bottom:10px"><strong>Copyright © 2024 SposMap</strong><br />
                                                                      If you wont to unsubscribe please <a href="#" style="color:#ffffff; text-decoration:underline">click here</a>.</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Space -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Second footer =========== -->
                                  </td>
                              </tr>
                          </tbody>
                      </table><!-- End main table white containe -->
                  </td>
              </tr>
          </tbody>
      </table>
  </body>
  
  </html>
  `
}

function registerMail (captcha) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="width=mobile-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" name="viewport" />
      <meta content="IE=9; IE=8; IE=7; IE=EDGE;" http-equiv="X-UA-Compatible" />
      <title>Your title</title>
      <!-- GOOGLE WEB FONT -->
      <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
      <style type="text/css">
      /**This is to overwrite Outlook.com’s Embedded CSS************/
      table {
          border-collapse: separate;
      }
  
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #488dc6
      }
  
      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #333333 !important
      }
  
      p {
          margin-bottom: 0
      }
  
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%
      }
  
      /**This is to center your email in Outlook.com************/
      .ExternalClass {
          width: 100%;
      }
  
      /* General Resets */
      #outlook a {
          padding: 0;
      }
  
      body,
      #body-table {
          height: 100% !important;
          width: 100% !important;
          margin: 0 auto;
          padding: 0;
          line-height: 100%;
           !important;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
      }
  
      img,
      a img {
          border: 0;
          outline: none;
          text-decoration: none;
      }
  
      .image-fix {
          display: block;
      }
  
      table,
      td {
          border-collapse: collapse;
      }
  
      /* Client Specific Resets */
      .ReadMsgBody {
          width: 100%;
      }
  
      .ExternalClass {
          width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100% !important;
      }
  
      .ExternalClass * {
          line-height: 100% !important;
      }
  
      table,
      td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
      }
  
      img {
          outline: none;
          border: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
      }
  
      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }
  
      body.outlook img {
          width: auto !important;
          max-width: none !important;
      }
  
      /* Start Template Styles */
      /* Main */
      body {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
      }
  
      body,
      #body-table {
          background-color: #e8e8e8 margin:0 auto !important;
          ;
          margin: 0 auto !important;
          text-align: center !important;
      }
  
      p {
          padding: 0;
          margin: 0;
          line-height: 24px;
          font-family: Arial, Helvetica, sans-serif;
      }
  
      a,
      a:link {
          color: #1c344d;
          text-decoration: none !important;
      }
  
      .footer-link a,
      .nav-link a {
          color: #fff6e5;
      }
  
      /* Yahoo Mail */
      .thread-item.expanded .thread-body {
          background-color: #edf6ea !important;
      }
  
      .thread-item.expanded .thread-body .body,
      .msg-body {
          display: block !important;
      }
  
      #body-table .undoreset table {
          display: table !important;
          table-layout: fixed !important;
      }
  
      /* Start Media Queries */
      @media only screen and (max-width: 640px) {
  
          a[href^="tel"],
          a[href^="sms"] {
              text-decoration: none;
              pointer-events: none;
              cursor: default;
          }
  
          .mobile_link a[href^="tel"],
          .mobile_link a[href^="sms"] {
              text-decoration: default;
              pointer-events: auto;
              cursor: default;
          }
  
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 440px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 360px !important;
          }
  
          *[class].content-width-menu {
              width: 360px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
  
          *[class].block {
              display: block !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].emailImage {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
          }
      }
  
      @media only screen and (max-width: 480px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 320px !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].content-width-menu {
              width: 320px !important;
          }
  
          *[class].navlink {
              font-size: 13px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 20px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 20px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
  
          *[class].navlink {
              width: 600px !important;
              border: none !important;
          }
  
          *[class].footer_link {
              display: block !important;
              margin-bottom: 5px !important;
          }
  
          *[class].hide {
              display: none !important;
          }
      }
  
      @media only screen and (max-width: 320px) {
          *[class].full-width {
              width: 100% !important;
          }
  
          *[class].mobile-width {
              width: 100% !important;
              padding: 0 4px;
          }
  
          *[class].content-width {
              width: 240px !important;
          }
  
          *[class].center {
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].center-stack {
              padding-bottom: 30px !important;
              text-align: center !important;
              height: auto !important;
          }
  
          *[class].stack {
              padding-bottom: 30px !important;
              height: auto !important;
          }
  
          *[class].gallery {
              padding-bottom: 20px !important;
          }
  
          *[class].fluid-img {
              height: auto !important;
              max-width: 600px !important;
              width: 100% !important;
              min-width: 320px !important;
          }
  
          *[class].midaling {
              width: 100% !important;
              border: none !important;
          }
      }
      </style>
      <!--[if mso]>
  <style>
  .font_fix{font-family:Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  </head>
  
  <body>
      <!-- Start of banner -->
      <table id="body-table" align="center" width="100%" bgcolor="#e6e5e7" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
          <tbody>
              <tr>
                  <td>
                      <!-- Start Space -->
                      <table width="100%" bgcolor="#e8e8e8" cellspacing="0" cellpadding="0" border="0" class="full-width">
                          <tbody>
                              <tr>
                                  <td height="28" align="center" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#7f8c8d;"><a href="#" style="color:#00c1f1; text-decoration:underline !important;">Click here</a> if you don't read correctly the email.</td>
                              </tr>
                          </tbody>
                      </table>
                      <!-- End Space -->
                  </td>
              </tr>
              <tr>
                  <td valign="top" bgcolor="#e8e8e8" align="center">
                      <table width="600" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                          <tbody>
                              <tr>
                                  <td valign="top" bgcolor="#ffffff" align="center">
                                      <!-- Start Space -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="26">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space -->
                                      <!-- Section 1 Starts / Logo social ================  -->
                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                          <tbody>
                                              <tr>
                                                  <td height="25" valign="middle" align="left">
                                                      <!-- Start Logo -->
                                                      <table width="160" align="left" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="middle" align="center" class="center-stack"><a href="#"><img src="https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/spots-bg.png" width="160" height="34" alt="" /></a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Logo -->
                                                      <!-- Start Social -->
                                                      <!-- <table align="right" cellspacing="0" cellpadding="0" border="0" class="content-width-menu">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="34" valign="bottom" align="right" class="center">
                                                                      <a style="text-decoration: none; border:0;" href="#"><img src="img/fb_bt.jpg" width="27" height="27" alt="Facebook" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/Instagram_bt.png" width="27" height="27" alt="Google plus" /></a>
                                                                      &nbsp;
                                                                      <a style="text-decoration: none; border:0" href="#"><img src="img/twitter_bt.jpg" width="27" height="27" alt="Youtube" /></a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- End Social -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- Section 1 End / Logo social =========================-->
                                      <!-- Start Space====================== -->
                                      <table width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                          <tbody>
                                              <tr>
                                                  <td height="25">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Space==================== -->
                                      <!-- Section presentazione=============== -->
                                      <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td align="center"><img src="img/skateboard.png" width="58" height="38" alt="Image" /></td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td height="10" style="font-size:10px; mso-line-height-rule:exactly; line-height:10px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#555555; font-weight:bold; font-family: 'Montserrat', sans-serif;" align="center"><strong style="font-size:20px; text-transform:uppercase;">下一步</strong><br />
                                                                                      請於SpotsMap會員註冊頁輸入以下驗證碼</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="line-height:20px; "></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="font-size:14px; mso-line-height-rule:exactly; line-height:18px; color:#95a5a6; font-weight:normal; font-family: Arial, Helvetica, sans-serif;" align="center">完成註冊後始可開始購物下單，<br /> 請複製以下驗證碼接續完成註冊流程。</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20" style="font-size:20px; mso-line-height-rule:exactly; line-height:20px;">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td align="center">
                                                                                      <table cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td align="center" style="border-radius:3px; color:#ffffff; display:block; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:15px; text-align:center; text-decoration:none; padding-top: 10px; padding-bottom: 10px; width:200px; -webkit-text-size-adjust:none; background-color:#d5935a"><a style="color:#ffffff;font-family: Arial, Helvetica, sans-serif; font-size:20px; text-decoration:none !important" href="javascript:void(0)">${captcha}</a></td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="30">&nbsp;</td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Section presentazione ==================-->
                                      <!-- Start footer ================= -->
                                      <table width="600" bgcolor="#d1ccc4" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Block Content -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="top" align="center">
                                                                      <!-- Start Column 1 -->
                                                                      <table align="center" cellspacing="0" cellpadding="0" border="0" class="full-width" width="100%">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:14px; height:20px; color:#605d5d; font-weight:600; font-family: 'Montserrat', sans-serif;" align="center">聯絡我們</td>
                                                                              </tr>
                                                                              <!-- <tr>
                                                                                  <td class="font_fix" style="font-family: 'Montserrat', sans-serif; font-size:28px;mso-line-height-rule:exactly; line-height:28px; font-weight:bold; color:#ffffff;text-decoration:none !important; " align="center">waku.helper@gmail.com</td>
                                                                              </tr> -->
                                                                              <tr>
                                                                                  <td class="font_fix" style="font-size:12px; font-family: 'Montserrat', sans-serif; line-height:14px; color:#ffffff; font-weight:bold; padding-top:5px" align="center"><a href="#" style="color:#605d5d;text-decoration:none !important; ">waku.helper@gmail.com</a></td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="50">&nbsp;</td>
                                                                              </tr>
  
                                                                          </tbody>
                                                                      </table>
                                                                      <!-- End Column 1 -->
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Block Content -->
                                                      <!-- Section img footer -->
                                                      <!-- <table bgcolor="#e04f67" width="100%" cellspacing="0" cellpadding="0" border="0" class="full-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td valign="bottom" align="left" height="71"><img src="img/bg_footer.png" class="emailImage" alt="Main banner" border="0" width="600" height="71" /></td>
                                                              </tr>
                                                          </tbody>
                                                      </table> -->
                                                      <!-- Section img footer  -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table> 
                                      <!-- End footer ==================-->
                                      <!-- Start second footer ============ -->
                                      <table width="600" bgcolor="#464646" align="center" cellspacing="0" cellpadding="0" border="0" class="mobile-width">
                                          <tbody>
                                              <tr>
                                                  <td align="center">
                                                      <!-- Start Space -->
                                                      <table width="550" align="center" cellspacing="0" cellpadding="0" border="0" class="content-width">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" valign="middle" style="font-family: Arial, Helvetica, sans-serif;font-size:11px; font-weight:normal; color:#cccccc; padding-top:10px; padding-bottom:10px"><strong>Copyright © 2024 SposMap</strong><br />
                                                                      If you wont to unsubscribe please <a href="#" style="color:#ffffff; text-decoration:underline">click here</a>.</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- End Space -->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- End Second footer =========== -->
                                  </td>
                              </tr>
                          </tbody>
                      </table><!-- End main table white containe -->
                  </td>
              </tr>
          </tbody>
      </table>
  </body>
  
  </html>
        `
}

module.exports = { sendMail, orderMail, payMail, registerMail }
