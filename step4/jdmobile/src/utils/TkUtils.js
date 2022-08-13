
// import CryptoJS from 'crypto-js';

function encrypt(data, key) {
  // var realKey = getKey(key);
  // var encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(realKey), {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7
  // });
  // return encrypt.ciphertext.toString(CryptoJS.enc.Base64);
}


function decrypt(data, key) {
  // var realKey = getKey(key);
  // var decrypt = CryptoJS.AES.decrypt({
  //   ciphertext: CryptoJS.enc.Base64.parse(data)
  // }, CryptoJS.enc.Hex.parse(realKey), {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7
  // });
  // return decrypt.toString(CryptoJS.enc.Utf8);
}
export default {
  encrypt: encrypt,
  decrypt: decrypt
}

