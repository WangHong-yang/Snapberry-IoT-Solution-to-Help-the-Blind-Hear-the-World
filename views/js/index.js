import { getMsg, getPhoto, postForDesc } from './userServices';
import './lib/responsivevoice.js';

$(".GetBtn").click(() => {
  // get time stamp
  var timeStamp = Math.floor(Date.now() / 1000);

  // get photo from raspberry camera => scene recognition => speech
  getPhoto(timeStamp)
    .then(res => res.blob())
    .then((data) => {
      console.log(data);
      return postForDesc(data);
    })
    .then(res => {
      console.log(res);
      $(".res").html(res.description.captions["0"].text);
      responsiveVoice.speak(res.description.captions["0"].text, "US English Female");
    })

})