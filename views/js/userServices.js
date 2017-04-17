import { fetchGet, fetchPost, fetchDel, fetchPatch, uniqArray, fetchGetImg, fetchPostMsVisual } from './utils';

const baseUrl = "http://localhost:8080";

// ------------------------------- photo and scene recognition API --------------------------------
export function getMsg() {
  return fetchGet(baseUrl + '/me', {'mode': 'no-cors'});
}

export function getPhoto(timeStamp) {
  return fetchGetImg(baseUrl + '/photo', {'mode': 'no-cors', 'timeStamp': timeStamp});
}

export function postForDesc(imgData) {
  return fetchPostMsVisual("https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description&language=en", imgData)
}

