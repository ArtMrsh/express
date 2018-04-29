function checkValidity(errors) {
  if (errors) {
    errors.forEach(error => console.log(error.msg));
    return false;
  } else {
    return true;
  }
}

module.exports = checkValidity;