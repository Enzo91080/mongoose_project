const encrypt = (text) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) + 1);
  }
  return result;
};

module.exports = {
  encrypt,
  decrypt
};