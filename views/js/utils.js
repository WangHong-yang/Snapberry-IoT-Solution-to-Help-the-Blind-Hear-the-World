
export function fetchGet(url, params) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

export function fetchGetImg(url, params) {
  return fetch(url+"?timeStamp="+params.timeStamp, ).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  });
}

export function fetchPost(url, params) {
  console.log(JSON.stringify(params));
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
}

export function fetchPostMsVisual(url, params) {
  return fetch(url, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '5cb654780402451dbb6607631d6a4808'
    }
  })
    .then(res => res.json());
}

export function fetchPatch(url, params) {
  console.log(url)
  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
}

export function fetchDel(url) {
  console.log(url)
  return fetch(url, {
    method: 'DELETE'
  })
    .then(res => res.json());
}

/**
 * remove duplicated value in array
 *
 * @export
 * @param {Array} a
 * @returns an array without duplication
 */
export function uniqArray(a) {
  const seen = new Set();
  return a.filter(val => !seen.has(val) && seen.add(val));
}

/**
 * filter object (remove some unnecessary keys)
 *
 * @export
 * @param {Object} obj
 * @param {Function} filter (optional)  filter(key, val) { if(!val) {return false; // false means ignore this key} return true;}
 * @returns an object after filtering
 */
export function filterObject(obj, filter) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = filterObject(obj[i], filter);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (!filter || filter(attr, obj[attr]) !== false) {
          copy[attr] = filterObject(obj[attr], filter);
        }
      };
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * Run async functions in order
 * e.g. http://codepen.io/hectorguo/pen/yMJNYV
 * @export
 * @param {array} promiseArray 
 * @returns 
 */
export function seqPromise(promiseArray) {
  return promiseArray
    .reduce(
    (accPromise, item) => accPromise.then(res => item(res)),
    Promise.resolve());
}


